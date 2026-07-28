import type { PlazaPrincipalPanorama } from '../../types/panorama.types';

export interface SinglePanoramaViewerProps {
  panorama: PlazaPrincipalPanorama;
  viewerLabel: string;
  interactionHint: string;
  wideInteractionHint: string;
  resetLabel: string;
  loadingLabel: string;
  errorTitle: string;
  errorMessage: string;
  retryLabel: string;
}
