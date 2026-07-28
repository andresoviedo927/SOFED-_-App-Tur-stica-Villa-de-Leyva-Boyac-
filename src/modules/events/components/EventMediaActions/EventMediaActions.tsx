import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import EventMediaActionButton from '../EventMediaActionButton';
import styles from './EventMediaActions.module.css';
import type { EventMediaActionsProps } from './EventMediaActions.types';

export const EventMediaActions = ({
  eventName,
  isPhotosAvailable,
  isDroneAvailable,
  onOpenPhotos,
  onOpenDrone,
}: EventMediaActionsProps) => {
  const texts = TEXTS.events.detail;

  return (
    <div className={styles.actions}>
      <EventMediaActionButton
        type="photos"
        icon={IMAGES.icons.photos}
        label={
          isPhotosAvailable
            ? texts.viewPhotos.replace('{event}', eventName)
            : texts.photosUnavailable
        }
        disabled={!isPhotosAvailable}
        unavailableMessage={texts.photosUnavailableTooltip}
        onClick={onOpenPhotos}
      />
      <EventMediaActionButton
        type="drone"
        icon={IMAGES.icons.drone}
        label={
          isDroneAvailable
            ? texts.viewDrone.replace('{event}', eventName)
            : texts.droneUnavailable
        }
        disabled={!isDroneAvailable}
        unavailableMessage={texts.droneUnavailable}
        onClick={onOpenDrone}
      />
    </div>
  );
};

export default EventMediaActions;
