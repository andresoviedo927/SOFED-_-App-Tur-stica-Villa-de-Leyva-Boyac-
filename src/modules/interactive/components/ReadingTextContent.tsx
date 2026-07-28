import type { RefObject } from 'react';
import type { NarrationParagraph } from '../types/narration.types';
import NarrationFollowButton from './NarrationFollowButton';
import ReadingScrollableBody from './ReadingScrollableBody';
import styles from './PlaceReadingScreen.module.css';

interface ReadingTextContentProps {
  articleTitle: string;
  content: readonly NarrationParagraph[];
  activeParagraphId: string | null;
  activeSentenceId: string | null;
  completedSentenceIds: readonly string[];
  isNarrationActive: boolean;
  isAutoFollowEnabled: boolean;
  scrollAreaLabel: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  onManualScroll: () => void;
  onResumeAutoFollow: () => void;
}

export const ReadingTextContent = ({
  articleTitle,
  content,
  activeParagraphId,
  activeSentenceId,
  completedSentenceIds,
  isNarrationActive,
  isAutoFollowEnabled,
  scrollAreaLabel,
  scrollRef,
  onManualScroll,
  onResumeAutoFollow,
}: ReadingTextContentProps) => (
  <section className={styles.textContent}>
    <h2 className={styles.articleTitle}>{articleTitle}</h2>
    <ReadingScrollableBody
      content={content}
      activeParagraphId={activeParagraphId}
      activeSentenceId={activeSentenceId}
      completedSentenceIds={completedSentenceIds}
      isAutoFollowEnabled={isAutoFollowEnabled}
      ariaLabel={scrollAreaLabel}
      scrollRef={scrollRef}
      onManualScroll={onManualScroll}
    />
    <NarrationFollowButton
      isVisible={isNarrationActive && !isAutoFollowEnabled}
      onClick={onResumeAutoFollow}
    />
  </section>
);

export default ReadingTextContent;

