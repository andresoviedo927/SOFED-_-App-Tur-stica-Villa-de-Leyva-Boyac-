export interface EventMediaActionsProps {
  eventName: string;
  isPhotosAvailable: boolean;
  isDroneAvailable: boolean;
  onOpenPhotos: () => void;
  onOpenDrone: () => void;
}
