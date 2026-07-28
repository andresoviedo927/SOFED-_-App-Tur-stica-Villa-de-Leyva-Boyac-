import type { NarrationSentence } from '../types/narration.types';
import NarrationHighlight from './NarrationHighlight';

interface ReadingSentenceProps {
  key?: string;
  sentence: NarrationSentence;
  isActive: boolean;
  isCompleted: boolean;
}

export const ReadingSentence = ({
  sentence,
  isActive,
  isCompleted,
}: ReadingSentenceProps) => (
  <>
    <NarrationHighlight
      id={sentence.id}
      isActive={isActive}
      isCompleted={isCompleted}
    >
      {sentence.text}
    </NarrationHighlight>{' '}
  </>
);

export default ReadingSentence;
