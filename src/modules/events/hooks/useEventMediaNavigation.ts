import { useCallback } from 'react';
import narrationService from '@/modules/interactive/services/BrowserNarrationService';
import eventRoutes from '../constants/eventRoutes';
import type { TourismEvent } from '../types';

interface UseEventMediaNavigationOptions {
  event: TourismEvent | null;
  navigate: (route: string) => void;
  stopNarration?: () => void;
  returnToDetail?: () => void;
}

export interface UseEventMediaNavigationResult {
  openPhotos: () => void;
  openDrone: () => void;
  returnToDetail: () => void;
}

export const useEventMediaNavigation = ({
  event,
  navigate,
  stopNarration,
  returnToDetail,
}: UseEventMediaNavigationOptions): UseEventMediaNavigationResult => {
  const stopAudio = useCallback(() => {
    stopNarration?.();
    narrationService.stop();
    window.speechSynthesis?.cancel();
  }, [stopNarration]);

  const openPhotos = useCallback(() => {
    if (!event || event.gallery.length === 0) return;
    stopAudio();
    navigate(eventRoutes.photos(event.slug));
  }, [event, navigate, stopAudio]);

  const openDrone = useCallback(() => {
    if (!event?.droneVideo?.src) return;
    stopAudio();
    navigate(eventRoutes.drone(event.slug));
  }, [event, navigate, stopAudio]);

  const handleReturnToDetail = useCallback(() => {
    stopAudio();
    document
      .querySelectorAll<HTMLMediaElement>('audio, video')
      .forEach((media) => {
        media.pause();
        media.currentTime = 0;
      });

    if (returnToDetail) {
      returnToDetail();
      return;
    }

    if (event) navigate(eventRoutes.detail(event.slug));
  }, [event, navigate, returnToDetail, stopAudio]);

  return {
    openPhotos,
    openDrone,
    returnToDetail: handleReturnToDetail,
  };
};

export default useEventMediaNavigation;
