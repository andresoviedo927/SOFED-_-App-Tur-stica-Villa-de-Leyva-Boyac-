import { useEffect, useRef, useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import NarrationButton from '@/modules/interactive/components/NarrationButton';
import useSavedSettings from '@/modules/settings/hooks/useSavedSettings';
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

const EMPTY_SENTENCE_IDS: readonly string[] = [];
const EMPTY_NARRATION = [];
const ignoreManualScroll = () => undefined;

export const EventDetailScreen = ({
  eventSlug,
  onBack,
  onNavigate,
}: EventDetailScreenProps) => {
  const { event } = useEventDetail(eventSlug);
  const texts = TEXTS.events.detail;
  const settings = useSavedSettings();
  const characterVideoRef = useRef<HTMLVideoElement>(null);
  const hasCharacterVideo = Boolean(event?.narratorVideo);
  const [isCharacterMuted, setIsCharacterMuted] = useState(
    () => !settings.automaticNarration
  );
  const narration = useEventNarration(
    hasCharacterVideo ? EMPTY_NARRATION : event?.narration ?? []
  );
  const mediaNavigation = useEventMediaNavigation({
    event,
    navigate: onNavigate,
    stopNarration: narration.stop,
  });

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    setIsCharacterMuted(!settings.automaticNarration);
  }, [event?.narratorVideo, settings.automaticNarration]);

  useEffect(() => {
    const video = characterVideoRef.current;
    if (!video) {
      return;
    }

    video.volume = Math.min(
      1,
      Math.max(0, settings.narrationVolume / 100)
    );
  }, [event?.narratorVideo, settings.narrationVolume]);

  useEffect(() => {
    const video = characterVideoRef.current;
    if (!video || !event?.narratorVideo) {
      return undefined;
    }

    let disposed = false;

    const detachAutoplayUnlock = () => {
      window.removeEventListener(
        'pointerdown',
        enableAudioOnInteraction,
        true
      );
      window.removeEventListener(
        'keydown',
        enableAudioOnInteraction,
        true
      );
    };

    const enableAudioOnInteraction = (interaction: Event) => {
      if (disposed) {
        return;
      }

      if (
        interaction.target instanceof Element &&
        interaction.target.closest('[data-character-audio-control]')
      ) {
        return;
      }

      video.muted = false;
      setIsCharacterMuted(false);
      void video.play().catch(() => {
        if (!disposed) {
          video.muted = true;
          setIsCharacterMuted(true);
        }
      });
      detachAutoplayUnlock();
    };

    const startPlayback = async () => {
      if (!settings.automaticNarration) {
        video.muted = true;
        setIsCharacterMuted(true);
        await video.play().catch(() => undefined);
        return;
      }

      video.muted = false;

      try {
        await video.play();
        if (!disposed) {
          setIsCharacterMuted(false);
        }
      } catch {
        if (disposed) {
          return;
        }

        video.muted = true;
        setIsCharacterMuted(true);
        await video.play().catch(() => undefined);
        window.addEventListener(
          'pointerdown',
          enableAudioOnInteraction,
          true
        );
        window.addEventListener(
          'keydown',
          enableAudioOnInteraction,
          true
        );
      }
    };

    void startPlayback();

    return () => {
      disposed = true;
      detachAutoplayUnlock();
      video.pause();
    };
  }, [event?.narratorVideo, settings.automaticNarration]);

  const handleToggleCharacterAudio = () => {
    const video = characterVideoRef.current;

    setIsCharacterMuted((current) => {
      const next = !current;

      if (video) {
        video.muted = next;

        if (!next) {
          if (video.ended) {
            video.currentTime = 0;
          }
          void video.play().catch(() => {
            video.muted = true;
            setIsCharacterMuted(true);
          });
        }
      }

      return next;
    });
  };

  const handleBack = () => {
    narration.stop();
    characterVideoRef.current?.pause();
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
        backgroundImage: `url("${IMAGES.interactive.reading.background}")`,
      }}
      aria-busy={
        !hasCharacterVideo &&
        narration.narrationStatus === 'loading'
      }
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
          {event?.narratorVideo ? (
            <button
              type="button"
              className={styles.audioButton}
              data-character-audio-control
              onClick={handleToggleCharacterAudio}
              aria-pressed={!isCharacterMuted}
              aria-label={
                isCharacterMuted
                  ? texts.unmuteCharacterVideo
                  : texts.muteCharacterVideo
              }
              title={
                isCharacterMuted
                  ? texts.unmuteCharacterVideo
                  : texts.muteCharacterVideo
              }
            >
              <AppIcon
                name={
                  isCharacterMuted
                    ? 'fi-rr-volume-mute'
                    : 'fi-rr-audio'
                }
                size={24}
                color="#1A212B"
              />
            </button>
          ) : event ? (
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
              narrationStatus={
                hasCharacterVideo ? 'idle' : narration.narrationStatus
              }
              isCharacterVisible={
                hasCharacterVideo
                  ? !isCharacterMuted
                  : narration.isCharacterVisible
              }
              activeSentenceId={
                hasCharacterVideo ? null : narration.activeSentenceId
              }
              completedSentenceIds={
                hasCharacterVideo
                  ? EMPTY_SENTENCE_IDS
                  : narration.completedSentenceIds
              }
              isAutoFollowEnabled={
                hasCharacterVideo
                  ? false
                  : narration.isAutoFollowEnabled
              }
              characterVideoRef={characterVideoRef}
              isCharacterMuted={isCharacterMuted}
              onManualScroll={
                hasCharacterVideo
                  ? ignoreManualScroll
                  : narration.pauseAutoFollow
              }
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
          {!hasCharacterVideo &&
          narration.narrationStatus === 'error'
            ? texts.narrationError
            : liveMessage}
        </p>
        {!hasCharacterVideo &&
          narration.narrationStatus === 'error' && (
          <div className={styles.error} role="status">
            {texts.narrationError}
          </div>
        )}
      </div>
    </main>
  );
};

export default EventDetailScreen;
