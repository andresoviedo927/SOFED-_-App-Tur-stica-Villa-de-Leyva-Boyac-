import type { RefObject } from 'react';

export interface CameraPreviewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  fallbackImage: string;
  showFallback: boolean;
  fallbackAlt: string;
}
