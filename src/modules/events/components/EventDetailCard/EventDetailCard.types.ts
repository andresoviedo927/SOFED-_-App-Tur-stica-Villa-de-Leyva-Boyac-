import type { NarrationStatus } from '@/modules/interactive/types/narration.types';
import type { TourismEvent } from '../../types';

export interface EventDetailCardProps {
  event: TourismEvent;
  narrationStatus: NarrationStatus;
  isCharacterVisible: boolean;
  activeSentenceId: string | null;
  completedSentenceIds: readonly string[];
  isAutoFollowEnabled: boolean;
  onManualScroll: () => void;
  onOpenPhotos: () => void;
  onOpenDrone: () => void;
}
