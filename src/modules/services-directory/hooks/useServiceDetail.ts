import { useMemo } from 'react';
import { serviceDetailsMock } from '../data/serviceDetails.mock';
import type { ServiceCategoryId } from '../types/services.types';

export const useServiceDetail = (
  categoryId: string | null,
  serviceId: string | null
) => {
  const service = useMemo(
    () =>
      serviceDetailsMock.find(
        (candidate) =>
          candidate.id === serviceId &&
          candidate.categoryId ===
            (categoryId as ServiceCategoryId)
      ) ?? null,
    [categoryId, serviceId]
  );

  return {
    service,
    isFound: service !== null,
  };
};

export default useServiceDetail;
