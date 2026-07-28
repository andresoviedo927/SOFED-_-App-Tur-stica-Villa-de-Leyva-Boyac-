import type { Key } from 'react';
import type { ServiceMapPoint } from '../../types/services.types';

export interface ServiceMapPinProps {
  key?: Key;
  point: ServiceMapPoint;
  index: number;
  isSelected: boolean;
  onSelect: (pointId: string) => void;
}
