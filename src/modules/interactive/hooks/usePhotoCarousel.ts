import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import type { UsePhotoCarouselResult } from '../types/gallery.types';

let persistedActivePhotoIndex = 0;

const getReducedMotionPreference = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const usePhotoCarousel = (
  photoCount: number
): UsePhotoCarouselResult => {
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.min(persistedActivePhotoIndex, Math.max(0, photoCount - 1))
  );
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
  });

  const updateActiveIndex = useCallback((index: number) => {
    persistedActivePhotoIndex = index;
    setActiveIndex(index);
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      const track = trackRef.current;
      const slide = track?.querySelector<HTMLElement>(
        `[data-photo-index="${index}"]`
      );

      if (!track || !slide) {
        return;
      }

      const targetLeft =
        slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
      track.scrollTo({
        left: targetLeft,
        behavior:
          behavior ??
          (getReducedMotionPreference() ? 'auto' : 'smooth'),
      });
    },
    []
  );

  const goTo = useCallback(
    (index: number) => {
      if (photoCount === 0) return;

      const safeIndex = Math.max(0, Math.min(photoCount - 1, index));
      updateActiveIndex(safeIndex);
      scrollToIndex(safeIndex);
    },
    [photoCount, scrollToIndex, updateActiveIndex]
  );

  const handleScrollEnd = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const slides = Array.from(
      track.querySelectorAll<HTMLElement>('[data-photo-index]')
    ) as HTMLElement[];

    const nearest = slides.reduce<{
      index: number;
      distance: number;
    }>(
      (current, slide) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCenter - trackCenter);
        const index = Number(slide.dataset.photoIndex ?? 0);
        return distance < current.distance
          ? { index, distance }
          : current;
      },
      { index: activeIndex, distance: Number.POSITIVE_INFINITY }
    );

    updateActiveIndex(nearest.index);
  }, [activeIndex, updateActiveIndex]);

  const handleScroll = useCallback(() => {
    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(
      handleScrollEnd,
      140
    );
  }, [handleScrollEnd]);

  const goToPrevious = useCallback(
    () => goTo(activeIndex - 1),
    [activeIndex, goTo]
  );
  const goToNext = useCallback(
    () => goTo(activeIndex + 1),
    [activeIndex, goTo]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) {
        return;
      }

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollLeft: event.currentTarget.scrollLeft,
      };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        dragRef.current.pointerId !== event.pointerId
      ) {
        return;
      }

      event.preventDefault();
      event.currentTarget.scrollLeft =
        dragRef.current.startScrollLeft -
        (event.clientX - dragRef.current.startX);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (dragRef.current.pointerId !== event.pointerId) {
        return;
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      dragRef.current.pointerId = -1;
      setIsDragging(false);
      handleScrollEnd();
    },
    [handleScrollEnd]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      event.currentTarget.scrollLeft += event.deltaY;
      handleScroll();
    },
    [handleScroll]
  );

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() =>
      scrollToIndex(activeIndex, 'auto')
    );
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() =>
      scrollToIndex(activeIndex, 'auto')
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, [activeIndex, scrollToIndex]);

  useEffect(
    () => () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    },
    []
  );

  return {
    activeIndex,
    isDragging,
    trackRef,
    goTo,
    goToPrevious,
    goToNext,
    handleScroll,
    handleScrollEnd,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
  };
};

export default usePhotoCarousel;
