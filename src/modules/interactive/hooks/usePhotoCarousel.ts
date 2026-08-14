import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import type { UsePhotoCarouselResult } from '../types/gallery.types';
import { playSoundEffect } from '@/services/SoundEffectsService';

let persistedActivePhotoIndex = 0;
const TRANSITION_DURATION = 420;
const DRAG_THRESHOLD = 36;

export const usePhotoCarousel = (
  photoCount: number
): UsePhotoCarouselResult => {
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.min(persistedActivePhotoIndex, Math.max(0, photoCount - 1))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    currentX: 0,
  });

  const finishTransition = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (photoCount === 0 || isTransitioning) {
        return;
      }

      const safeIndex = ((index % photoCount) + photoCount) % photoCount;
      if (safeIndex === activeIndex) {
        return;
      }

      playSoundEffect('swipe');
      persistedActivePhotoIndex = safeIndex;
      setIsTransitioning(true);
      setActiveIndex(safeIndex);
      finishTransition();
    },
    [activeIndex, finishTransition, isTransitioning, photoCount]
  );

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
      if (
        isTransitioning ||
        (event.pointerType === 'mouse' && event.button !== 0)
      ) {
        return;
      }

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        currentX: event.clientX,
      };
      suppressClickRef.current = false;
      setIsDragging(true);
    },
    [isTransitioning]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        dragRef.current.pointerId !== event.pointerId
      ) {
        return;
      }

      dragRef.current.currentX = event.clientX;
      if (
        Math.abs(dragRef.current.currentX - dragRef.current.startX) >
        6
      ) {
        suppressClickRef.current = true;
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }
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

      const dragDistance =
        dragRef.current.currentX - dragRef.current.startX;
      dragRef.current.pointerId = -1;
      setIsDragging(false);

      if (Math.abs(dragDistance) < DRAG_THRESHOLD) {
        return;
      }

      if (dragDistance > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  const handleClickCapture = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!suppressClickRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    },
    []
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const horizontalDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0;

      if (horizontalDelta === 0) {
        return;
      }

      event.preventDefault();
      if (horizontalDelta > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious]
  );

  useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    },
    []
  );

  return {
    activeIndex,
    isDragging,
    isTransitioning,
    goTo,
    goToPrevious,
    goToNext,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClickCapture,
    handleWheel,
  };
};

export default usePhotoCarousel;
