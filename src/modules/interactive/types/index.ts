export interface InteractiveItem {
  id: string;
  title: string;
  description: string;
  type: '3d' | 'tour' | 'audio' | 'ar' | 'trivia';
}

export type MapPinColor =
  | 'blue'
  | 'yellow'
  | 'green'
  | 'red'
  | 'orange'
  | 'black';

export interface MapPinPOI {
  id: string;
  color: MapPinColor;
  title: string;
  category: string;
  description: string;
  xPercent: number;
  yPercent: number;
  disabled?: boolean;
  destination?: string;
}

export type LocateState = 'default' | 'loading' | 'success';

export type ExperienceType =
  | 'game'
  | 'reading'
  | 'gallery'
  | 'augmentedReality';

export type ActiveExperienceSubmenu = 'gallery' | null;

export interface PlaceExperience {
  id: string;
  type: ExperienceType;
  label: string;
  icon: string;
  destination: string;
  disabled?: boolean;
}

export interface InteractivePlace {
  id: string;
  title: string;
  backgroundImage: string;
  characterImage: string;
  centerIcon: string;
  experiences: PlaceExperience[];
}
