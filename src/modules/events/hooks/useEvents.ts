import { useEffect, useState } from 'react';
import EventsService from '../services/EventsService';
import type { TourismEvent } from '../types/events.types';

export const useEvents = () => {
  const [events, setEvents] = useState<TourismEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    EventsService.list().then((result) => {
      if (!isActive) return;
      setEvents(result);
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, []);

  return { events, isLoading };
};

export default useEvents;
