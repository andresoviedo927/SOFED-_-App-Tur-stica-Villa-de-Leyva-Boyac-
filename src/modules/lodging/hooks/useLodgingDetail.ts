import { useMemo } from 'react';
import { lodgingDetailsMock } from '../data/lodgingDetails.mock';

export const useLodgingDetail = (
  categoryId: string | null,
  lodgingId: string | null
) => {
  const lodging = useMemo(
    () =>
      lodgingDetailsMock.find(
        (candidate) =>
          candidate.id === lodgingId &&
          candidate.categoryId === categoryId
      ) ?? null,
    [categoryId, lodgingId]
  );

  return {
    lodging,
    isFound: lodging !== null,
  };
};

export default useLodgingDetail;
