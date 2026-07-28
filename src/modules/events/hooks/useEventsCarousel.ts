import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type UIEvent,
  type WheelEvent,
} from 'react';
import type { UseEventsCarouselResult } from '../types/events.types';

const CARD_STRIDE = 240;
const DRAG_CLICK_THRESHOLD = 6;
const SCROLL_SETTLE_DELAY = 140;

let persistedCarouselState = {
  activeIndex: 0,
  scrollLeft: 0,
};

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useEventsCarousel = (
  eventCount: number
): UseEventsCarouselResult => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const dragClickResetTimerRef = useRef<number | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    didDrag: false,
  });
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.min(
      persistedCarouselState.activeIndex,
      Math.max(0, eventCount - 1)
    )
  );
  const [isDragging, setIsDragging] = useState(false);

  const updateActiveIndex = useCallback(
    (index: number) => {
      const safeIndex = Math.max(0, Math.min(eventCount - 1, index));
      persistedCarouselState.activeIndex = safeIndex;
      setActiveIndex(safeIndex);
    },
    [eventCount]
  );

  const updateSettledIndex = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || eventCount === 0) return;

    const maxScrollLeft =
      viewport.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft <= 1) {
      updateActiveIndex(0);
      return;
    }
    if (viewport.scrollLeft >= maxScrollLeft - 1) {
      updateActiveIndex(eventCount - 1);
      return;
    }

    updateActiveIndex(
      Math.round(viewport.scrollLeft / CARD_STRIDE)
    );
  }, [eventCount, updateActiveIndex]);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      persistedCarouselState.scrollLeft =
        event.currentTarget.scrollLeft;

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = window.setTimeout(
        updateSettledIndex,
        SCROLL_SETTLE_DELAY
      );
    },
    [updateSettledIndex]
  );

  const scrollToEvent = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport || eventCount === 0) return;

      const safeIndex = Math.max(0, Math.min(eventCount - 1, index));
      const card = viewport.querySelector<HTMLElement>(
        `[data-event-index="${safeIndex}"]`
      );
      if (!card) return;

      viewport.scrollTo({
        left: card.offsetLeft - 24,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
      updateActiveIndex(safeIndex);
    },
    [eventCount, updateActiveIndex]
  );

  const scrollPrevious = useCallback(
    () => scrollToEvent(activeIndex - 1),
    [activeIndex, scrollToEvent]
  );

  const scrollNext = useCallback(
    () => scrollToEvent(activeIndex + 1),
    [activeIndex, scrollToEvent]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      } else if (event.key === 'Home') {
        event.preventDefault();
        scrollToEvent(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        scrollToEvent(eventCount - 1);
      }
    },
    [eventCount, scrollNext, scrollPrevious, scrollToEvent]
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        event.pointerType === 'touch' ||
        !event.isPrimary ||
        event.button !== 0
      ) {
        return;
      }

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollLeft: event.currentTarget.scrollLeft,
        didDrag: false,
      };

      if (dragClickResetTimerRef.current !== null) {
        window.clearTimeout(dragClickResetTimerRef.current);
        dragClickResetTimerRef.current = null;
      }
    },
    []
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        dragRef.current.pointerId !== event.pointerId
      ) {
        return;
      }

      const movement = event.clientX - dragRef.current.startX;
      if (
        !dragRef.current.didDrag &&
        Math.abs(movement) > DRAG_CLICK_THRESHOLD
      ) {
        dragRef.current.didDrag = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
      }

      if (!dragRef.current.didDrag) return;

      event.preventDefault();
      event.currentTarget.scrollLeft =
        dragRef.current.startScrollLeft - movement;
    },
    []
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (dragRef.current.pointerId !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragRef.current.pointerId = -1;
      setIsDragging(false);
      updateSettledIndex();

      dragClickResetTimerRef.current = window.setTimeout(() => {
        dragRef.current.didDrag = false;
        dragClickResetTimerRef.current = null;
      }, 0);
    },
    [updateSettledIndex]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (
        Math.abs(event.deltaX) > Math.abs(event.deltaY) &&
        !event.shiftKey
      ) {
        return;
      }

      event.preventDefault();
      event.currentTarget.scrollLeft +=
        event.deltaX || event.deltaY;
    },
    []
  );

  const consumeDragClick = useCallback(() => {
    const wasDragging = dragRef.current.didDrag;
    dragRef.current.didDrag = false;
    if (dragClickResetTimerRef.current !== null) {
      window.clearTimeout(dragClickResetTimerRef.current);
      dragClickResetTimerRef.current = null;
    }
    return wasDragging;
  }, []);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (viewportRef.current) {
        viewportRef.current.scrollLeft =
          persistedCarouselState.scrollLeft;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(
    () => () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
      if (dragClickResetTimerRef.current !== null) {
        window.clearTimeout(dragClickResetTimerRef.current);
      }
    },
    []
  );

  return {
    viewportRef,
    activeIndex,
    isDragging,
    scrollToEvent,
    scrollPrevious,
    scrollNext,
    handleScroll,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
    consumeDragClick,
  };
};

export default useEventsCarousel;
