import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import {
  createPanoramaViewerAdapter,
  type PanoramaViewerAdapter,
} from '../../services/PanoramaViewerAdapter';
import type {
  PanoramaScreenState,
} from '../../types/panorama.types';
import PanoramaErrorState from '../PanoramaErrorState';
import PanoramaInteractionHint from '../PanoramaInteractionHint';
import PanoramaLoadingState from '../PanoramaLoadingState';
import PanoramaResetButton from '../PanoramaResetButton';
import type { SinglePanoramaViewerProps } from './SinglePanoramaViewer.types';
import styles from './SinglePanoramaViewer.module.css';

const INITIAL_STATE: PanoramaScreenState = {
  status: 'idle',
  hasUserInteracted: false,
  errorMessage: null,
};

export const SinglePanoramaViewer = ({
  panorama,
  viewerLabel,
  interactionHint,
  wideInteractionHint,
  resetLabel,
  loadingLabel,
  errorTitle,
  errorMessage,
  retryLabel,
}: SinglePanoramaViewerProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const adapterRef = useRef<PanoramaViewerAdapter | null>(null);
  const pointersRef = useRef(
    new Map<number, { x: number; y: number }>()
  );
  const pinchDistanceRef = useRef<number | null>(null);
  const [state, setState] =
    useState<PanoramaScreenState>(INITIAL_STATE);
  const [isDragging, setIsDragging] = useState(false);
  const [retryVersion, setRetryVersion] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!viewport || !image) return;

    let cancelled = false;
    const adapter = createPanoramaViewerAdapter(viewport, image);
    adapterRef.current = adapter;
    setState(INITIAL_STATE);
    setState((current) => ({
      ...current,
      status: 'loading',
    }));

    adapter
      .load(panorama)
      .then(() => {
        if (cancelled) return;
        setState((current) => ({
          ...current,
          status: 'ready',
          errorMessage: null,
        }));
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setState((current) => ({
          ...current,
          status: 'error',
          errorMessage:
            error instanceof Error ? error.message : String(error),
        }));
      });

    return () => {
      cancelled = true;
      adapter.destroy();
      adapterRef.current = null;
      pointersRef.current.clear();
    };
  }, [panorama, retryVersion]);

  const markInteraction = () => {
    if (state.status !== 'ready' || state.hasUserInteracted) {
      return;
    }

    setState((current) => ({
      ...current,
      hasUserInteracted: true,
    }));
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (state.status !== 'ready') return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    setIsDragging(true);
    markInteraction();

    if (pointersRef.current.size === 2) {
      const points = [...pointersRef.current.values()];
      pinchDistanceRef.current = Math.hypot(
        points[0].x - points[1].x,
        points[0].y - points[1].y
      );
    }
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const previous = pointersRef.current.get(event.pointerId);
    if (!previous) return;

    event.preventDefault();
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointersRef.current.size === 2) {
      const points = [...pointersRef.current.values()];
      const distance = Math.hypot(
        points[0].x - points[1].x,
        points[0].y - points[1].y
      );
      const previousDistance = pinchDistanceRef.current ?? distance;
      adapterRef.current?.zoomBy(
        (distance - previousDistance) / 240
      );
      pinchDistanceRef.current = distance;
      return;
    }

    adapterRef.current?.panBy(
      event.clientX - previous.x,
      event.clientY - previous.y
    );
  };

  const handlePointerEnd = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    pointersRef.current.delete(event.pointerId);
    pinchDistanceRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (pointersRef.current.size === 0) {
      setIsDragging(false);
    }
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (state.status !== 'ready') return;

    event.preventDefault();
    markInteraction();

    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      adapterRef.current?.panBy(-event.deltaX, 0);
      return;
    }

    adapterRef.current?.zoomBy(-event.deltaY * 0.0015);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (state.status !== 'ready') return;

    const movement: Record<string, [number, number]> = {
      ArrowLeft: [28, 0],
      ArrowRight: [-28, 0],
      ArrowUp: [0, 20],
      ArrowDown: [0, -20],
    };
    const delta = movement[event.key];

    if (delta) {
      event.preventDefault();
      markInteraction();
      adapterRef.current?.panBy(...delta);
      return;
    }

    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      markInteraction();
      adapterRef.current?.zoomIn();
    } else if (event.key === '-') {
      event.preventDefault();
      markInteraction();
      adapterRef.current?.zoomOut();
    } else if (event.key === 'Home') {
      event.preventDefault();
      adapterRef.current?.reset();
    }
  };

  const hintText =
    panorama.type === 'equirectangular360'
      ? interactionHint
      : wideInteractionHint;

  return (
    <section
      ref={viewportRef}
      className={styles.viewer}
      data-dragging={isDragging}
      role="application"
      tabIndex={0}
      aria-label={viewerLabel}
      aria-describedby="panorama-interaction-description"
      aria-busy={state.status === 'loading'}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
    >
      <img
        ref={imageRef}
        className={styles.image}
        alt={panorama.alt}
        draggable={false}
      />

      <span
        id="panorama-interaction-description"
        className={styles.srOnly}
      >
        {hintText}
      </span>

      {state.status === 'loading' && (
        <PanoramaLoadingState text={loadingLabel} />
      )}

      {state.status === 'error' && (
        <PanoramaErrorState
          title={errorTitle}
          message={errorMessage}
          retryLabel={retryLabel}
          onRetry={() =>
            setRetryVersion((version) => version + 1)
          }
        />
      )}

      <PanoramaInteractionHint
        text={hintText}
        isVisible={
          state.status === 'ready' &&
          !state.hasUserInteracted
        }
      />

      <PanoramaResetButton
        label={resetLabel}
        isVisible={
          state.status === 'ready' &&
          state.hasUserInteracted
        }
        onReset={() => adapterRef.current?.reset()}
      />
    </section>
  );
};

export default SinglePanoramaViewer;
