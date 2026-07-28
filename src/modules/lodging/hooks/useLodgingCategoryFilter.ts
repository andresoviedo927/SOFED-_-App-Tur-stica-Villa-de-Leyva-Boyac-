import { useCallback, useState } from 'react';
import TEXTS from '@/constants/texts';
import type {
  LodgingCategoryId,
  LodgingCategoryState,
} from '../types/lodging.types';

let persistedLodgingCategoryId: LodgingCategoryId | null = null;

export const persistLodgingCategory = (
  categoryId: LodgingCategoryId
) => {
  persistedLodgingCategoryId = categoryId;
};

export const useLodgingCategoryFilter = () => {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<LodgingCategoryId | null>(
      persistedLodgingCategoryId
    );
  const [announcement, setAnnouncement] = useState('');

  const selectCategory = useCallback(
    (categoryId: LodgingCategoryId, categoryLabel: string) => {
      setSelectedCategoryId((current) => {
        const next = current === categoryId ? null : categoryId;
        persistedLodgingCategoryId = next;
        setAnnouncement(
          next
            ? TEXTS.lodging.map.filterActivated.replace(
                '{category}',
                categoryLabel
              )
            : TEXTS.lodging.map.filterRemoved
        );
        return next;
      });
    },
    []
  );

  const getCategoryState = useCallback(
    (categoryId: LodgingCategoryId): LodgingCategoryState => {
      if (!selectedCategoryId) return 'default';
      return selectedCategoryId === categoryId
        ? 'selected'
        : 'disabled';
    },
    [selectedCategoryId]
  );

  return {
    selectedCategoryId,
    announcement,
    selectCategory,
    getCategoryState,
  };
};

export default useLodgingCategoryFilter;
