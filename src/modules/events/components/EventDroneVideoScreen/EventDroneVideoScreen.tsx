import TEXTS from '@/constants/texts';
import DroneVideoScreen from '@/modules/interactive/components/DroneVideoScreen';
import useEventFromRoute from '../../hooks/useEventFromRoute';
import useEventMediaNavigation from '../../hooks/useEventMediaNavigation';

interface EventDroneVideoScreenProps {
  eventSlug: string | null;
  onNavigate: (route: string) => void;
  onBackToDetail: () => void;
  onBackToEvents: () => void;
}

export const EventDroneVideoScreen = ({
  eventSlug,
  onNavigate,
  onBackToDetail,
  onBackToEvents,
}: EventDroneVideoScreenProps) => {
  const { event, isNotFound } = useEventFromRoute(eventSlug);
  const texts = TEXTS.events.media;
  const navigation = useEventMediaNavigation({
    event,
    navigate: onNavigate,
    returnToDetail: onBackToDetail,
  });
  const handleBack = isNotFound
    ? onBackToEvents
    : navigation.returnToDetail;

  return (
    <DroneVideoScreen
      title={texts.droneScreenTitle}
      content={event?.droneVideo ?? null}
      backAriaLabel={
        isNotFound ? texts.backToEvents : texts.backToDetail
      }
      labels={{
        play: texts.playDrone,
        pause: texts.pauseDrone,
        replay: texts.replayDrone,
        loading: texts.loadingDrone,
        errorTitle: texts.droneErrorTitle,
        errorMessage: texts.droneErrorMessage,
        retry: texts.retry,
      }}
      emptyState={{
        title: isNotFound
          ? texts.eventNotFoundTitle
          : texts.droneUnavailableTitle,
        message: isNotFound
          ? texts.eventNotFoundMessage
          : texts.droneUnavailableMessage,
        actionLabel: isNotFound
          ? texts.backToEvents
          : texts.backToDetail,
        onAction: isNotFound
          ? onBackToEvents
          : navigation.returnToDetail,
      }}
      onBack={handleBack}
    />
  );
};

export default EventDroneVideoScreen;
