import { useEffect, type KeyboardEvent, type RefObject } from 'react';
import type { NarrationParagraph } from '../types/narration.types';
import ReadingParagraph from './ReadingParagraph';
import styles from './PlaceReadingScreen.module.css';

interface ReadingScrollableBodyProps {
  content: readonly NarrationParagraph[];
  activeParagraphId: string | null;
  activeSentenceId: string | null;
  completedSentenceIds: readonly string[];
  isAutoFollowEnabled: boolean;
  ariaLabel: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  onManualScroll: () => void;
}

const SCROLL_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'Home',
  'End',
  ' ',
]);

export const ReadingScrollableBody = ({
  content,
  activeParagraphId,
  activeSentenceId,
  completedSentenceIds,
  isAutoFollowEnabled,
  ariaLabel,
  scrollRef,
  onManualScroll,
}: ReadingScrollableBodyProps) => {
  useEffect(() => {
    const container = scrollRef.current;

    if (
      !container ||
      !activeSentenceId ||
      !isAutoFollowEnabled
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const activeSentence = document.getElementById(activeSentenceId);

      if (!activeSentence || !container.contains(activeSentence)) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const sentenceRect = activeSentence.getBoundingClientRect();
      const isOutsideViewport =
        sentenceRect.top < containerRect.top + 8 ||
        sentenceRect.bottom > containerRect.bottom - 8;

      if (!isOutsideViewport) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const targetTop =
        container.scrollTop +
        sentenceRect.top -
        containerRect.top -
        container.clientHeight / 2 +
        sentenceRect.height / 2;

      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeSentenceId, isAutoFollowEnabled, scrollRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (SCROLL_KEYS.has(event.key)) {
      onManualScroll();
    }
  };

  return (
    <div
      ref={scrollRef}
      className={styles.scrollableBody}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      onWheel={onManualScroll}
      onTouchStart={onManualScroll}
      onPointerDown={onManualScroll}
      onKeyDown={handleKeyDown}
    >
      {content.map((paragraph) => (
        <ReadingParagraph
          key={paragraph.id}
          paragraph={paragraph}
          activeSentenceId={activeSentenceId}
          completedSentenceIds={completedSentenceIds}
          isActive={paragraph.id === activeParagraphId}
        />
      ))}
    </div>
  );
};

export default ReadingScrollableBody;
