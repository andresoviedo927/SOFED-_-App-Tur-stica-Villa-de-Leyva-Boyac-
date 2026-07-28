import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { Button } from '@/components/ui/Button';
import type { SecretRouteStatus } from '../../types/game.types';
import type { RouteMapImageProps } from './RouteMapImage.types';
import styles from './RouteMapImage.module.css';

type MapLoadStatus = 'loading' | 'loaded' | 'error';

const routeMapImages = [
  IMAGES.games.secretRoute.activeMap,
  IMAGES.games.secretRoute.completedMap,
] as const;

const getRouteMapImage = (status: SecretRouteStatus): string =>
  status === 'routeCompleted'
    ? IMAGES.games.secretRoute.completedMap
    : IMAGES.games.secretRoute.activeMap;

const preloadImage = (source: string) =>
  new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Unable to load ${source}`));
    image.src = source;
  });

export const RouteMapImage = ({
  status,
  completedPoints,
  activePoint,
  alt,
  scale = 1,
}: RouteMapImageProps) => {
  const texts = TEXTS.games.secretPlazaRoute.routeExperience;
  const [loadStatus, setLoadStatus] =
    useState<MapLoadStatus>('loading');
  const [retryKey, setRetryKey] = useState(0);
  const selectedImage = useMemo(
    () => getRouteMapImage(status),
    [status]
  );

  useEffect(() => {
    let isCurrent = true;
    setLoadStatus('loading');

    void Promise.all(routeMapImages.map(preloadImage))
      .then(() => {
        if (isCurrent) {
          setLoadStatus('loaded');
        }
      })
      .catch(() => {
        if (isCurrent) {
          setLoadStatus('error');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [retryKey]);

  return (
    <div
      className={styles.card}
      data-completed-points={completedPoints}
      data-active-point={activePoint}
      style={{
        backgroundImage: `url("${IMAGES.interactive.reading.paperTexture}")`,
      }}
    >
      <div className={styles.inner}>
        {loadStatus === 'loading' && (
          <div className={styles.loader} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            <span>{texts.mapLoading}</span>
          </div>
        )}

        {loadStatus === 'error' && (
          <div className={styles.error} role="alert">
            <span>{texts.mapLoadError}</span>
            <Button
              kind="solid"
              size="small"
              className={styles.retryButton}
              onClick={() => setRetryKey((current) => current + 1)}
            >
              {texts.retryMap}
            </Button>
          </div>
        )}

        {loadStatus === 'loaded' && (
          <img
            key={selectedImage}
            className={styles.image}
            src={selectedImage}
            alt={alt}
            draggable={false}
            style={{
              '--route-map-scale': scale,
            } as CSSProperties}
          />
        )}
      </div>
    </div>
  );
};

export default RouteMapImage;
