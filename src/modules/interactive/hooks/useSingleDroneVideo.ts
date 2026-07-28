import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type {
  SingleDroneVideoState,
  UseSingleDroneVideoResult,
} from '../types/droneVideo.types';

const INITIAL_STATE: SingleDroneVideoState = {
  status: 'idle',
  errorMessage: null,
};

export const useSingleDroneVideo = (
  source: string
): UseSingleDroneVideoResult => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] =
    useState<SingleDroneVideoState>(INITIAL_STATE);
  const isStoppingRef = useRef(false);
  const isRetryingRef = useRef(false);

  const setStatus = useCallback(
    (
      status: SingleDroneVideoState['status'],
      errorMessage: string | null = null
    ) => {
      setState({ status, errorMessage });
    },
    []
  );

  const play = useCallback(async () => {
    const video = videoRef.current;

    if (!video || !source) {
      setStatus(
        'error',
        'The local aerial video asset has not been supplied.'
      );
      return;
    }

    setStatus('loading');

    try {
      await video.play();
    } catch (error: unknown) {
      setStatus(
        'error',
        error instanceof Error ? error.message : String(error)
      );
    }
  }, [setStatus, source]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const replay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    await play();
  }, [play]);

  const retry = useCallback(() => {
    const video = videoRef.current;

    if (!video || !source) {
      setStatus(
        'error',
        'The local aerial video asset has not been supplied.'
      );
      return;
    }

    isRetryingRef.current = true;
    setStatus('loading');
    video.load();
  }, [setStatus, source]);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isStoppingRef.current = true;
    video.pause();
    video.currentTime = 0;
    setStatus('idle');
    isStoppingRef.current = false;
  }, [setStatus]);

  const handlePlay = useCallback(() => {
    if (!isStoppingRef.current) setStatus('playing');
  }, [setStatus]);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (
      !isStoppingRef.current &&
      video &&
      !video.ended &&
      video.currentTime > 0
    ) {
      setStatus('paused');
    }
  }, [setStatus]);

  const handleEnded = useCallback(() => {
    setStatus('completed');
  }, [setStatus]);

  const handleWaiting = useCallback(() => {
    setStatus('loading');
  }, [setStatus]);

  const handleCanPlay = useCallback(() => {
    if (isRetryingRef.current) {
      isRetryingRef.current = false;
      setStatus('idle');
    }
  }, [setStatus]);

  const handleError = useCallback(() => {
    if (source) {
      setStatus('error', 'The video element could not load the asset.');
    }
  }, [setStatus, source]);

  useEffect(
    () => () => {
      const video = videoRef.current;
      if (!video) return;

      isStoppingRef.current = true;
      video.pause();
      video.currentTime = 0;
      video.removeAttribute('src');
      video.load();
    },
    []
  );

  return {
    videoRef,
    status: state.status,
    errorMessage: state.errorMessage,
    play,
    pause,
    replay,
    retry,
    stop,
    handlePlay,
    handlePause,
    handleEnded,
    handleWaiting,
    handleCanPlay,
    handleError,
  };
};

export default useSingleDroneVideo;
