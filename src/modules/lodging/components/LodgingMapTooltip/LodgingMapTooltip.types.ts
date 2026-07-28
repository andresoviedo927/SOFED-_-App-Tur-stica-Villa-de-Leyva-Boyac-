import type {
  LodgingCategory,
  LodgingMapPoint,
} from '../../types/lodging.types';

export interface LodgingMapTooltipProps {
  point: LodgingMapPoint;
  category: LodgingCategory;
  onClose: () => void;
  onViewDetails: () => void;
}
