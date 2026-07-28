import type { RefObject } from 'react';
import IMAGES from '@/assets/images';
import type {
  NarrationParagraph,
  NarrationStatus,
} from '../types/narration.types';
import NarratorCharacterTransition from './NarratorCharacterTransition';
import ReadingTextContent from './ReadingTextContent';
import styles from './PlaceReadingScreen.module.css';

interface ReadingCardProps {
  articleTitle: string;
  content: readonly NarrationParagraph[];
  activeParagraphId: string | null;
  activeSentenceId: string | null;
  completedSentenceIds: readonly string[];
  isNarrationActive: boolean;
  isAutoFollowEnabled: boolean;
  scrollAreaLabel: string;
  characterAlt: string;
  narrationStatus: NarrationStatus;
  isCharacterVisible: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
  onManualScroll: () => void;
  onResumeAutoFollow: () => void;
}

export const ReadingCard = ({
  articleTitle,
  content,
  activeParagraphId,
  activeSentenceId,
  completedSentenceIds,
  isNarrationActive,
  isAutoFollowEnabled,
  scrollAreaLabel,
  characterAlt,
  narrationStatus,
  isCharacterVisible,
  scrollRef,
  onManualScroll,
  onResumeAutoFollow,
}: ReadingCardProps) => (
  <article
    className={`${styles.readingCard} ${
      isCharacterVisible ? styles.readingCardActive : ''
    }`}
    style={{
      backgroundImage: `url("${IMAGES.interactive.reading.paperTexture}")`,
    }}
  >
    <ReadingTextContent
      articleTitle={articleTitle}
      content={content}
      activeParagraphId={activeParagraphId}
      activeSentenceId={activeSentenceId}
      completedSentenceIds={completedSentenceIds}
      isNarrationActive={isNarrationActive}
      isAutoFollowEnabled={isAutoFollowEnabled}
      scrollAreaLabel={scrollAreaLabel}
      scrollRef={scrollRef}
      onManualScroll={onManualScroll}
      onResumeAutoFollow={onResumeAutoFollow}
    />
    <NarratorCharacterTransition
      status={narrationStatus}
      isVisible={isCharacterVisible}
      alt={characterAlt}
    />
  </article>
);

export default ReadingCard;
