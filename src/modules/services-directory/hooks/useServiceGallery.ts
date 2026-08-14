import { useCallback, useEffect, useRef, useState } from 'react';
import { playSoundEffect } from '@/services/SoundEffectsService';
import type {
  ServiceGalleryImage,
  ServiceGalleryStatus,
} from '../types/serviceDetail.types';

export const useServiceGallery = (images: ServiceGalleryImage[]) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryStatus, setGalleryStatus] =
    useState<ServiceGalleryStatus>(
      images.length ? 'loading' : 'ready'
    );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setGalleryStatus(images.length ? 'loading' : 'ready');
  }, [images]);

  const showPrevious = useCallback(() => {
    if (images.length < 2) return;
    playSoundEffect('swipe');
    setGalleryStatus('loading');
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    if (images.length < 2) return;
    playSoundEffect('swipe');
    setGalleryStatus('loading');
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }, [images.length]);

  const selectImage = useCallback(
    (index: number) => {
      if (index === activeImageIndex) return;
      playSoundEffect('swipe');
      setGalleryStatus('loading');
      setActiveImageIndex(index);
    },
    [activeImageIndex]
  );

  const handleTouchStart = useCallback((clientX: number) => {
    touchStartX.current = clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (clientX: number) => {
      if (touchStartX.current === null || images.length < 2) return;
      const distance = clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(distance) < 36) return;
      if (distance > 0) showPrevious();
      else showNext();
    },
    [images.length, showNext, showPrevious]
  );

  return {
    activeImageIndex,
    galleryStatus,
    showPrevious,
    showNext,
    selectImage,
    handleTouchStart,
    handleTouchEnd,
    markReady: () => setGalleryStatus('ready'),
    markError: () => setGalleryStatus('error'),
  };
};

export default useServiceGallery;
