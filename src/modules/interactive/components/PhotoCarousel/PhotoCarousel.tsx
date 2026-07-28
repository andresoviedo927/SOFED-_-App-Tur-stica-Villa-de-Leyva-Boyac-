import usePhotoCarousel from '../../hooks/usePhotoCarousel';
import PhotoCarouselNavigation from '../PhotoCarouselNavigation';
import PhotoCarouselSlide from '../PhotoCarouselSlide';
import type { PhotoCarouselProps } from './PhotoCarousel.types';
import styles from './PhotoCarousel.module.css';

export const PhotoCarousel = ({
  photos,
  carouselLabel,
  photoOfLabel,
  loadingLabel,
  loadErrorLabel,
  retryLabel,
  previousLabel,
  nextLabel,
  goToLabel,
}: PhotoCarouselProps) => {
  const {
    activeIndex,
    isDragging,
    trackRef,
    goTo,
    goToPrevious,
    goToNext,
    handleScroll,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
  } = usePhotoCarousel(photos.length);

  return (
    <section
      className={styles.carousel}
      aria-label={carouselLabel}
      aria-roledescription="carrusel"
    >
      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          data-dragging={isDragging}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          {photos.map((photo, index) => (
            <PhotoCarouselSlide
              key={photo.id}
              photo={photo}
              index={index}
              total={photos.length}
              distanceFromActive={Math.abs(index - activeIndex)}
              photoOfLabel={photoOfLabel}
              loadingLabel={loadingLabel}
              loadErrorLabel={loadErrorLabel}
              retryLabel={retryLabel}
            />
          ))}
        </div>
      </div>

      <PhotoCarouselNavigation
        total={photos.length}
        activeIndex={activeIndex}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        goToLabel={goToLabel}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onGoTo={goTo}
      />

      <p className={styles.srOnly} aria-live="polite">
        {photoOfLabel
          .replace('{current}', String(activeIndex + 1))
          .replace('{total}', String(photos.length))}
      </p>
    </section>
  );
};

export default PhotoCarousel;
