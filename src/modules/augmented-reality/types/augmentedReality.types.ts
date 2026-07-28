import type { RefObject } from 'react';

export type AugmentedRealityStatus =
  | 'idle'
  | 'requestingPermission'
  | 'startingCamera'
  | 'scanningSurface'
  | 'surfaceReady'
  | 'placingCharacter'
  | 'characterVisible'
  | 'capturing'
  | 'preview'
  | 'error';

export type CameraErrorCode =
  | 'unsupported'
  | 'permissionDenied'
  | 'cameraNotFound'
  | 'cameraBusy'
  | 'constraintsNotSupported'
  | 'insecureContext'
  | 'unknown';

export type CameraStreamStatus =
  | 'idle'
  | 'requesting'
  | 'ready'
  | 'error';

export type SimulatedPlacementStatus =
  | 'idle'
  | 'scanning'
  | 'surfaceReady'
  | 'placing'
  | 'visible';

export type CompositeCaptureStatus =
  | 'idle'
  | 'capturing'
  | 'ready'
  | 'error';

export interface UseCameraStreamResult {
  videoRef: RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  status: CameraStreamStatus;
  errorCode: CameraErrorCode | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  retryCamera: () => Promise<void>;
}

export interface UseSimulatedCharacterPlacementResult {
  status: SimulatedPlacementStatus;
  elapsedTime: number;
  progress: number;
  startPlacementSequence: () => void;
  resetPlacementSequence: () => void;
  cancelPlacementSequence: () => void;
}

export interface UseCompositePhotoCaptureResult {
  status: CompositeCaptureStatus;
  capturedPhotoUrl: string | null;
  capturedPhotoBlob: Blob | null;
  capture: () => Promise<void>;
  reset: () => void;
  download: () => void;
}

export interface CoverCrop {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
}
