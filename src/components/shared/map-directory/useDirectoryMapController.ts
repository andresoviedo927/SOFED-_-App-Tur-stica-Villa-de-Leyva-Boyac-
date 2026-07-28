import { useCallback, useMemo, useState } from 'react';
import type { MapDirectoryPoint } from './mapDirectory.types';

export interface DirectoryMapStore {
  selectedPointId: string | null;
  zoom: number;
  mapOffset: { x: number; y: number };
}

interface DirectoryMapControllerConfig<
  TPoint extends MapDirectoryPoint,
> {
  points: TPoint[];
  selectedCategoryId: string | null;
  initialZoom: number;
  minZoom: number;
  maxZoom: number;
  zoomStep: number;
  maxPanAtInitialZoom: number;
  maxPanPerZoomLevel: number;
  store: DirectoryMapStore;
}

export const createDirectoryMapStore = (
  initialZoom: number
): DirectoryMapStore => ({
  selectedPointId: null,
  zoom: initialZoom,
  mapOffset: { x: 0, y: 0 },
});

export const useDirectoryMapController = <
  TPoint extends MapDirectoryPoint,
>({
  points,
  selectedCategoryId,
  initialZoom,
  minZoom,
  maxZoom,
  zoomStep,
  maxPanAtInitialZoom,
  maxPanPerZoomLevel,
  store,
}: DirectoryMapControllerConfig<TPoint>) => {
  const [selectedPointId, setSelectedPointId] = useState(
    store.selectedPointId
  );
  const [zoom, setZoom] = useState(store.zoom);
  const [mapOffset, setMapOffset] = useState(store.mapOffset);

  const visiblePoints = useMemo(
    () =>
      selectedCategoryId
        ? points.filter(
            (point) => point.categoryId === selectedCategoryId
          )
        : [],
    [points, selectedCategoryId]
  );

  const selectedPoint =
    visiblePoints.find(
      (point) => point.id === selectedPointId
    ) ?? null;

  const selectPoint = useCallback(
    (pointId: string) => {
      store.selectedPointId = pointId;
      setSelectedPointId(pointId);
    },
    [store]
  );

  const closePoint = useCallback(() => {
    store.selectedPointId = null;
    setSelectedPointId(null);
  }, [store]);

  const resetView = useCallback(() => {
    store.zoom = initialZoom;
    store.mapOffset = { x: 0, y: 0 };
    setZoom(initialZoom);
    setMapOffset(store.mapOffset);
  }, [initialZoom, store]);

  const updateZoom = useCallback(
    (nextZoom: number) => {
      const safeZoom = Math.min(
        maxZoom,
        Math.max(minZoom, nextZoom)
      );
      store.zoom = safeZoom;
      setZoom(safeZoom);
    },
    [maxZoom, minZoom, store]
  );

  const panBy = useCallback(
    (deltaX: number, deltaY: number) => {
      const limit =
        maxPanAtInitialZoom +
        (zoom - initialZoom) * maxPanPerZoomLevel;
      setMapOffset((current) => {
        const next = {
          x: Math.min(limit, Math.max(-limit, current.x + deltaX)),
          y: Math.min(limit, Math.max(-limit, current.y + deltaY)),
        };
        store.mapOffset = next;
        return next;
      });
    },
    [
      initialZoom,
      maxPanAtInitialZoom,
      maxPanPerZoomLevel,
      store,
      zoom,
    ]
  );

  return {
    selectedPoint,
    selectedPointId,
    visiblePoints,
    zoom,
    mapOffset,
    selectPoint,
    closePoint,
    resetView,
    zoomIn: () => updateZoom(zoom + zoomStep),
    zoomOut: () => updateZoom(zoom - zoomStep),
    panBy,
    isAtMinZoom: zoom <= minZoom,
    isAtMaxZoom: zoom >= maxZoom,
  };
};
