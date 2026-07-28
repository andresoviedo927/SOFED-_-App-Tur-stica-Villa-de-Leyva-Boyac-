import { useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { plazaPrincipalPanorama } from '../../data/plazaPrincipalPanorama';
import narrationService from '../../services/BrowserNarrationService';
import SinglePanoramaViewer from '../SinglePanoramaViewer';
import styles from './PanoramaScreen.module.css';

interface PanoramaScreenProps {
  onBack: () => void;
}

export const PanoramaScreen = ({
  onBack,
}: PanoramaScreenProps) => {
  const texts = TEXTS.interactive.plazaPrincipal.gallery.panorama;

  useEffect(() => {
    narrationService.stop();
    document
      .querySelectorAll<HTMLMediaElement>('audio, video')
      .forEach((media) => media.pause());

    return () => narrationService.stop();
  }, []);

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
            ariaLabel={TEXTS.common.back}
            leftIcon={
              <AppIcon
                name="fi-rr-angle-small-left"
                size={24}
                color="currentColor"
              />
            }
            onClick={onBack}
          >
            {TEXTS.common.back}
          </Button>

          <h1>{texts.screenTitle}</h1>
          <div className={styles.headerSpacer} aria-hidden="true" />
        </header>

        <SinglePanoramaViewer
          panorama={plazaPrincipalPanorama}
          viewerLabel={texts.viewerLabel}
          interactionHint={texts.interactionHint}
          wideInteractionHint={texts.wideInteractionHint}
          resetLabel={texts.resetView}
          loadingLabel={texts.loading}
          errorTitle={texts.errorTitle}
          errorMessage={texts.errorMessage}
          retryLabel={texts.retry}
        />
      </div>
    </main>
  );
};

export default PanoramaScreen;
