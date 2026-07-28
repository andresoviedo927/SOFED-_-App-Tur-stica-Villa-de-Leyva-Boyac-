import type { EventNarrationParagraph } from '../../types';

export interface EventDetailTextProps {
  title: string;
  narration: readonly EventNarrationParagraph[];
  activeSentenceId: string | null;
  completedSentenceIds: readonly string[];
  isAutoFollowEnabled: boolean;
  descriptionLabel: string;
  onManualScroll: () => void;
}
