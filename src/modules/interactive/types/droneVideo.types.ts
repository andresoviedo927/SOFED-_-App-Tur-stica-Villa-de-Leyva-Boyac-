import type { RefObject } from 'react';

export type DroneVideoStatus =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'error';

export interface SingleDroneVideoState {
  status: DroneVideoStatus;
  errorMessage: string | null;
}

export interface UseSingleDroneVideoResult {
  videoRef: RefObject<HTMLVideoElement | null>;
  status: DroneVideoStatus;
  errorMessage: string | null;
  play: () => Promise<void>;
  pause: () => void;
  replay: () => Promise<void>;
  retry: () => void;
  stop: () => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleEnded: () => void;
  handleWaiting: () => void;
  handleCanPlay: () => void;
  handleError: () => void;
}
