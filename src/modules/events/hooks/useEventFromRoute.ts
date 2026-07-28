import { useMemo } from 'react';
import {
  parseEventDetailPath,
  parseEventDronePath,
  parseEventPhotosPath,
} from '../constants/eventRoutes';
import EventsService from '../services/EventsService';
import type { TourismEvent } from '../types';

export interface UseEventFromRouteResult {
  event: TourismEvent | null;
  isLoading: boolean;
  isNotFound: boolean;
}

const getEventSlugFromCurrentPath = () =>
  parseEventPhotosPath(window.location.pathname)?.eventSlug ??
  parseEventDronePath(window.location.pathname)?.eventSlug ??
  parseEventDetailPath(window.location.pathname)?.eventSlug ??
  null;

export const useEventFromRoute = (
  routeEventSlug?: string | null
): UseEventFromRouteResult => {
  const eventSlug =
    routeEventSlug ?? getEventSlugFromCurrentPath();
  const event = useMemo(
    () => EventsService.getBySlug(eventSlug),
    [eventSlug]
  );

  return {
    event,
    isLoading: false,
    isNotFound: event === null,
  };
};

export default useEventFromRoute;
