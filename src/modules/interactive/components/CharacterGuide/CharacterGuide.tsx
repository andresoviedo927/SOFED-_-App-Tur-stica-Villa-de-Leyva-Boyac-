import React, { useEffect, useRef } from 'react';
import useSavedSettings from '@/modules/settings/hooks/useSavedSettings';
import CharacterShadow from '../CharacterShadow';
import type { CharacterGuideProps } from './CharacterGuide.types';
import styles from './CharacterGuide.module.css';

const COMPOSITE_HEIGHT = 326;

const isEmbeddedBackdropPixel = (
  pixels: Uint8ClampedArray,
  offset: number
) => {
  const red = pixels[offset];
  const green = pixels[offset + 1];
  const blue = pixels[offset + 2];
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const luminance = (red + green + blue) / 3;

  return maximum - minimum <= 12 && luminance >= 210;
};

const removeBorderConnectedBackdrop = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  mask: Uint8Array,
  queue: Int32Array
) => {
  const frame = context.getImageData(0, 0, width, height);
  const { data } = frame;
  mask.fill(0);

  let head = 0;
  let tail = 0;
  const enqueue = (index: number) => {
    if (
      mask[index] === 1 ||
      !isEmbeddedBackdropPixel(data, index * 4)
    ) {
      return;
    }

    mask[index] = 1;
    queue[tail] = index;
    tail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }

  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head];
    head += 1;
    const x = index % width;
    const y = Math.floor(index / width);

    if (x > 0) enqueue(index - 1);
    if (x < width - 1) enqueue(index + 1);
    if (y > 0) enqueue(index - width);
    if (y < height - 1) enqueue(index + width);
  }

  for (let index = 0; index < mask.length; index += 1) {
    if (mask[index] === 1) {
      data[index * 4 + 3] = 0;
    }
  }

  context.putImageData(frame, 0, 0);
};

export const CharacterGuide: React.FC<CharacterGuideProps> = ({
  video,
  name,
}) => {
  const settings = useSavedSettings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    videoElement.muted = !settings.automaticNarration;
    videoElement.volume = Math.min(
      1,
      Math.max(0, settings.narrationVolume / 100)
    );
  }, [
    settings.automaticNarration,
    settings.narrationVolume,
  ]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', {
      willReadFrequently: true,
    });

    if (!videoElement || !canvas || !context) {
      return undefined;
    }

    let compositeWidth = 0;
    let mask = new Uint8Array(0);
    let queue = new Int32Array(0);
    let disposed = false;
    let videoFrameId: number | null = null;
    let animationFrameId: number | null = null;

    const showUnprocessedFallback = () => {
      canvas.hidden = true;
      videoElement.dataset.fallback = 'true';
    };

    const renderFrame = () => {
      if (
        disposed ||
        videoElement.readyState < 2 ||
        compositeWidth === 0
      ) {
        return;
      }

      try {
        context.clearRect(
          0,
          0,
          compositeWidth,
          COMPOSITE_HEIGHT
        );
        context.drawImage(
          videoElement,
          0,
          0,
          compositeWidth,
          COMPOSITE_HEIGHT
        );
        removeBorderConnectedBackdrop(
          context,
          compositeWidth,
          COMPOSITE_HEIGHT,
          mask,
          queue
        );
      } catch {
        showUnprocessedFallback();
      }
    };

    const scheduleFrame = () => {
      if (disposed || videoElement.ended) {
        return;
      }

      if ('requestVideoFrameCallback' in videoElement) {
        videoFrameId = videoElement.requestVideoFrameCallback(() => {
          renderFrame();
          scheduleFrame();
        });
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        renderFrame();
        scheduleFrame();
      });
    };

    const handleLoadedData = () => {
      const sourceAspectRatio =
        videoElement.videoWidth / videoElement.videoHeight;
      compositeWidth = Math.max(
        1,
        Math.round(COMPOSITE_HEIGHT * sourceAspectRatio)
      );
      canvas.width = compositeWidth;
      canvas.height = COMPOSITE_HEIGHT;
      const pixelCount = compositeWidth * COMPOSITE_HEIGHT;
      mask = new Uint8Array(pixelCount);
      queue = new Int32Array(pixelCount);
      renderFrame();
      scheduleFrame();
    };
    const handleEnded = () => renderFrame();

    const detachAutoplayRetry = () => {
      window.removeEventListener(
        'pointerdown',
        attemptPlayback,
        true
      );
      window.removeEventListener('keydown', attemptPlayback, true);
    };

    const attemptPlayback = () => {
      if (disposed || videoElement.ended) {
        detachAutoplayRetry();
        return;
      }

      void videoElement
        .play()
        .then(detachAutoplayRetry)
        .catch(() => {
          // The first pointer or keyboard interaction retries playback.
        });
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('ended', handleEnded);
    window.addEventListener('pointerdown', attemptPlayback, true);
    window.addEventListener('keydown', attemptPlayback, true);

    if (videoElement.readyState >= 2) {
      handleLoadedData();
    }
    attemptPlayback();

    return () => {
      disposed = true;
      detachAutoplayRetry();
      videoElement.removeEventListener(
        'loadeddata',
        handleLoadedData
      );
      videoElement.removeEventListener('ended', handleEnded);

      if (
        videoFrameId !== null &&
        'cancelVideoFrameCallback' in videoElement
      ) {
        videoElement.cancelVideoFrameCallback(videoFrameId);
      }
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      videoElement.pause();
    };
  }, [video]);

  return (
    <figure className={styles.guide}>
      <video
        ref={videoRef}
        className={styles.video}
        aria-label={name}
        autoPlay
        muted={!settings.automaticNarration}
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        tabIndex={-1}
        onContextMenu={(event) => event.preventDefault()}
      >
        <source src={video} type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        aria-hidden="true"
      />
      <CharacterShadow className={styles.shadow} />
    </figure>
  );
};

export default CharacterGuide;
