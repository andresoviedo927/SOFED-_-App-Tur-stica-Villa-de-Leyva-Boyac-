import type {
  ActiveExperienceSubmenu,
  PlaceExperience,
} from '../../types';

export interface ExperienceWheelProps {
  experiences: PlaceExperience[];
  centerIcon: string;
  placeLabel: string;
  activeSubmenu: ActiveExperienceSubmenu;
  onToggleGallery: () => void;
  onCloseSubmenu: () => void;
  onNavigate: (destination: string) => void;
}
