import { useCallback } from 'react';
import type { LodgingCategoryId } from '../types/lodging.types';
import useLodgingCategoryFilter, {
  persistLodgingCategory,
} from './useLodgingCategoryFilter';

let persistedSelectedLodgingId: string | null = null;

export const focusPersistedLodgingPoint = (
  pointId: string,
  categoryId: LodgingCategoryId
) => {
  persistLodgingCategory(categoryId);
  persistedSelectedLodgingId = pointId;
};

export const useLodgingMap = () => {
  const {
    selectedCategoryId,
    announcement,
    selectCategory: selectCategoryFilter,
    getCategoryState,
  } = useLodgingCategoryFilter();

  const selectCategory = useCallback(
    (categoryId: LodgingCategoryId, categoryLabel: string) => {
      selectCategoryFilter(categoryId, categoryLabel);
      persistedSelectedLodgingId = null;
    },
    [selectCategoryFilter]
  );

  const consumePersistedLodgingId = useCallback(() => {
    const lodgingId = persistedSelectedLodgingId;
    persistedSelectedLodgingId = null;
    return lodgingId;
  }, []);

  return {
    selectedCategoryId,
    announcement,
    getCategoryState,
    selectCategory,
    consumePersistedLodgingId,
  };
};

export default useLodgingMap;
