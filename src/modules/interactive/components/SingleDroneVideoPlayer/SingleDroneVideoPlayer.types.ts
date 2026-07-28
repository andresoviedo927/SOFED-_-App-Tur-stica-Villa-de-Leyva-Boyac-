import type { DroneVideoContent } from '../../data/plazaPrincipalDroneVideo';

export interface SingleDroneVideoPlayerProps {
  content: DroneVideoContent;
  playLabel: string;
  pauseLabel: string;
  replayLabel: string;
  loadingLabel: string;
  errorTitle: string;
  errorMessage: string;
  retryLabel: string;
}
