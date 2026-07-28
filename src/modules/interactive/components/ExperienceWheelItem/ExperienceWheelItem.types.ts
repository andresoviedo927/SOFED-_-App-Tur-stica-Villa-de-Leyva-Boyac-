import type { PlaceExperience } from '../../types';

export interface ExperienceWheelItemProps {
  experience: PlaceExperience;
  isSelected: boolean;
  controls?: string;
  expanded?: boolean;
  onSelect: (experience: PlaceExperience) => void;
}
