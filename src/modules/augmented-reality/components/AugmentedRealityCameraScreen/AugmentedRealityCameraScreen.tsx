import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type {
  AugmentedRealityStatus,
  CameraErrorCode,
} from '../../types';
import useCameraStream from '../../hooks/useCameraStream';
import useCompositePhotoCapture from '../../hooks/useCompositePhotoCapture';
import CameraErrorState from '../CameraErrorState';
import CameraPreview from '../CameraPreview';
import CameraShutterButton from '../CameraShutterButton';
import CapturedPhotoPreview from '../CapturedPhotoPreview';
import styles from './AugmentedRealityCameraScreen.module.css';

interface AugmentedRealityCameraScreenProps {
  onBack: () => void;
}

const isPortraitViewport = () =>
  window.innerHeight > window.innerWidth;

const AugmentedRealityCameraScreen = ({
  onBack,
}: AugmentedRealityCameraScreenProps) => {
  const copy = TEXTS.augmentedReality;
  const viewportRef = useRef<HTMLElement>(null);
  const shutterRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] =
    useState<AugmentedRealityStatus>('idle');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const camera = useCameraStream();
  const capture = useCompositePhotoCapture({
    videoRef: camera.videoRef,
    viewportRef,
    includeCharacter: false,
    fallbackImageSrc: IMAGES.augmentedReality.photoBackground,
    useFallback: isDemoMode,
  });

  const stopExperience = useCallback(() => {
    capture.reset();
    camera.stopCamera();
    window.speechSynthesis?.cancel();
    document
      .querySelectorAll<HTMLMediaElement>('audio, video')
      .forEach((media) => {
        if (media !== camera.videoRef.current) media.pause();
      });
  }, [
    camera.stopCamera,
    camera.videoRef,
    capture.reset,
  ]);

  const handleBack = useCallback(() => {
    stopExperience();
    onBack();
  }, [onBack, stopExperience]);

  useEffect(() => {
    window.speechSynthesis?.cancel();

    const startWhenLandscape = () => {
      if (isPortraitViewport() || status !== 'idle') return;
      setStatus('requestingPermission');
      void camera.startCamera();
    };

    startWhenLandscape();
    window.addEventListener('resize', startWhenLandscape);
    window.addEventListener('orientationchange', startWhenLandscape);
    return () => {
      window.removeEventListener('resize', startWhenLandscape);
      window.removeEventListener(
        'orientationchange',
        startWhenLandscape
      );
    };
  }, [camera.startCamera, status]);

  useEffect(() => {
    if (camera.status === 'requesting') {
      setStatus('requestingPermission');
    } else if (camera.status === 'ready') {
      setStatus('characterVisible');
    } else if (camera.status === 'error') {
      setStatus('error');
    }
  }, [camera.status]);

  useEffect(() => {
    if (capture.status === 'capturing') setStatus('capturing');
    if (capture.status === 'ready') setStatus('preview');
    if (capture.status === 'error') setStatus('error');
  }, [capture.status]);

  useEffect(
    () => () => {
      capture.reset();
      camera.stopCamera();
    },
    [
      camera.stopCamera,
      capture.reset,
    ]
  );

  const startDemo = useCallback(() => {
    camera.stopCamera();
    capture.reset();
    setIsDemoMode(true);
    setStatus('characterVisible');
  }, [
    camera.stopCamera,
    capture.reset,
  ]);

  const retryCamera = useCallback(() => {
    setIsDemoMode(false);
    capture.reset();
    setStatus('requestingPermission');
    void camera.retryCamera();
  }, [
    camera.retryCamera,
    capture.reset,
  ]);

  const retake = useCallback(() => {
    capture.reset();
    setStatus('characterVisible');
    window.requestAnimationFrame(() => shutterRef.current?.focus());
  }, [capture.reset]);

  const errorMessage = useMemo(() => {
    if (capture.status === 'error') return copy.errors.capture;
    const messages: Record<CameraErrorCode, string> = {
      unsupported: copy.errors.unsupported,
      permissionDenied: copy.errors.permissionDenied,
      cameraNotFound: copy.errors.cameraNotFound,
      cameraBusy: copy.errors.cameraBusy,
      constraintsNotSupported:
        copy.errors.constraintsNotSupported,
      insecureContext: copy.errors.insecureContext,
      unknown: copy.errors.unknown,
    };
    return messages[camera.errorCode ?? 'unknown'];
  }, [camera.errorCode, capture.status, copy]);

  const announcement = useMemo(() => {
    if (status === 'startingCamera')
      return copy.accessibility.cameraActivated;
    if (status === 'characterVisible')
      return copy.accessibility.cameraActivated;
    if (status === 'preview')
      return copy.accessibility.photoCaptured;
    return '';
  }, [copy, status]);

  return (
    <main
      ref={viewportRef}
      className={styles.screen}
      aria-busy={
        status === 'requestingPermission' ||
        status === 'startingCamera' ||
        status === 'capturing'
      }
    >
      <CameraPreview
        videoRef={camera.videoRef}
        fallbackImage={IMAGES.augmentedReality.photoBackground}
        showFallback={isDemoMode || camera.status !== 'ready'}
        fallbackAlt={copy.accessibility.demoBackgroundAlt}
      />

      {status !== 'preview' && (
        <>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            <span aria-hidden="true">‹</span>
            {copy.camera.back}
          </button>

          {isDemoMode && (
            <div className={styles.demoBadge}>
              {copy.demo.title}
            </div>
          )}

          {(status === 'requestingPermission' ||
            status === 'startingCamera') && (
            <div className={styles.statusMessage}>
              <span className={styles.spinner} aria-hidden="true" />
              {copy.activatingCamera}
            </div>
          )}

          <CameraShutterButton
            ref={shutterRef}
            label={copy.camera.capture}
            disabled={status !== 'characterVisible'}
            onCapture={() => void capture.capture()}
          />

          {status === 'capturing' && (
            <div className={styles.cameraFlash} aria-hidden="true" />
          )}
        </>
      )}

      {status === 'preview' && capture.capturedPhotoUrl && (
        <CapturedPhotoPreview
          photoUrl={capture.capturedPhotoUrl}
          alt={copy.preview.capturedAlt}
          retakeLabel={copy.preview.retake}
          saveLabel={copy.preview.save}
          onRetake={retake}
          onSave={capture.download}
        />
      )}

      {status === 'error' && (
        <CameraErrorState
          title={copy.errors.title}
          message={errorMessage}
          retryLabel={copy.camera.retry}
          backLabel={copy.camera.back}
          demoLabel={copy.demo.start}
          onRetry={retryCamera}
          onBack={handleBack}
          onDemo={startDemo}
        />
      )}

      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>
    </main>
  );
};

export default AugmentedRealityCameraScreen;
