export type PanoramaType =
  | 'equirectangular360'
  | 'widePanorama';

export interface PlazaPrincipalPanorama {
  id: string;
  src: string;
  title: string;
  alt: string;
  type: PanoramaType;
  initialYaw?: number;
  initialPitch?: number;
  initialZoom?: number;
}

export type PanoramaStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'error';

export interface PanoramaScreenState {
  status: PanoramaStatus;
  hasUserInteracted: boolean;
  errorMessage: string | null;
}
