import { useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type { GalleryPhoto } from '../../types/gallery.types';
import { plazaPrincipalPhotos } from '../../data/plazaPrincipalPhotos';
import narrationService from '../../services/BrowserNarrationService';
import PhotoCarousel from '../PhotoCarousel';
import styles from './PhotoGalleryScreen.module.css';

export interface PhotoGalleryLabels {
  photoOf: string;
  loadingPhoto: string;
  loadError: string;
  retry: string;
  previousPhoto: string;
  nextPhoto: string;
  goToPhoto: string;
}

export interface PhotoGalleryEmptyState {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export interface PhotoGalleryScreenProps {
  onBack: () => void;
  title?: string;
  photos?: GalleryPhoto[];
  ariaLabel?: string;
  backAriaLabel?: string;
  labels?: PhotoGalleryLabels;
  emptyState?: PhotoGalleryEmptyState;
}

export const PhotoGalleryScreen = ({
  onBack,
  title,
  photos = plazaPrincipalPhotos,
  ariaLabel,
  backAriaLabel = TEXTS.common.back,
  labels,
  emptyState,
}: PhotoGalleryScreenProps) => {
  const defaultTexts =
    TEXTS.interactive.plazaPrincipal.gallery.photos;
  const resolvedLabels = labels ?? {
    photoOf: defaultTexts.photoOf,
    loadingPhoto: defaultTexts.loadingPhoto,
    loadError: defaultTexts.loadError,
    retry: defaultTexts.retry,
    previousPhoto: defaultTexts.previousPhoto,
    nextPhoto: defaultTexts.nextPhoto,
    goToPhoto: defaultTexts.goToPhoto,
  };

  useEffect(() => {
    narrationService.stop();
    window.speechSynthesis?.cancel();
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
            ariaLabel={backAriaLabel}
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

          <h1>{title ?? defaultTexts.screenTitle}</h1>
          <div className={styles.headerSpacer} aria-hidden="true" />
        </header>

        {photos.length > 0 ? (
          <PhotoCarousel
            photos={photos}
            carouselLabel={ariaLabel ?? defaultTexts.carouselLabel}
            photoOfLabel={resolvedLabels.photoOf}
            loadingLabel={resolvedLabels.loadingPhoto}
            loadErrorLabel={resolvedLabels.loadError}
            retryLabel={resolvedLabels.retry}
            previousLabel={resolvedLabels.previousPhoto}
            nextLabel={resolvedLabels.nextPhoto}
            goToLabel={resolvedLabels.goToPhoto}
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

export default PhotoGalleryScreen;
