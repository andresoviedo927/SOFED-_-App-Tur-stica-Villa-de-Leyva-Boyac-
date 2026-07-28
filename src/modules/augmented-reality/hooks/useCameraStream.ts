import { useCallback, useEffect, useRef, useState } from 'react';
import CameraService, {
  mapCameraError,
} from '../services/CameraService';
import type {
  CameraErrorCode,
  CameraStreamStatus,
  UseCameraStreamResult,
} from '../types';

const waitForMetadata = (video: HTMLVideoElement) =>
  new Promise<void>((resolve, reject) => {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      resolve();
      return;
    }

    const handleLoaded = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error('Video metadata unavailable'));
    };
    const cleanup = () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('error', handleError);
    };

    video.addEventListener('loadedmetadata', handleLoaded, {
      once: true,
    });
    video.addEventListener('error', handleError, {
      once: true,
    });
  });

export const useCameraStream = (): UseCameraStreamResult => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] =
    useState<CameraStreamStatus>('idle');
  const [errorCode, setErrorCode] =
    useState<CameraErrorCode | null>(null);

  const stopCamera = useCallback(() => {
    CameraService.stopStream(streamRef.current);
    streamRef.current = null;
    setStream(null);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setStatus('idle');
  }, []);

  const startCamera = useCallback(async () => {
    if (!CameraService.isSupported()) {
      setErrorCode(
        !window.isSecureContext
          ? 'insecureContext'
          : 'unsupported'
      );
      setStatus('error');
      return;
    }

    stopCamera();
    setErrorCode(null);
    setStatus('requesting');

    try {
      const nextStream =
        await CameraService.requestVideoStream();
      const video = videoRef.current;

      if (!video) {
        CameraService.stopStream(nextStream);
        throw new Error('Video element unavailable');
      }

      streamRef.current = nextStream;
      setStream(nextStream);
      video.srcObject = nextStream;
      await waitForMetadata(video);
      await video.play();

      if (video.videoWidth <= 0 || video.videoHeight <= 0) {
        throw new Error('Invalid camera dimensions');
      }

      setStatus('ready');
    } catch (error: unknown) {
      CameraService.stopStream(streamRef.current);
      streamRef.current = null;
      setStream(null);
      if (videoRef.current) videoRef.current.srcObject = null;
      setErrorCode(mapCameraError(error));
      setStatus('error');
    }
  }, [stopCamera]);

  const retryCamera = useCallback(async () => {
    stopCamera();
    await startCamera();
  }, [startCamera, stopCamera]);

  useEffect(() => stopCamera, [stopCamera]);

  return {
    videoRef,
    stream,
    status,
    errorCode,
    startCamera,
    stopCamera,
    retryCamera,
  };
};

export default useCameraStream;
