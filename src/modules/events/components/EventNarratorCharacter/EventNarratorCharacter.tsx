import { useEffect, useRef, type RefObject } from 'react';
import styles from './EventNarratorCharacter.module.css';

interface EventNarratorCharacterProps {
  src: string;
  alt: string;
  isExiting: boolean;
  isVideo: boolean;
  isMuted: boolean;
  isHidden: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}

const CANVAS_WIDTH = 156;
const CANVAS_HEIGHT = 258;
const FRAME_INTERVAL = 1000 / 15;

const softenNeutralBackdrop = (
  context: CanvasRenderingContext2D
) => {
  const frame = context.getImageData(
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
  const { data } = frame;
  const pixelCount = CANVAS_WIDTH * CANVAS_HEIGHT;
  const backgroundCandidate = new Uint8Array(pixelCount);
  const connectedBackground = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let minX = CANVAS_WIDTH;
  let maxX = -1;
  let minY = CANVAS_HEIGHT;
  let maxY = -1;

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    const offset = pixel * 4;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const alpha = data[offset + 3];

    if (alpha < 8) {
      continue;
    }

    const x = pixel % CANVAS_WIDTH;
    const y = Math.floor(pixel / CANVAS_WIDTH);
    const maximum = Math.max(red, green, blue);
    const minimum = Math.min(red, green, blue);
    const luminance = (red + green + blue) / 3;
    const chroma = maximum - minimum;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);

    if (chroma <= 54 && luminance >= 142) {
      backgroundCandidate[pixel] = 1;
    }
  }

  if (maxX < minX || maxY < minY) {
    return;
  }

  let queueStart = 0;
  let queueEnd = 0;

  const enqueue = (x: number, y: number) => {
    if (
      x < minX ||
      x > maxX ||
      y < minY ||
      y > maxY
    ) {
      return;
    }

    const pixel = y * CANVAS_WIDTH + x;

    if (
      !backgroundCandidate[pixel] ||
      connectedBackground[pixel]
    ) {
      return;
    }

    connectedBackground[pixel] = 1;
    queue[queueEnd] = pixel;
    queueEnd += 1;
  };

  for (let x = minX; x <= maxX; x += 1) {
    enqueue(x, minY);
    enqueue(x, maxY);
  }
  for (let y = minY; y <= maxY; y += 1) {
    enqueue(minX, y);
    enqueue(maxX, y);
  }

  while (queueStart < queueEnd) {
    const pixel = queue[queueStart];
    queueStart += 1;
    const x = pixel % CANVAS_WIDTH;
    const y = Math.floor(pixel / CANVAS_WIDTH);

    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    if (!connectedBackground[pixel]) {
      continue;
    }

    data[pixel * 4 + 3] = 0;
  }

  context.putImageData(frame, 0, 0);
};

export const EventNarratorCharacter = ({
  src,
  alt,
  isExiting,
  isVideo,
  isMuted,
  isHidden,
  videoRef,
}: EventNarratorCharacterProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isVideo) {
      return undefined;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', {
      willReadFrequently: true,
    });

    if (!video || !canvas || !context) {
      return undefined;
    }

    let disposed = false;
    let started = false;
    let lastRenderedAt = -FRAME_INTERVAL;
    let frameCallbackId: number | null = null;
    let animationFrameId: number | null = null;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const showFallback = () => {
      canvas.hidden = true;
      video.dataset.fallback = 'true';
    };

    const renderFrame = () => {
      if (disposed || video.readyState < 2) {
        return;
      }

      try {
        const scale = Math.min(
          CANVAS_WIDTH / video.videoWidth,
          CANVAS_HEIGHT / video.videoHeight
        );
        const width = video.videoWidth * scale;
        const height = video.videoHeight * scale;
        const x = (CANVAS_WIDTH - width) / 2;
        const y = CANVAS_HEIGHT - height;

        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.drawImage(video, x, y, width, height);
        softenNeutralBackdrop(context);
      } catch {
        showFallback();
      }
    };

    const scheduleFrame = () => {
      if (disposed) {
        return;
      }

      if ('requestVideoFrameCallback' in video) {
        frameCallbackId = video.requestVideoFrameCallback((now) => {
          if (now - lastRenderedAt >= FRAME_INTERVAL) {
            lastRenderedAt = now;
            renderFrame();
          }
          scheduleFrame();
        });
        return;
      }

      animationFrameId = window.requestAnimationFrame((now) => {
        if (now - lastRenderedAt >= FRAME_INTERVAL) {
          lastRenderedAt = now;
          renderFrame();
        }
        scheduleFrame();
      });
    };

    const handleLoadedData = () => {
      if (started) {
        return;
      }

      started = true;
      renderFrame();
      scheduleFrame();
    };

    video.addEventListener('loadeddata', handleLoadedData);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      disposed = true;
      video.removeEventListener('loadeddata', handleLoadedData);

      if (
        frameCallbackId !== null &&
        'cancelVideoFrameCallback' in video
      ) {
        video.cancelVideoFrameCallback(frameCallbackId);
      }
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVideo, videoRef]);

  return (
    <div
      className={styles.character}
      data-exiting={isExiting || undefined}
      data-video={isVideo || undefined}
      data-hidden={isHidden || undefined}
      aria-hidden={isHidden || undefined}
    >
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            className={styles.videoSource}
            src={src}
            aria-label={alt}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            tabIndex={-1}
            onContextMenu={(event) => event.preventDefault()}
          />
          <canvas
            ref={canvasRef}
            className={styles.videoCanvas}
            aria-hidden="true"
          />
        </>
      ) : (
        <img src={src} alt={alt} draggable={false} />
      )}
    </div>
  );
};

export default EventNarratorCharacter;
