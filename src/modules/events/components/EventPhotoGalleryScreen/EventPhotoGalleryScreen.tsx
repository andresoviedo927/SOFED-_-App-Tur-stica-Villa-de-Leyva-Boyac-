import TEXTS from '@/constants/texts';
import PhotoGalleryScreen from '@/modules/interactive/components/PhotoGalleryScreen';
import useEventFromRoute from '../../hooks/useEventFromRoute';
import useEventMediaNavigation from '../../hooks/useEventMediaNavigation';

interface EventPhotoGalleryScreenProps {
  eventSlug: string | null;
  onNavigate: (route: string) => void;
  onBackToDetail: () => void;
  onBackToEvents: () => void;
}

export const EventPhotoGalleryScreen = ({
  eventSlug,
  onNavigate,
  onBackToDetail,
  onBackToEvents,
}: EventPhotoGalleryScreenProps) => {
  const { event, isNotFound } = useEventFromRoute(eventSlug);
  const texts = TEXTS.events.media;
  const navigation = useEventMediaNavigation({
    event,
    navigate: onNavigate,
    returnToDetail: onBackToDetail,
  });
  const photos =
    event?.gallery.map(({ caption, ...photo }) => ({
      ...photo,
      description: caption,
    })) ?? [];
  const isUnavailable = !isNotFound && photos.length === 0;
  const handleBack = isNotFound
    ? onBackToEvents
    : navigation.returnToDetail;

  return (
    <PhotoGalleryScreen
      title={texts.photosScreenTitle}
      photos={photos}
      ariaLabel={texts.photosCarouselLabel.replace(
        '{event}',
        event?.name ?? ''
      )}
      backAriaLabel={
        isNotFound ? texts.backToEvents : texts.backToDetail
      }
      labels={{
        photoOf: texts.photoOf,
        loadingPhoto: texts.loadingPhoto,
        loadError: texts.photoLoadError,
        retry: texts.retry,
        previousPhoto: texts.previousPhoto,
        nextPhoto: texts.nextPhoto,
        goToPhoto: texts.goToPhoto,
      }}
      emptyState={{
        title: isNotFound
          ? texts.eventNotFoundTitle
          : texts.photosUnavailableTitle,
        message: isNotFound
          ? texts.eventNotFoundMessage
          : texts.photosUnavailableMessage,
        actionLabel: isNotFound
          ? texts.backToEvents
          : texts.backToDetail,
        onAction: isUnavailable
          ? navigation.returnToDetail
          : onBackToEvents,
      }}
      onBack={handleBack}
    />
  );
};

export default EventPhotoGalleryScreen;
