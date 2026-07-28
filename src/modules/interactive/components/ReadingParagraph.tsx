import type { NarrationParagraph } from '../types/narration.types';
import ReadingSentence from './ReadingSentence';
import styles from './PlaceReadingScreen.module.css';

interface ReadingParagraphProps {
  key?: string;
  paragraph: NarrationParagraph;
  activeSentenceId: string | null;
  completedSentenceIds: readonly string[];
  isActive: boolean;
}

export const ReadingParagraph = ({
  paragraph,
  activeSentenceId,
  completedSentenceIds,
  isActive,
}: ReadingParagraphProps) => (
  <p
    className={isActive ? styles.narrationParagraphActive : undefined}
    data-paragraph-id={paragraph.id}
  >
    {paragraph.sentences.map((sentence) => (
      <ReadingSentence
        key={sentence.id}
        sentence={sentence}
        isActive={sentence.id === activeSentenceId}
        isCompleted={completedSentenceIds.includes(sentence.id)}
      />
    ))}
  </p>
);

export default ReadingParagraph;
