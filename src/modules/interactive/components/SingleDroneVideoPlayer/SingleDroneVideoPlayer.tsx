import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import useSingleDroneVideo from '../../hooks/useSingleDroneVideo';
import DronePlayButton from '../DronePlayButton';
import DroneVideoError from '../DroneVideoError';
import DroneVideoLoading from '../DroneVideoLoading';
import type { SingleDroneVideoPlayerProps } from './SingleDroneVideoPlayer.types';
import styles from './SingleDroneVideoPlayer.module.css';

type EmbedStatus = 'loading' | 'ready' | 'error';

interface YouTubeMessage {
  event?: string;
  info?: unknown;
}

const parseYouTubeMessage = (data: unknown): YouTubeMessage | null => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as YouTubeMessage;
    } catch {
      return null;
    }
  }

  if (typeof data === 'object' && data !== null) {
    return data as YouTubeMessage;
  }

  return null;
};

const YouTubeDronePlayer = ({
  content,
}: Pick<SingleDroneVideoPlayerProps, 'content'>) => {
  const [status, setStatus] = useState<EmbedStatus>('loading');
  const [showAudioFallback, setShowAudioFallback] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasStartedRef = useRef(false);
  const iframeSrc = useMemo(
    () => `${content.src}&enablejsapi=1&playsinline=1`,
    [content.src]
  );

  const sendPlayerCommand = (
    func:
      | 'addEventListener'
      | 'getPlayerState'
      | 'playVideo'
      | 'setVolume'
      | 'unMute',
    args: unknown[] = []
  ) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args,
        id: content.id,
      }),
      '*'
    );
  };

  useEffect(() => {
    setStatus('loading');
    setShowAudioFallback(false);
    hasStartedRef.current = false;
    const timeout = window.setTimeout(
      () =>
        setStatus((current) =>
          current === 'loading' ? 'error' : current
        ),
      12000
    );

    return () => window.clearTimeout(timeout);
  }, [content.src]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (
        !event.origin.includes('youtube.com') &&
        !event.origin.includes('youtube-nocookie.com')
      ) {
        return;
      }

      const message = parseYouTubeMessage(event.data);
      const deliveredState =
        message?.event === 'infoDelivery' &&
        typeof message.info === 'object' &&
        message.info !== null
          ? (message.info as { playerState?: unknown }).playerState
          : undefined;
      if (
        (message?.event === 'onStateChange' &&
          message.info === 1) ||
        deliveredState === 1
      ) {
        hasStartedRef.current = true;
        setShowAudioFallback(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (status !== 'ready') {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      if (!hasStartedRef.current) {
        setShowAudioFallback(true);
      }
    }, 1800);

    return () => window.clearTimeout(fallbackTimer);
  }, [status]);

  const handleIframeLoad = () => {
    setStatus('ready');
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'listening',
        id: content.id,
      }),
      '*'
    );
    sendPlayerCommand('addEventListener', ['onStateChange']);
    sendPlayerCommand('getPlayerState');
  };

  const handlePlayWithAudio = () => {
    sendPlayerCommand('unMute');
    sendPlayerCommand('setVolume', [100]);
    sendPlayerCommand('playVideo');
    setShowAudioFallback(false);
  };

  return (
    <section
      className={styles.player}
      data-provider="youtube"
      aria-label={content.accessibilityLabel}
      aria-busy={status === 'loading'}
    >
      {status !== 'error' && (
        <iframe
          ref={iframeRef}
          className={styles.iframe}
          src={iframeSrc}
          title={content.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={handleIframeLoad}
          onError={() => setStatus('error')}
        />
      )}

      {status === 'ready' && showAudioFallback && (
        <button
          type="button"
          className={styles.audioFallbackButton}
          onClick={handlePlayWithAudio}
        >
          Reproducir con audio
        </button>
      )}

      {status === 'error' && (
        <div className={styles.fallback} role="alert">
          <p>No fue posible cargar el video en esta ventana.</p>
          <a
            href={content.watchUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ver el vuelo de drone en YouTube
          </a>
        </div>
      )}
    </section>
  );
};

const LocalDroneVideoPlayer = ({
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

export const SingleDroneVideoPlayer = (
  props: SingleDroneVideoPlayerProps
) =>
  props.content.provider === 'youtube' ? (
    <YouTubeDronePlayer content={props.content} />
  ) : (
    <LocalDroneVideoPlayer {...props} />
  );

export default SingleDroneVideoPlayer;
