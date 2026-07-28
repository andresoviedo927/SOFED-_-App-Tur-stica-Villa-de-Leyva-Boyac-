import {
  useCallback,
  useState,
} from 'react';
import TEXTS from '@/constants/texts';
import type {
  ServiceCategoryId,
  ServiceCategoryState,
} from '../types/services.types';

let persistedSelectedCategoryId: ServiceCategoryId | null = null;

export const persistServiceCategory = (
  categoryId: ServiceCategoryId
) => {
  persistedSelectedCategoryId = categoryId;
};

export const useServiceCategoryFilter = () => {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<ServiceCategoryId | null>(
      persistedSelectedCategoryId
    );
  const [announcement, setAnnouncement] = useState('');

  const selectCategory = useCallback(
    (categoryId: ServiceCategoryId, categoryLabel: string) => {
      setSelectedCategoryId((current) => {
        const next = current === categoryId ? null : categoryId;
        persistedSelectedCategoryId = next;
        setAnnouncement(
          next
            ? TEXTS.services.map.filterActivated.replace(
                '{category}',
                categoryLabel
              )
            : TEXTS.services.map.filterRemoved
        );
        return next;
      });
    },
    []
  );

  const getCategoryState = useCallback(
    (categoryId: ServiceCategoryId): ServiceCategoryState => {
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

export default useServiceCategoryFilter;
