import type { RefObject } from 'react';

export interface ARCharacterOverlayProps {
  src: string;
  alt: string;
  isPlacing: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}
