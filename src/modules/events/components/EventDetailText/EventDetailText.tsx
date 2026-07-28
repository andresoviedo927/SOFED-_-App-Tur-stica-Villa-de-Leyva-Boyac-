import { useEffect, useRef } from 'react';
import EventNarrationSentence from '../EventNarrationSentence';
import styles from './EventDetailText.module.css';
import type { EventDetailTextProps } from './EventDetailText.types';

export const EventDetailText = ({
  title,
  narration,
  activeSentenceId,
  completedSentenceIds,
  isAutoFollowEnabled,
  descriptionLabel,
  onManualScroll,
}: EventDetailTextProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeSentenceId || !isAutoFollowEnabled) return;

    const activeSentence =
      scrollRef.current?.querySelector<HTMLElement>(
        `[data-sentence-id="${activeSentenceId}"]`
      );

    activeSentence?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches
        ? 'auto'
        : 'smooth',
      block: 'center',
    });
  }, [activeSentenceId, isAutoFollowEnabled]);

  return (
    <div className={styles.text}>
      <h2>{title}</h2>
      <div
        ref={scrollRef}
        className={styles.scroll}
        tabIndex={0}
        aria-label={descriptionLabel}
        onWheel={onManualScroll}
        onTouchMove={onManualScroll}
        onPointerDown={onManualScroll}
      >
        {narration.map((paragraph) => (
          <p key={paragraph.id}>
            {paragraph.sentences.map((sentence) => (
              <EventNarrationSentence
                key={sentence.id}
                id={sentence.id}
                text={sentence.text}
                isActive={activeSentenceId === sentence.id}
                isCompleted={completedSentenceIds.includes(
                  sentence.id
                )}
              />
            ))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EventDetailText;
