import TEXTS from '@/constants/texts';
import type { EventCardProps } from './EventCard.types';
import styles from './EventCard.module.css';

export const EventCard = ({
  event,
  index,
  onSelect,
}: EventCardProps) => {
  const isAvailable =
    event.name === 'Festival del Viento y las Cometas';
  const backgroundStyle = {
    backgroundImage: `url("${event.image}")`,
  };
  const content = (
    <span className={styles.overlay}>
      <span className={styles.date}>{event.dateLabel}</span>
      <span className={styles.title}>{event.name}</span>
    </span>
  );

  if (isAvailable) {
    return (
      <button
        type="button"
        className={`${styles.card} ${styles.interactive}`}
        style={backgroundStyle}
        data-event-index={index}
        aria-label={`${TEXTS.events.openEvent}: ${event.name}. ${event.dateLabel}`}
        title={event.name}
        onClick={() => onSelect(event)}
      >
        {content}
      </button>
    );
  }

  return (
    <article
      className={`${styles.card} ${styles.informative}`}
      style={backgroundStyle}
      data-event-index={index}
      aria-label={`${event.name}. ${event.dateLabel}`}
    >
      {content}
    </article>
  );
};

export default EventCard;
