import type { TourismEvent } from '../../types/events.types';

export interface EventsCarouselProps {
  events: TourismEvent[];
  isLoading: boolean;
  onSelectEvent: (event: TourismEvent) => void;
}
