import TEXTS from '@/constants/texts';
import styles from './EventsEmptyState.module.css';

export const EventsEmptyState = () => (
  <section className={styles.empty} role="status">
    <h2>{TEXTS.events.emptyTitle}</h2>
    <p>{TEXTS.events.emptyMessage}</p>
  </section>
);

export default EventsEmptyState;
