import { useState, useCallback, PointerEvent } from 'react';
import { getInteractiveItems, getMapPins } from '../services/interactiveService';
import { InteractiveItem, MapPinPOI } from '../types';

export const useInteractive = () => {
  const [items] = useState<InteractiveItem[]>(getInteractiveItems());
  const [pins] = useState<MapPinPOI[]>(getMapPins());
  const [selectedPin, setSelectedPin] = useState<MapPinPOI | null>(null);

  // Zoom and Pan states
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setZoomScale((prev) => Math.min(1.6, Math.round((prev + 0.1) * 10) / 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomScale((prev) => Math.max(0.8, Math.round((prev - 0.1) * 10) / 10));
  }, []);

  const handleResetMap = useCallback(() => {
    setZoomScale(1.0);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handlePointerDown = (e: PointerEvent) => {
    // Only left click or touch drag
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Bound pan range so map doesn't completely disappear
    const maxPan = 180 * zoomScale;
    setPanOffset({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY)),
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
    selectedPin,
    setSelectedPin,
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

