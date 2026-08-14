import { useCallback } from 'react';
import type { ServiceCategoryId } from '../types/services.types';
import useServiceCategoryFilter, {
  persistServiceCategory,
} from './useServiceCategoryFilter';

let persistedSelectedServiceId: string | null = null;

export const focusPersistedServicePoint = (
  pointId: string,
  categoryId: ServiceCategoryId
) => {
  persistServiceCategory(categoryId);
  persistedSelectedServiceId = pointId;
};

export const useServicesMap = () => {
  const {
    selectedService,
    announcement,
    selectCategory: selectCategoryFilter,
    clearSelection,
    getCategoryState,
  } = useServiceCategoryFilter();

  const selectCategory = useCallback(
    (categoryId: ServiceCategoryId, categoryLabel: string) => {
      selectCategoryFilter(categoryId, categoryLabel);
      persistedSelectedServiceId = null;
    },
    [selectCategoryFilter]
  );

  const consumePersistedServiceId = useCallback(() => {
    const serviceId = persistedSelectedServiceId;
    persistedSelectedServiceId = null;
    return serviceId;
  }, []);

  return {
    selectedService,
    announcement,
    getCategoryState,
    selectCategory,
    clearSelection,
    consumePersistedServiceId,
  };
};

export default useServicesMap;
