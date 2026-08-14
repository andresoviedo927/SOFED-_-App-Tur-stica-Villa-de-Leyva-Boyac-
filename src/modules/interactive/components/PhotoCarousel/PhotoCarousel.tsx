import usePhotoCarousel from '../../hooks/usePhotoCarousel';
import PhotoCarouselNavigation from '../PhotoCarouselNavigation';
import PhotoCarouselSlide from '../PhotoCarouselSlide';
import type { PhotoCarouselProps } from './PhotoCarousel.types';
import styles from './PhotoCarousel.module.css';

const getRelativePosition = (
  index: number,
  activeIndex: number,
  total: number
) => {
  let position = index - activeIndex;
  const midpoint = total / 2;

  if (position > midpoint) {
    position -= total;
  } else if (position < -midpoint) {
    position += total;
  }

  if (position < -2) {
    return 'hidden-left' as const;
  }

  if (position > 2) {
    return 'hidden-right' as const;
  }

  return position as -2 | -1 | 0 | 1 | 2;
};

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
    isTransitioning,
    goTo,
    goToPrevious,
    goToNext,
    handleKeyDown,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClickCapture,
    handleWheel,
  } = usePhotoCarousel(photos.length);

  return (
    <section
      className={styles.carousel}
      aria-label={carouselLabel}
      aria-roledescription="carrusel"
    >
      <div className={styles.slidesBox}>
        <div
          className={styles.slideList}
          data-dragging={isDragging}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleClickCapture}
          onWheel={handleWheel}
        >
          {photos.map((photo, index) => {
            const relativePosition = getRelativePosition(
              index,
              activeIndex,
              photos.length
            );

            return (
              <PhotoCarouselSlide
                key={photo.id}
                photo={photo}
                index={index}
                total={photos.length}
                relativePosition={relativePosition}
                isActive={index === activeIndex}
                isTransitioning={isTransitioning}
                photoOfLabel={photoOfLabel}
                loadingLabel={loadingLabel}
                loadErrorLabel={loadErrorLabel}
                retryLabel={retryLabel}
                onSelect={() => goTo(index)}
              />
            );
          })}
        </div>
      </div>

      <PhotoCarouselNavigation
        total={photos.length}
        activeIndex={activeIndex}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        goToLabel={goToLabel}
        isTransitioning={isTransitioning}
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
