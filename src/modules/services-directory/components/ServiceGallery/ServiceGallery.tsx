import type { KeyboardEvent, TouchEvent } from 'react';
import TEXTS from '@/constants/texts';
import useServiceGallery from '../../hooks/useServiceGallery';
import ServiceGalleryNavigation from '../ServiceGalleryNavigation';
import type { ServiceGalleryProps } from './ServiceGallery.types';
import styles from './ServiceGallery.module.css';

export const ServiceGallery = ({
  images,
  serviceName,
}: ServiceGalleryProps) => {
  const gallery = useServiceGallery(images);
  const activeImage = images[gallery.activeImageIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (images.length < 2) return;
    if (event.key === 'ArrowLeft') gallery.showPrevious();
    if (event.key === 'ArrowRight') gallery.showNext();
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    gallery.handleTouchStart(event.touches[0]?.clientX ?? 0);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    gallery.handleTouchEnd(event.changedTouches[0]?.clientX ?? 0);
  };

  return (
    <section
      className={styles.gallery}
      tabIndex={0}
      aria-label={TEXTS.services.detail.galleryLabel.replace(
        '{service}',
        serviceName
      )}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!activeImage ? (
        <div className={styles.unavailable} role="status">
          {TEXTS.services.detail.galleryUnavailable}
        </div>
      ) : (
        <>
          {gallery.galleryStatus === 'loading' && (
            <div className={styles.skeleton} aria-hidden="true" />
          )}
          {gallery.galleryStatus === 'error' ? (
            <div className={styles.unavailable} role="alert">
              {TEXTS.services.detail.galleryError}
            </div>
          ) : (
            <img
              key={activeImage.id}
              className={styles.image}
              data-ready={gallery.galleryStatus === 'ready'}
              src={activeImage.src}
              alt={activeImage.alt}
              draggable={false}
              onLoad={gallery.markReady}
              onError={gallery.markError}
            />
          )}
          <ServiceGalleryNavigation
            images={images}
            activeIndex={gallery.activeImageIndex}
            onPrevious={gallery.showPrevious}
            onNext={gallery.showNext}
            onSelect={gallery.selectImage}
          />
          <span className={styles.srOnly} aria-live="polite">
            {TEXTS.services.detail.photoOf
              .replace(
                '{current}',
                String(gallery.activeImageIndex + 1)
              )
              .replace('{total}', String(images.length))}
          </span>
        </>
      )}
    </section>
  );
};

export default ServiceGallery;
