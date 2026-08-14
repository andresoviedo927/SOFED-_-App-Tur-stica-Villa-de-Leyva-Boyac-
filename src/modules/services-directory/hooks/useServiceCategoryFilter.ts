import { useCallback, useState } from 'react';
import type {
  ServiceCategoryId,
  ServiceCategoryState,
} from '../types/services.types';

let persistedSelectedService: ServiceCategoryId | null = null;

export const persistServiceCategory = (
  categoryId: ServiceCategoryId
) => {
  persistedSelectedService = categoryId;
};

export const useServiceCategoryFilter = () => {
  const [selectedService, setSelectedService] = useState<
    ServiceCategoryId | null
  >(() => persistedSelectedService);
  const [announcement, setAnnouncement] = useState('');

  const selectCategory = useCallback(
    (categoryId: ServiceCategoryId, categoryLabel: string) => {
      setSelectedService((current) => {
        const next = current === categoryId ? null : categoryId;
        persistedSelectedService = next;
        setAnnouncement(
          next
            ? `Servicio ${categoryLabel} activado.`
            : `Servicio ${categoryLabel} desactivado. No hay servicios seleccionados.`
        );
        return next;
      });
    },
    []
  );

  const clearSelection = useCallback(() => {
    persistedSelectedService = null;
    setSelectedService(null);
    setAnnouncement('No hay servicios seleccionados.');
  }, []);

  const getCategoryState = useCallback(
    (categoryId: ServiceCategoryId): ServiceCategoryState => {
      if (selectedService === null) return 'default';
      return selectedService === categoryId ? 'selected' : 'disabled';
    },
    [selectedService]
  );

  return {
    selectedService,
    announcement,
    selectCategory,
    clearSelection,
    getCategoryState,
  };
};

export default useServiceCategoryFilter;
