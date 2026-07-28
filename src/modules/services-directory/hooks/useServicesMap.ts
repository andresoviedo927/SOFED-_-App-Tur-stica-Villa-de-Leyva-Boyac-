import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { SERVICES_MAP_CONFIG } from '../constants/servicesMap';
import { serviceMapPoints } from '../data/serviceMapPoints.mock';
import useServiceCategoryFilter, {
  persistServiceCategory,
} from './useServiceCategoryFilter';
import type {
  ServiceCategoryId,
  ServiceMapPoint,
} from '../types/services.types';

let persistedSelectedServiceId: string | null = null;
let persistedZoom: number = SERVICES_MAP_CONFIG.initialZoom;
let persistedMapOffset = { x: 0, y: 0 };

export const focusPersistedServicePoint = (
  pointId: string,
  categoryId: ServiceCategoryId
) => {
  const point = serviceMapPoints.find(
    (candidate) => candidate.id === pointId
  );
  if (!point) return;

  persistServiceCategory(categoryId);
  persistedSelectedServiceId = pointId;
  persistedZoom = 1.5;
  persistedMapOffset = {
    x: (50 - point.mapPosition.xPercent) * 3.5,
    y: (50 - point.mapPosition.yPercent) * 2.1,
  };
};

export const useServicesMap = () => {
  const {
    selectedCategoryId,
    announcement,
    selectCategory: selectCategoryFilter,
    getCategoryState,
  } = useServiceCategoryFilter();
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | null
  >(persistedSelectedServiceId);
  const [zoom, setZoom] = useState(persistedZoom);
  const [mapOffset, setMapOffset] = useState(persistedMapOffset);

  const visiblePoints = useMemo(
    () =>
      selectedCategoryId
        ? serviceMapPoints.filter(
            (point) => point.categoryId === selectedCategoryId
          )
        : [],
    [selectedCategoryId]
  );

  const selectedPoint = useMemo(
    () =>
      visiblePoints.find(
        (point) => point.id === selectedServiceId
      ) ?? null,
    [selectedServiceId, visiblePoints]
  );

  const selectCategory = useCallback(
    (categoryId: ServiceCategoryId, categoryLabel: string) => {
      selectCategoryFilter(categoryId, categoryLabel);
      persistedSelectedServiceId = null;
      setSelectedServiceId(null);
    },
    [selectCategoryFilter]
  );

  const selectPoint = useCallback((pointId: string) => {
    persistedSelectedServiceId = pointId;
    setSelectedServiceId(pointId);
  }, []);

  const closePointDetails = useCallback(() => {
    persistedSelectedServiceId = null;
    setSelectedServiceId(null);
  }, []);

  const resetView = useCallback(() => {
    persistedZoom = SERVICES_MAP_CONFIG.initialZoom;
    persistedMapOffset = { x: 0, y: 0 };
    setZoom(persistedZoom);
    setMapOffset(persistedMapOffset);
  }, []);

  const updateZoom = useCallback((nextZoom: number) => {
    const safeZoom = Math.min(
      SERVICES_MAP_CONFIG.maxZoom,
      Math.max(SERVICES_MAP_CONFIG.minZoom, nextZoom)
    );
    persistedZoom = safeZoom;
    setZoom(safeZoom);
  }, []);

  const zoomIn = useCallback(
    () => updateZoom(zoom + SERVICES_MAP_CONFIG.zoomStep),
    [updateZoom, zoom]
  );

  const zoomOut = useCallback(
    () => updateZoom(zoom - SERVICES_MAP_CONFIG.zoomStep),
    [updateZoom, zoom]
  );

  const panBy = useCallback(
    (deltaX: number, deltaY: number) => {
      const limit =
        SERVICES_MAP_CONFIG.maxPanAtInitialZoom +
        (zoom - SERVICES_MAP_CONFIG.initialZoom) *
          SERVICES_MAP_CONFIG.maxPanPerZoomLevel;

      setMapOffset((current) => {
        const next = {
          x: Math.min(
            limit,
            Math.max(-limit, current.x + deltaX)
          ),
          y: Math.min(
            limit,
            Math.max(-limit, current.y + deltaY)
          ),
        };
        persistedMapOffset = next;
        return next;
      });
    },
    [zoom]
  );

  const isAtMinZoom = zoom <= SERVICES_MAP_CONFIG.minZoom;
  const isAtMaxZoom = zoom >= SERVICES_MAP_CONFIG.maxZoom;

  return {
    selectedCategoryId,
    selectedServiceId,
    selectedPoint,
    visiblePoints: visiblePoints as ServiceMapPoint[],
    zoom,
    mapOffset,
    announcement,
    getCategoryState,
    selectCategory,
    selectPoint,
    closePointDetails,
    resetView,
    zoomIn,
    zoomOut,
    panBy,
    isAtMinZoom,
    isAtMaxZoom,
  };
};

export default useServicesMap;
