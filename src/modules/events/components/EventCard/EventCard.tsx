import { useState } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type { EventCardProps } from './EventCard.types';
import styles from './EventCard.module.css';

export const EventCard = ({
  event,
  index,
  onSelect,
}: EventCardProps) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <article
      className={styles.article}
      aria-label={`${event.name}. ${event.dateLabel}`}
    >
      <button
        type="button"
        className={styles.card}
        data-event-index={index}
        aria-label={`${TEXTS.events.openEvent}: ${event.name}. ${event.dateLabel}`}
        title={event.name}
        onClick={() => onSelect(event)}
      >
        <img
          className={styles.image}
          src={
            hasImageError ? IMAGES.events.fallback : event.image
          }
          alt={event.imageAlt}
          draggable={false}
          onError={() => setHasImageError(true)}
        />
        <span className={styles.overlay}>
          <span className={styles.date}>{event.dateLabel}</span>
          <span className={styles.title}>{event.name}</span>
        </span>
      </button>
    </article>
  );
};

export default EventCard;
