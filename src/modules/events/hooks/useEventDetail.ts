import EventsService from '../services/EventsService';

export const useEventDetail = (eventSlug: string | null) => ({
  event: EventsService.getBySlug(eventSlug),
});

export default useEventDetail;
