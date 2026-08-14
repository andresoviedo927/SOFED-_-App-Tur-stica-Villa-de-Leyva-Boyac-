import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import EventDetailText from '../EventDetailText';
import EventMediaActions from '../EventMediaActions';
import EventNarratorCharacter from '../EventNarratorCharacter';
import styles from './EventDetailCard.module.css';
import type { EventDetailCardProps } from './EventDetailCard.types';

export const EventDetailCard = ({
  event,
  narrationStatus,
  isCharacterVisible,
  activeSentenceId,
  completedSentenceIds,
  isAutoFollowEnabled,
  characterVideoRef,
  isCharacterMuted,
  onManualScroll,
  onOpenPhotos,
  onOpenDrone,
}: EventDetailCardProps) => {
  const texts = TEXTS.events.detail;

  return (
    <article
      className={styles.card}
      data-character-visible={isCharacterVisible || undefined}
      style={{
        backgroundImage: `url("${IMAGES.events.readingTexture}")`,
      }}
      aria-label={event.name}
    >
      <div className={styles.content}>
        <EventDetailText
          title={event.name}
          narration={event.narration}
          activeSentenceId={activeSentenceId}
          completedSentenceIds={completedSentenceIds}
          isAutoFollowEnabled={isAutoFollowEnabled}
          descriptionLabel={texts.descriptionLabel}
          onManualScroll={onManualScroll}
        />
        <EventMediaActions
          eventName={event.name}
          isPhotosAvailable={event.gallery.length > 0}
          isDroneAvailable={Boolean(event.droneVideo?.src)}
          onOpenPhotos={onOpenPhotos}
          onOpenDrone={onOpenDrone}
        />
      </div>

      {(event.narratorVideo ||
        (isCharacterVisible && event.narratorCharacter)) && (
        <EventNarratorCharacter
          src={event.narratorVideo ?? event.narratorCharacter ?? ''}
          alt={texts.characterAlt.replace('{event}', event.name)}
          isExiting={narrationStatus === 'stopping'}
          isVideo={Boolean(event.narratorVideo)}
          isMuted={isCharacterMuted}
          isHidden={Boolean(event.narratorVideo) && !isCharacterVisible}
          videoRef={characterVideoRef}
        />
      )}
    </article>
  );
};

export default EventDetailCard;
