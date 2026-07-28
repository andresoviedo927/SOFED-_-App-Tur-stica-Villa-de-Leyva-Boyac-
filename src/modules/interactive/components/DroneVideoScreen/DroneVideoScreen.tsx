import { useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type { DroneVideoContent } from '../../data/plazaPrincipalDroneVideo';
import { plazaPrincipalDroneVideo } from '../../data/plazaPrincipalDroneVideo';
import narrationService from '../../services/BrowserNarrationService';
import SingleDroneVideoPlayer from '../SingleDroneVideoPlayer';
import styles from './DroneVideoScreen.module.css';

export interface DroneVideoLabels {
  play: string;
  pause: string;
  replay: string;
  loading: string;
  errorTitle: string;
  errorMessage: string;
  retry: string;
}

export interface DroneVideoEmptyState {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export interface DroneVideoScreenProps {
  onBack: () => void;
  title?: string;
  content?: DroneVideoContent | null;
  backAriaLabel?: string;
  labels?: DroneVideoLabels;
  emptyState?: DroneVideoEmptyState;
}

export const DroneVideoScreen = ({
  onBack,
  title,
  content = plazaPrincipalDroneVideo,
  backAriaLabel = TEXTS.common.back,
  labels,
  emptyState,
}: DroneVideoScreenProps) => {
  const defaultTexts =
    TEXTS.interactive.plazaPrincipal.gallery.drone;
  const resolvedLabels = labels ?? {
    play: defaultTexts.play,
    pause: defaultTexts.pause,
    replay: defaultTexts.replay,
    loading: defaultTexts.loading,
    errorTitle: defaultTexts.errorTitle,
    errorMessage: defaultTexts.errorMessage,
    retry: defaultTexts.retry,
  };

  const stopMedia = () => {
    narrationService.stop();
    window.speechSynthesis?.cancel();
    document
      .querySelectorAll<HTMLMediaElement>('audio, video')
      .forEach((media) => {
        media.pause();
        media.currentTime = 0;
      });
  };

  useEffect(() => {
    stopMedia();
    return () => stopMedia();
  }, []);

  const handleBack = () => {
    stopMedia();
    onBack();
  };

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `url("${IMAGES.interactive.map}")`,
      }}
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.layout}>
        <header className={styles.header}>
          <Button
            kind="transparent"
            size="small"
            className={styles.backButton}
            ariaLabel={backAriaLabel}
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

          <h1>{title ?? defaultTexts.screenTitle}</h1>
          <div className={styles.headerSpacer} aria-hidden="true" />
        </header>

        {content?.src ? (
          <SingleDroneVideoPlayer
            content={content}
            playLabel={resolvedLabels.play}
            pauseLabel={resolvedLabels.pause}
            replayLabel={resolvedLabels.replay}
            loadingLabel={resolvedLabels.loading}
            errorTitle={resolvedLabels.errorTitle}
            errorMessage={resolvedLabels.errorMessage}
            retryLabel={resolvedLabels.retry}
          />
        ) : (
          <section className={styles.emptyState} role="status">
            <h2>{emptyState?.title}</h2>
            <p>{emptyState?.message}</p>
            {emptyState && (
              <Button size="small" onClick={emptyState.onAction}>
                {emptyState.actionLabel}
              </Button>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default DroneVideoScreen;
