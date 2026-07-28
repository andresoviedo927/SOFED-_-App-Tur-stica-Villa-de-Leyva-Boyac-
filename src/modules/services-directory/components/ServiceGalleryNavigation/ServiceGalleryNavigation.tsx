import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import type { ServiceGalleryImage } from '../../types/serviceDetail.types';
import styles from './ServiceGalleryNavigation.module.css';

interface ServiceGalleryNavigationProps {
  images: ServiceGalleryImage[];
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export const ServiceGalleryNavigation = ({
  images,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
}: ServiceGalleryNavigationProps) => {
  if (images.length < 2) return null;

  return (
    <>
      <button
        type="button"
        className={`${styles.arrow} ${styles.previous}`}
        aria-label={TEXTS.services.detail.previousPhoto}
        onClick={onPrevious}
      >
        <AppIcon
          name="fi-rr-angle-small-left"
          size={24}
          color="currentColor"
        />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label={TEXTS.services.detail.nextPhoto}
        onClick={onNext}
      >
        <AppIcon
          name="fi-rr-arrow-small-right"
          size={24}
          color="currentColor"
        />
      </button>
      <div className={styles.indicators}>
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            aria-label={`${TEXTS.services.detail.goToPhoto} ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => onSelect(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </>
  );
};

export default ServiceGalleryNavigation;
