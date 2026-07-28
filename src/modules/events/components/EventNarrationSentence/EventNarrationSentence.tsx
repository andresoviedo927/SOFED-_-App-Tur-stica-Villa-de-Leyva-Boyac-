import styles from './EventNarrationSentence.module.css';
import type { EventNarrationSentenceProps } from './EventNarrationSentence.types';

export const EventNarrationSentence = ({
  id,
  text,
  isActive,
  isCompleted,
}: EventNarrationSentenceProps) => (
  <span
    className={styles.sentence}
    data-sentence-id={id}
    data-active={isActive || undefined}
    data-completed={isCompleted || undefined}
    aria-current={isActive ? 'true' : undefined}
  >
    {text}{' '}
  </span>
);

export default EventNarrationSentence;
