import AppIcon from '@/components/ui/AppIcon';
import type { PhotoCarouselNavigationProps } from './PhotoCarouselNavigation.types';
import styles from './PhotoCarouselNavigation.module.css';

export const PhotoCarouselNavigation = ({
  total,
  activeIndex,
  previousLabel,
  nextLabel,
  goToLabel,
  onPrevious,
  onNext,
  onGoTo,
}: PhotoCarouselNavigationProps) => (
  <div className={styles.navigation}>
    <button
      type="button"
      className={styles.arrow}
      aria-label={previousLabel}
      disabled={activeIndex === 0}
      onClick={onPrevious}
    >
      <AppIcon
        name="fi-rr-angle-small-left"
        size={20}
        color="currentColor"
      />
    </button>

    <div className={styles.indicators}>
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          type="button"
          className={styles.indicator}
          aria-label={`${goToLabel} ${index + 1}`}
          aria-current={
            index === activeIndex ? 'true' : undefined
          }
          onClick={() => onGoTo(index)}
        >
          <span aria-hidden="true" />
        </button>
      ))}
    </div>

    <button
      type="button"
      className={styles.arrow}
      aria-label={nextLabel}
      disabled={activeIndex === total - 1}
      onClick={onNext}
    >
      <AppIcon
        name="fi-rr-arrow-small-right"
        size={20}
        color="currentColor"
      />
    </button>
  </div>
);

export default PhotoCarouselNavigation;
