import type { ReactNode } from 'react';
import styles from './PlaceReadingScreen.module.css';

interface NarrationHighlightProps {
  id: string;
  isActive: boolean;
  isCompleted: boolean;
  children: ReactNode;
}

export const NarrationHighlight = ({
  id,
  isActive,
  isCompleted,
  children,
}: NarrationHighlightProps) => {
  const className = [
    styles.narrationSentence,
    isActive ? styles.narrationSentenceActive : '',
    isCompleted && !isActive
      ? styles.narrationSentenceCompleted
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      id={id}
      data-sentence-id={id}
      className={className}
      aria-current={isActive ? 'true' : undefined}
    >
      {children}
    </span>
  );
};

export default NarrationHighlight;

