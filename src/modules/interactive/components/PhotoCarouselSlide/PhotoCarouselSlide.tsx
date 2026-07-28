import { useState } from 'react';
import type { PhotoCarouselSlideProps } from './PhotoCarouselSlide.types';
import styles from './PhotoCarouselSlide.module.css';

type ImageStatus = 'loading' | 'loaded' | 'error';

export const PhotoCarouselSlide = ({
  photo,
  index,
  total,
  distanceFromActive,
  photoOfLabel,
  loadingLabel,
  loadErrorLabel,
  retryLabel,
}: PhotoCarouselSlideProps) => {
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [retryKey, setRetryKey] = useState(0);
  const slideLabel = photoOfLabel
    .replace('{current}', String(index + 1))
    .replace('{total}', String(total));

  return (
    <div
      className={styles.slide}
      data-photo-index={index}
      data-distance={Math.min(2, distanceFromActive)}
      role="group"
      aria-roledescription="diapositiva"
      aria-label={slideLabel}
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
          <button
            type="button"
            onClick={() => {
              setStatus('loading');
              setRetryKey((current) => current + 1);
            }}
          >
            {retryLabel}
          </button>
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
    </div>
  );
};

export default PhotoCarouselSlide;
