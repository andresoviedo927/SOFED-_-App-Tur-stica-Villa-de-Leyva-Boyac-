import type { InteractivePlace } from '../../types';

export interface PlaceExperienceScreenProps {
  place: InteractivePlace;
  onBack: () => void;
  onNavigate: (destination: string) => void;
}
