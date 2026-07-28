import { CAMERA_CONSTRAINTS } from '../constants/augmentedReality';
import type { CameraErrorCode } from '../types';

const isLocalhost = () =>
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

export const mapCameraError = (
  error: unknown
): CameraErrorCode => {
  if (!window.isSecureContext && !isLocalhost()) {
    return 'insecureContext';
  }

  if (!(error instanceof DOMException)) return 'unknown';

  switch (error.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'permissionDenied';
    case 'NotFoundError':
      return 'cameraNotFound';
    case 'NotReadableError':
    case 'AbortError':
      return 'cameraBusy';
    case 'OverconstrainedError':
    case 'TypeError':
      return 'constraintsNotSupported';
    default:
      return 'unknown';
  }
};

export const CameraService = {
  isSupported: () =>
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    (window.isSecureContext || isLocalhost()),

  requestVideoStream: async (): Promise<MediaStream> => {
    if (!window.isSecureContext && !isLocalhost()) {
      throw new DOMException(
        'Secure context required',
        'SecurityError'
      );
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new DOMException(
        'Media devices unavailable',
        'NotSupportedError'
      );
    }

    return navigator.mediaDevices.getUserMedia(
      CAMERA_CONSTRAINTS
    );
  },

  stopStream: (stream: MediaStream | null) => {
    stream?.getTracks().forEach((track) => track.stop());
  },
};

export default CameraService;
