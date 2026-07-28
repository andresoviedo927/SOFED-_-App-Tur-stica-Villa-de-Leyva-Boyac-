import { useEffect, type Key } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import type { ServiceMapPoint } from '../../types/services.types';
import styles from './ServiceMapTooltip.module.css';

interface ServiceMapTooltipProps {
  key?: Key;
  point: ServiceMapPoint;
  categoryLabel: string;
  onClose: () => void;
  onViewDetails: () => void;
}

export const ServiceMapTooltip = ({
  point,
  categoryLabel,
  onClose,
  onViewDetails,
}: ServiceMapTooltipProps) => {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <section
      className={styles.tooltip}
      aria-label={point.name}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className={styles.close}
        aria-label={TEXTS.services.map.closeDetails}
        onClick={onClose}
      >
        <AppIcon name="fi-rr-cross-small" size={18} color="currentColor" />
      </button>
      <span className={styles.category}>{categoryLabel}</span>
      <h2>{point.name}</h2>
      <p>{point.shortDescription}</p>
      <p className={styles.demo}>{TEXTS.services.map.demoInformation}</p>
      <Button
        kind="text"
        size="small"
        className={styles.details}
        onClick={onViewDetails}
      >
        {TEXTS.services.map.viewDetails}
      </Button>
    </section>
  );
};

export default ServiceMapTooltip;
