import type { LodgingLocation } from '../../types/lodging.types';

export interface LodgingMapProps {
  locations: LodgingLocation[];
  loading: boolean;
  error: string | null;
  markersVisible: boolean;
  focusedLodgingId: string | null;
  onOpenLodgingDetail: (
    categoryId: string,
    lodgingId: string
  ) => void;
}
