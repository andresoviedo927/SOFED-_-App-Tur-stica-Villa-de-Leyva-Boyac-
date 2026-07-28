import {
  sortEventsByDate,
  tourismEventsMock,
} from '../data/events.mock';
import type { TourismEvent } from '../types/events.types';

export const EventsService = {
  list: async (): Promise<TourismEvent[]> =>
    sortEventsByDate(tourismEventsMock),

  getBySlug: (slug: string | null): TourismEvent | null =>
    tourismEventsMock.find((event) => event.slug === slug) ?? null,
};

export default EventsService;
