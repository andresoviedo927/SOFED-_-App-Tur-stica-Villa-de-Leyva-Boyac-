import { useCallback } from 'react';
import {
  createDirectoryMapStore,
  useDirectoryMapController,
} from '@/components/shared/map-directory';
import { LODGING_MAP_CONFIG } from '../constants/lodgingMap';
import { lodgingMapPointsMock } from '../data/lodgingMapPoints.mock';
import type { LodgingCategoryId } from '../types/lodging.types';
import useLodgingCategoryFilter, {
  persistLodgingCategory,
} from './useLodgingCategoryFilter';

const lodgingMapStore = createDirectoryMapStore(
  LODGING_MAP_CONFIG.initialZoom
);

export const focusPersistedLodgingPoint = (
  pointId: string,
  categoryId: LodgingCategoryId
) => {
  const point = lodgingMapPointsMock.find(
    (candidate) => candidate.id === pointId
  );
  if (!point) return;
  persistLodgingCategory(categoryId);
  lodgingMapStore.selectedPointId = pointId;
  lodgingMapStore.zoom = 1.5;
  lodgingMapStore.mapOffset = {
    x: (50 - point.mapPosition.xPercent) * 4.2,
    y: (50 - point.mapPosition.yPercent) * 2.1,
  };
};

export const useLodgingMap = () => {
  const filter = useLodgingCategoryFilter();
  const map = useDirectoryMapController({
    points: lodgingMapPointsMock,
    selectedCategoryId: filter.selectedCategoryId,
    ...LODGING_MAP_CONFIG,
    store: lodgingMapStore,
  });

  const selectCategory = useCallback(
    (categoryId: LodgingCategoryId, categoryLabel: string) => {
      filter.selectCategory(categoryId, categoryLabel);
      map.closePoint();
    },
    [filter, map]
  );

  return {
    ...map,
    selectedCategoryId: filter.selectedCategoryId,
    announcement: filter.announcement,
    getCategoryState: filter.getCategoryState,
    selectCategory,
  };
};

export default useLodgingMap;
