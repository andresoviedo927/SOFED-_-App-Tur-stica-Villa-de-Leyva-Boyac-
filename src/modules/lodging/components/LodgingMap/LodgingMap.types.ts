import type {
  LodgingCategory,
  LodgingMapPoint,
} from '../../types/lodging.types';

export interface LodgingMapProps {
  selectedCategory: LodgingCategory | null;
  points: LodgingMapPoint[];
  selectedPoint: LodgingMapPoint | null;
  zoom: number;
  offset: { x: number; y: number };
  isAtMinZoom: boolean;
  isAtMaxZoom: boolean;
  onRemoveFilter: () => void;
  onSelectPoint: (pointId: string) => void;
  onClosePoint: () => void;
  onOpenDetails: (point: LodgingMapPoint) => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanBy: (x: number, y: number) => void;
}
