import { useEffect, useRef, type RefObject } from 'react';
import IMAGES from '@/assets/images';
import type { NarrationParagraph } from '../types/narration.types';
import styles from './PlaceReadingScreen.module.css';

interface ReadingCardProps {
  articleTitle: string;
  content: readonly NarrationParagraph[];
  characterVideo: string;
  characterLabel: string;
  isMuted: boolean;
  characterVideoRef: RefObject<HTMLVideoElement | null>;
}

const isLightNeutralPixel = (
  pixels: Uint8ClampedArray,
  offset: number
) => {
  const red = pixels[offset];
  const green = pixels[offset + 1];
  const blue = pixels[offset + 2];
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const luminance = (red + green + blue) / 3;

  return maximum - minimum <= 16 && luminance >= 205;
};

const removeConnectedBackdrop = (
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
      !isLightNeutralPixel(data, index * 4)
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

export const ReadingCard = ({
  articleTitle,
  content,
  characterVideo,
  characterLabel,
  isMuted,
  characterVideoRef,
}: ReadingCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = characterVideoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', {
      willReadFrequently: true,
    });

    if (!video || !canvas || !context) {
      return undefined;
    }

    let disposed = false;
    let frameCallbackId: number | null = null;
    let animationFrameId: number | null = null;
    let renderWidth = 0;
    let mask = new Uint8Array(0);
    let queue = new Int32Array(0);

    const showFallback = () => {
      canvas.hidden = true;
      video.dataset.fallback = 'true';
    };

    const renderFrame = () => {
      if (disposed || video.readyState < 2 || renderWidth === 0) {
        return;
      }

      try {
        context.clearRect(0, 0, renderWidth, 258);
        context.drawImage(video, 0, 0, renderWidth, 258);
        removeConnectedBackdrop(
          context,
          renderWidth,
          258,
          mask,
          queue
        );
      } catch {
        showFallback();
      }
    };

    const scheduleFrame = () => {
      if (disposed || video.ended) {
        return;
      }

      if ('requestVideoFrameCallback' in video) {
        frameCallbackId = video.requestVideoFrameCallback(() => {
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
      renderWidth = Math.max(
        1,
        Math.round(258 * (video.videoWidth / video.videoHeight))
      );
      canvas.width = renderWidth;
      canvas.height = 258;
      const pixelCount = renderWidth * 258;
      mask = new Uint8Array(pixelCount);
      queue = new Int32Array(pixelCount);
      renderFrame();
      scheduleFrame();
    };
    const handleEnded = () => renderFrame();

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      disposed = true;
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);

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
  }, [characterVideoRef]);

  return (
    <article
      className={`${styles.readingCard} ${
        isMuted ? styles.readingCardMuted : ''
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url("${IMAGES.interactive.reading.paperTexture}")`,
      }}
    >
      <section className={styles.textContent}>
        <h2 className={styles.articleTitle}>{articleTitle}</h2>
        <div className={styles.readingDescription}>
          {content.map((paragraph) => (
            <p key={paragraph.id}>
              {paragraph.sentences
                .map((sentence) => sentence.text)
                .join(' ')}
            </p>
          ))}
        </div>
      </section>

      <div className={styles.characterWrap}>
        <video
          ref={characterVideoRef}
          className={styles.readingCharacterSource}
          src={characterVideo}
          aria-label={characterLabel}
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
          className={styles.readingCharacter}
          aria-hidden="true"
        />
      </div>
    </article>
  );
};

export default ReadingCard;
