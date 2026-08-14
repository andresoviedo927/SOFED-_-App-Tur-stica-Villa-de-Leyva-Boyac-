import { useRef, useState } from 'react';
import type { PhotoCarouselSlideProps } from './PhotoCarouselSlide.types';
import styles from './PhotoCarouselSlide.module.css';

type ImageStatus = 'loading' | 'loaded' | 'error';

export const PhotoCarouselSlide = ({
  photo,
  index,
  total,
  relativePosition,
  isActive,
  isTransitioning,
  photoOfLabel,
  loadingLabel,
  loadErrorLabel,
  retryLabel,
  onSelect,
}: PhotoCarouselSlideProps) => {
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [retryKey, setRetryKey] = useState(0);
  const pointerStartXRef = useRef<number | null>(null);
  const slideLabel = photoOfLabel
    .replace('{current}', String(index + 1))
    .replace('{total}', String(total));
  const isVisible =
    relativePosition !== 'hidden-left' &&
    relativePosition !== 'hidden-right';
  const isSelectable = isVisible && !isActive;
  const canRetry = isVisible && status === 'error';
  const isInteractive = isSelectable || canRetry;

  const handleActivate = () => {
    if (isTransitioning) {
      return;
    }

    if (status === 'error') {
      setStatus('loading');
      setRetryKey((current) => current + 1);
      return;
    }

    if (isSelectable) {
      onSelect();
    }
  };

  return (
    <button
      type="button"
      className={styles.slide}
      data-photo-index={index}
      data-position={relativePosition}
      aria-roledescription="diapositiva"
      aria-label={
        isActive
          ? `Fotografía ${index + 1}, seleccionada`
          : isSelectable
            ? `Mostrar fotografía ${index + 1}`
            : slideLabel
      }
      aria-current={isActive ? 'true' : undefined}
      aria-hidden={!isVisible || undefined}
      tabIndex={isInteractive ? 0 : -1}
      disabled={isInteractive && isTransitioning}
      onPointerDown={
        isInteractive
          ? (event) => {
              pointerStartXRef.current = event.clientX;
            }
          : undefined
      }
      onPointerUp={
        isInteractive
          ? (event) => {
              const startX = pointerStartXRef.current;
              pointerStartXRef.current = null;
              if (
                startX !== null &&
                Math.abs(event.clientX - startX) <= 6
              ) {
                handleActivate();
              }
            }
          : undefined
      }
      onPointerCancel={
        isInteractive
          ? () => {
              pointerStartXRef.current = null;
            }
          : undefined
      }
      onClick={
        isInteractive
          ? (event) => {
              if (event.detail === 0) {
                handleActivate();
              }
            }
          : undefined
      }
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleActivate();
              }
            }
          : undefined
      }
    >
      {status === 'loading' && (
        <div className={styles.skeleton} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          <span>{loadingLabel}</span>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.error} role="alert">
          <span>{loadErrorLabel}</span>
          <span className={styles.retryLabel}>{retryLabel}</span>
        </div>
      )}

      <img
        key={retryKey}
        className={styles.image}
        data-loaded={status === 'loaded'}
        src={photo.src}
        alt={photo.alt}
        draggable={false}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </button>
  );
};

export default PhotoCarouselSlide;
