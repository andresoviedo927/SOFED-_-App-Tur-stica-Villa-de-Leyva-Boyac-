import { useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import NarrationButton from '@/modules/interactive/components/NarrationButton';
import useEventDetail from '../../hooks/useEventDetail';
import useEventMediaNavigation from '../../hooks/useEventMediaNavigation';
import useEventNarration from '../../hooks/useEventNarration';
import EventDetailCard from '../EventDetailCard';
import styles from './EventDetailScreen.module.css';

interface EventDetailScreenProps {
  eventSlug: string | null;
  onBack: () => void;
  onNavigate: (route: string) => void;
}

export const EventDetailScreen = ({
  eventSlug,
  onBack,
  onNavigate,
}: EventDetailScreenProps) => {
  const { event } = useEventDetail(eventSlug);
  const texts = TEXTS.events.detail;
  const narration = useEventNarration(event?.narration ?? []);
  const mediaNavigation = useEventMediaNavigation({
    event,
    navigate: onNavigate,
    stopNarration: narration.stop,
  });

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const handleBack = () => {
    narration.stop();
    onBack();
  };

  const liveMessage =
    narration.narrationStatus === 'playing'
      ? texts.narrationStarted
      : narration.narrationStatus === 'paused'
        ? texts.narrationPaused
        : narration.narrationStatus === 'completed'
          ? texts.narrationCompleted
          : narration.narrationStatus === 'stopping'
            ? texts.narrationStopped
            : '';

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `url("${IMAGES.interactive.map}")`,
      }}
      aria-busy={narration.narrationStatus === 'loading'}
    >
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.layout}>
        <header className={styles.header}>
          <Button
            kind="transparent"
            size="small"
            className={styles.backButton}
            ariaLabel={TEXTS.common.back}
            leftIcon={
              <AppIcon
                name="fi-rr-angle-small-left"
                size={24}
                color="currentColor"
              />
            }
            onClick={handleBack}
          >
            {TEXTS.common.back}
          </Button>
          <h1>{texts.screenTitle}</h1>
          {event ? (
            <NarrationButton
              status={narration.narrationStatus}
              isActive={narration.isNarrationActive}
              startLabel={texts.startNarration}
              loadingLabel={texts.preparingNarration}
              stopLabel={texts.stopNarration}
              onToggle={
                narration.narrationStatus === 'paused'
                  ? narration.stop
                  : narration.toggle
              }
            />
          ) : (
            <div className={styles.headerSpacer} aria-hidden="true" />
          )}
        </header>

        <div className={styles.stage}>
          {event ? (
            <EventDetailCard
              event={event}
              narrationStatus={narration.narrationStatus}
              isCharacterVisible={narration.isCharacterVisible}
              activeSentenceId={narration.activeSentenceId}
              completedSentenceIds={narration.completedSentenceIds}
              isAutoFollowEnabled={narration.isAutoFollowEnabled}
              onManualScroll={narration.pauseAutoFollow}
              onOpenPhotos={mediaNavigation.openPhotos}
              onOpenDrone={mediaNavigation.openDrone}
            />
          ) : (
            <section className={styles.notFound} role="alert">
              <h2>{texts.notFoundTitle}</h2>
              <p>{texts.notFoundMessage}</p>
              <Button size="small" onClick={handleBack}>
                {texts.backToEvents}
              </Button>
            </section>
          )}
        </div>

        <p className={styles.liveRegion} aria-live="polite">
          {narration.narrationStatus === 'error'
            ? texts.narrationError
            : liveMessage}
        </p>
        {narration.narrationStatus === 'error' && (
          <div className={styles.error} role="status">
            {texts.narrationError}
          </div>
        )}
      </div>
    </main>
  );
};

export default EventDetailScreen;
