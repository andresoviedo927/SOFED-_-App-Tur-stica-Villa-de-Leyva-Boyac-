import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { Button } from '@/components/ui/Button';
import { SECRET_ROUTE_POINTS } from '../../data/secretRoutePoints';
import type { SecretRouteStatus } from '../../types/game.types';
import type { RouteMapImageProps } from './RouteMapImage.types';
import styles from './RouteMapImage.module.css';

type MapLoadStatus = 'loading' | 'loaded' | 'error';

const routeMapImages = [
  IMAGES.games.secretRoute.activeMap,
  IMAGES.games.secretRoute.completedMap,
  IMAGES.games.secretRoute.character,
] as const;

const WALK_DURATION_MS = 780;

const pointPositions = [
  { id: 1, x: 36.7, y: 19.5 },
  { id: 2, x: 51.5, y: 39.3 },
  { id: 3, x: 43.3, y: 77.5 },
  { id: 4, x: 70.4, y: 66.5 },
  { id: 5, x: 64, y: 8.5 },
] as const;

// These paths follow the centre of the route already drawn into the map image.
// Keeping the same 1400 x 600 coordinate system makes the progress colour sit
// directly inside the original grey track as the responsive map is resized.
const routeProgressPaths = [
  { id: '1-2', completedAt: 2, d: 'M 514 165 L 723 291' },
  { id: '2-3', completedAt: 3, d: 'M 723 291 L 607 513' },
  { id: '3-4', completedAt: 4, d: 'M 607 513 L 987 445' },
  { id: '4-5', completedAt: 5, d: 'M 987 445 L 897 104' },
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
  characterPoint,
  alt,
  scale = 1,
  onPointSelect,
}: RouteMapImageProps) => {
  const texts = TEXTS.games.secretPlazaRoute.routeExperience;
  const [loadStatus, setLoadStatus] =
    useState<MapLoadStatus>('loading');
  const [retryKey, setRetryKey] = useState(0);
  const [isCharacterMoving, setIsCharacterMoving] = useState(false);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const previousCharacterPointRef = useRef(characterPoint);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
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

  useEffect(() => {
    if (
      status === 'routeCompleted' ||
      previousCharacterPointRef.current === characterPoint
    ) {
      previousCharacterPointRef.current = characterPoint;
      return;
    }

    previousCharacterPointRef.current = characterPoint;
    setIsCharacterMoving(true);
    const timer = window.setTimeout(
      () => setIsCharacterMoving(false),
      WALK_DURATION_MS
    );

    return () => window.clearTimeout(timer);
  }, [characterPoint, status]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      event.button !== 0 ||
      (event.target instanceof Element && event.target.closest('button'))
    ) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: mapOffset.x,
      originY: mapOffset.y,
    };
    event.currentTarget.dataset.dragging = 'true';
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setMapOffset({
      x: Math.max(-38, Math.min(38, drag.originX + event.clientX - drag.startX)),
      y: Math.max(-18, Math.min(18, drag.originY + event.clientY - drag.startY)),
    });
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;

    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={styles.card}
      data-completed-points={completedPoints}
      data-active-point={activePoint}
      style={{
        backgroundImage: `url("${IMAGES.interactive.reading.paperTexture}")`,
      }}
    >
      <div
        className={styles.inner}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
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
          <div
            className={styles.canvas}
            style={{
              '--route-map-scale': scale,
              '--map-offset-x': `${mapOffset.x}px`,
              '--map-offset-y': `${mapOffset.y}px`,
            } as CSSProperties}
          >
            <img
              key={selectedImage}
              className={styles.image}
              src={selectedImage}
              alt={alt}
              draggable={false}
            />

            {status !== 'routeCompleted' && (
              <div
                className={styles.gameLayer}
                data-character-moving={isCharacterMoving}
                aria-label="Puntos del recorrido"
              >
                <svg
                  className={styles.routeProgress}
                  viewBox="0 0 1400 600"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {routeProgressPaths.map((segment) => (
                    <path
                      key={segment.id}
                      className={styles.completedSegment}
                      data-visible={completedPoints >= segment.completedAt}
                      d={segment.d}
                      pathLength={1}
                    />
                  ))}
                </svg>

                {pointPositions.map((position) => {
                  const point = SECRET_ROUTE_POINTS[position.id - 1];
                  const pointState = position.id <= completedPoints
                    ? 'completed'
                    : position.id === activePoint
                      ? 'active'
                      : 'locked';

                  return (
                    <button
                      key={position.id}
                      type="button"
                      className={styles.pointButton}
                      data-state={pointState}
                      data-sound-effect="none"
                      aria-label={`Punto ${position.id}: ${point.name}. ${
                        pointState === 'active'
                          ? 'Disponible'
                          : pointState === 'completed'
                            ? 'Completado'
                            : 'Bloqueado'
                      }`}
                      aria-pressed={pointState === 'completed'}
                      disabled={isCharacterMoving}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                      onClick={() => onPointSelect?.(position.id)}
                    >
                      <span className={styles.pointMarker} aria-hidden="true">
                        <span className={styles.pointNumber}>{position.id}</span>
                      </span>
                    </button>
                  );
                })}

                <span
                  className={styles.character}
                  data-moving={isCharacterMoving}
                  aria-hidden="true"
                  style={{
                    left: `${pointPositions[characterPoint - 1].x}%`,
                    top: `${pointPositions[characterPoint - 1].y}%`,
                  }}
                >
                  <img
                    src={IMAGES.games.secretRoute.character}
                    alt=""
                    draggable={false}
                  />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMapImage;
