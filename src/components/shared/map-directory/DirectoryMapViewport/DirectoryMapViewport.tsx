import {
  useRef,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from 'react';
import styles from './DirectoryMapViewport.module.css';

interface DirectoryMapViewportProps {
  mapSrc: string;
  ariaLabel: string;
  zoom: number;
  offset: { x: number; y: number };
  mapContent?: ReactNode;
  overlayContent?: ReactNode;
  onCloseOverlay: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanBy: (x: number, y: number) => void;
}

export const DirectoryMapViewport = ({
  mapSrc,
  ariaLabel,
  zoom,
  offset,
  mapContent,
  overlayContent,
  onCloseOverlay,
  onReset,
  onZoomIn,
  onZoomOut,
  onPanBy,
}: DirectoryMapViewportProps) => {
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;
    dragStart.current = { x: event.clientX, y: event.clientY };
    onPanBy(deltaX, deltaY);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.deltaY < 0) onZoomIn();
    else onZoomOut();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+' || event.key === '=') onZoomIn();
    if (event.key === '-') onZoomOut();
    if (event.key === 'Home') onReset();
    if (event.key === 'Escape') onCloseOverlay();
  };

  return (
    <div
      className={styles.viewport}
      role="application"
      tabIndex={0}
      aria-label={ariaLabel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => {
        dragStart.current = null;
      }}
      onPointerCancel={() => {
        dragStart.current = null;
      }}
      onWheel={handleWheel}
      onKeyDown={handleKeyboard}
    >
      <div
        className={styles.canvas}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
        }}
      >
        <img
          className={styles.base}
          src={mapSrc}
          alt=""
          draggable={false}
        />
        {mapContent}
      </div>
      {overlayContent}
    </div>
  );
};

export default DirectoryMapViewport;
