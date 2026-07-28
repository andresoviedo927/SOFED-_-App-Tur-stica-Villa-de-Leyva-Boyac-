import type { Key } from 'react';
import type { TourismEvent } from '../../types/events.types';

export interface EventCardProps {
  key?: Key;
  event: TourismEvent;
  index: number;
  onSelect: (event: TourismEvent) => void;
}
