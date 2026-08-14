export interface PlaceExperienceHeaderProps {
  title: string;
  onBack: () => void;
  isAudioMuted?: boolean;
  onAudioToggle?: () => void;
  hideAudio?: boolean;
  onOpenSettings?: () => void;
}
