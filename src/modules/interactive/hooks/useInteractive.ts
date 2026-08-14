import {
  useState,
  useCallback,
  useEffect,
  PointerEvent,
} from 'react';
import { getInteractiveItems, getMapPins } from '../services/interactiveService';
import { InteractiveItem, MapPinPOI } from '../types';
import { MAP_ZOOM_LEVELS } from '../constants/map';

const getPanBounds = (zoomScale: number) => ({
  x: 180 * (zoomScale - 1),
  y: 90 * (zoomScale - 1),
});

export const useInteractive = () => {
  const [items] = useState<InteractiveItem[]>(getInteractiveItems());
  const [pins] = useState<MapPinPOI[]>(getMapPins());

  // Zoom and Pan states
  const [zoomLevel, setZoomLevel] = useState(0);
  const zoomScale = MAP_ZOOM_LEVELS[zoomLevel];
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setZoomLevel((currentLevel) =>
      Math.min(MAP_ZOOM_LEVELS.length - 1, currentLevel + 1)
    );
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((currentLevel) =>
      Math.max(0, currentLevel - 1)
    );
  }, []);

  const handleResetMap = useCallback(() => {
    setZoomLevel(0);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const bounds = getPanBounds(zoomScale);

    setPanOffset((currentOffset) => {
      const nextOffset = {
        x: Math.max(-bounds.x, Math.min(bounds.x, currentOffset.x)),
        y: Math.max(-bounds.y, Math.min(bounds.y, currentOffset.y)),
      };

      return nextOffset.x === currentOffset.x &&
        nextOffset.y === currentOffset.y
        ? currentOffset
        : nextOffset;
    });
  }, [zoomScale]);

  const handlePointerDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('button, a, [data-map-pin]')) {
      return;
    }

    // Only left click or touch drag
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Bound pan range so map doesn't completely disappear
    const bounds = getPanBounds(zoomScale);
    setPanOffset({
      x: Math.max(-bounds.x, Math.min(bounds.x, newX)),
      y: Math.max(-bounds.y, Math.min(bounds.y, newY)),
    });
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  return {
    items,
    pins,
    zoomScale,
    panOffset,
    isDragging,
    handleZoomIn,
    handleZoomOut,
    handleResetMap,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};

export default useInteractive;
