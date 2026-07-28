import type { KeyboardEvent } from 'react';
import useSingleDroneVideo from '../../hooks/useSingleDroneVideo';
import DronePlayButton from '../DronePlayButton';
import DroneVideoError from '../DroneVideoError';
import DroneVideoLoading from '../DroneVideoLoading';
import type { SingleDroneVideoPlayerProps } from './SingleDroneVideoPlayer.types';
import styles from './SingleDroneVideoPlayer.module.css';

export const SingleDroneVideoPlayer = ({
  content,
  playLabel,
  pauseLabel,
  replayLabel,
  loadingLabel,
  errorTitle,
  errorMessage,
  retryLabel,
}: SingleDroneVideoPlayerProps) => {
  const {
    videoRef,
    status,
    play,
    pause,
    replay,
    retry,
    handlePlay,
    handlePause,
    handleEnded,
    handleWaiting,
    handleCanPlay,
    handleError,
  } = useSingleDroneVideo(content.src);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLVideoElement>
  ) => {
    const video = videoRef.current;
    if (!video) return;

    if (event.key === ' ') {
      event.preventDefault();
      if (status === 'playing') {
        pause();
      } else if (status === 'completed') {
        void replay();
      } else {
        void play();
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 5);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      video.currentTime = Math.min(
        Number.isFinite(video.duration)
          ? video.duration
          : video.currentTime + 5,
        video.currentTime + 5
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      video.volume = Math.min(1, video.volume + 0.1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      video.volume = Math.max(0, video.volume - 0.1);
    }
  };

  const showNativeControls =
    status === 'playing' ||
    status === 'paused' ||
    status === 'completed';

  return (
    <section
      className={styles.player}
      aria-label={content.accessibilityLabel}
      aria-busy={status === 'loading'}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={content.src || undefined}
        poster={content.poster}
        preload="metadata"
        playsInline
        controls={showNativeControls}
        aria-label={content.accessibilityLabel}
        style={{ objectPosition: content.objectPosition ?? 'center' }}
        tabIndex={0}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onKeyDown={handleKeyDown}
      >
        {content.captions && (
          <track
            kind="captions"
            src={content.captions}
            srcLang="es"
            label="Español"
            default
          />
        )}
      </video>

      {status === 'idle' && (
        <DronePlayButton
          label={playLabel}
          onPlay={() => void play()}
        />
      )}

      {status === 'completed' && (
        <DronePlayButton
          label={replayLabel}
          onPlay={() => void replay()}
        />
      )}

      {status === 'loading' && (
        <DroneVideoLoading text={loadingLabel} />
      )}

      {status === 'error' && (
        <DroneVideoError
          title={errorTitle}
          message={errorMessage}
          retryLabel={retryLabel}
          onRetry={retry}
        />
      )}

      <span className={styles.srOnly} aria-live="polite">
        {status === 'paused' ? pauseLabel : ''}
      </span>
    </section>
  );
};

export default SingleDroneVideoPlayer;
