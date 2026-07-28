import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CAPTURE_FILE_NAME } from '../constants/augmentedReality';
import drawCompositePhoto from '../utils/drawCompositePhoto';
import type {
  CompositeCaptureStatus,
  UseCompositePhotoCaptureResult,
} from '../types';

interface UseCompositePhotoCaptureOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  viewportRef: RefObject<HTMLElement | null>;
  characterImageSrc: string;
  fallbackImageSrc: string;
  useFallback: boolean;
}

const loadImage = async (source: string) => {
  const image = new Image();
  image.decoding = 'async';
  image.src = source;
  if (image.decode) {
    await image.decode();
  } else {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Image unavailable'));
    });
  }
  return image;
};

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
) =>
  new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, quality)
  );

export const useCompositePhotoCapture = ({
  videoRef,
  viewportRef,
  characterImageSrc,
  fallbackImageSrc,
  useFallback,
}: UseCompositePhotoCaptureOptions): UseCompositePhotoCaptureResult => {
  const [status, setStatus] =
    useState<CompositeCaptureStatus>('idle');
  const [capturedPhotoUrl, setCapturedPhotoUrl] =
    useState<string | null>(null);
  const [capturedPhotoBlob, setCapturedPhotoBlob] =
    useState<Blob | null>(null);
  const photoUrlRef = useRef<string | null>(null);

  const revokePhotoUrl = useCallback(() => {
    if (photoUrlRef.current) {
      URL.revokeObjectURL(photoUrlRef.current);
      photoUrlRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    revokePhotoUrl();
    setCapturedPhotoUrl(null);
    setCapturedPhotoBlob(null);
    setStatus('idle');
  }, [revokePhotoUrl]);

  const capture = useCallback(async () => {
    setStatus('capturing');
    revokePhotoUrl();

    try {
      const viewport = viewportRef.current;
      if (!viewport) throw new Error('Viewport unavailable');

      const characterImage = await loadImage(characterImageSrc);
      const fallbackImage = useFallback
        ? await loadImage(fallbackImageSrc)
        : null;
      const bounds = viewport.getBoundingClientRect();
      const canvas = drawCompositePhoto({
        video: useFallback ? null : videoRef.current,
        fallbackImage,
        characterImage,
        viewportWidth: bounds.width,
        viewportHeight: bounds.height,
      });
      const jpegBlob = await canvasToBlob(
        canvas,
        'image/jpeg',
        0.92
      );
      const blob =
        jpegBlob ?? (await canvasToBlob(canvas, 'image/png'));
      if (!blob) throw new Error('Photo generation failed');

      const photoUrl = URL.createObjectURL(blob);
      photoUrlRef.current = photoUrl;
      setCapturedPhotoBlob(blob);
      setCapturedPhotoUrl(photoUrl);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [
    characterImageSrc,
    fallbackImageSrc,
    revokePhotoUrl,
    useFallback,
    videoRef,
    viewportRef,
  ]);

  const download = useCallback(() => {
    if (!capturedPhotoUrl || !capturedPhotoBlob) return;
    const link = document.createElement('a');
    link.href = capturedPhotoUrl;
    link.download = CAPTURE_FILE_NAME;
    link.click();
  }, [capturedPhotoBlob, capturedPhotoUrl]);

  useEffect(() => revokePhotoUrl, [revokePhotoUrl]);

  return {
    status,
    capturedPhotoUrl,
    capturedPhotoBlob,
    capture,
    reset,
    download,
  };
};

export default useCompositePhotoCapture;
