import TEXTS from '@/constants/texts';
import useEventsCarousel from '../../hooks/useEventsCarousel';
import EventCard from '../EventCard';
import type { EventsCarouselProps } from './EventsCarousel.types';
import styles from './EventsCarousel.module.css';

export const EventsCarousel = ({
  events,
  isLoading,
  onSelectEvent,
}: EventsCarouselProps) => {
  const carousel = useEventsCarousel(events.length);

  return (
    <section
      className={styles.carousel}
      aria-label={TEXTS.events.carouselLabel}
      aria-roledescription="carrusel"
      aria-busy={isLoading}
    >
      <div
        ref={carousel.viewportRef}
        className={styles.viewport}
        data-dragging={carousel.isDragging}
        tabIndex={0}
        onScroll={carousel.handleScroll}
        onKeyDown={carousel.handleKeyDown}
        onPointerDown={carousel.handlePointerDown}
        onPointerMove={carousel.handlePointerMove}
        onPointerUp={carousel.handlePointerUp}
        onPointerCancel={carousel.handlePointerUp}
        onWheel={carousel.handleWheel}
      >
        <div className={styles.track}>
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => (
                <div
                  className={styles.skeleton}
                  aria-hidden="true"
                  key={index}
                />
              ))
            : events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  onSelect={(selectedEvent) => {
                    if (carousel.consumeDragClick()) return;
                    onSelectEvent(selectedEvent);
                  }}
                />
              ))}
        </div>
      </div>
      <p className={styles.srOnly} aria-live="polite">
        {events.length > 0
          ? TEXTS.events.eventOf
              .replace(
                '{current}',
                String(carousel.activeIndex + 1)
              )
              .replace('{total}', String(events.length))
          : ''}
      </p>
    </section>
  );
};

export default EventsCarousel;
