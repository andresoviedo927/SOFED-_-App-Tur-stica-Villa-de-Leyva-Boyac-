import { useEffect } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import useEvents from '../../hooks/useEvents';
import type { TourismEvent } from '../../types/events.types';
import EventsCarousel from '../EventsCarousel';
import EventsEmptyState from '../EventsEmptyState';
import EventsHeader from '../EventsHeader';
import styles from './EventsScreen.module.css';

interface EventsScreenProps {
  onBack: () => void;
  onOpenSettings: () => void;
  onOpenEventDetail: (eventSlug: string) => void;
}

export const EventsScreen = ({
  onBack,
  onOpenEventDetail,
}: EventsScreenProps) => {
  const { events, isLoading } = useEvents();

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const openEvent = (event: TourismEvent) => {
    onOpenEventDetail(event.slug);
  };

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `linear-gradient(rgba(26, 33, 43, 0.6), rgba(26, 33, 43, 0.6)), url("${IMAGES.settings.pageBackground}")`,
      }}
    >
      <EventsHeader
        title={TEXTS.events.screenTitle}
        onBack={onBack}
      />
      {!isLoading && events.length === 0 ? (
        <EventsEmptyState />
      ) : (
        <EventsCarousel
          events={events}
          isLoading={isLoading}
          onSelectEvent={openEvent}
        />
      )}
    </main>
  );
};

export default EventsScreen;
