import { useEffect, type ReactNode } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import styles from './DirectoryMapTooltip.module.css';

interface DirectoryMapTooltipProps {
  title: string;
  typeLabel: string;
  description?: string;
  demoLabel: string;
  closeLabel: string;
  detailsLabel: string;
  extraContent?: ReactNode;
  onClose: () => void;
  onViewDetails: () => void;
}

export const DirectoryMapTooltip = ({
  title,
  typeLabel,
  description,
  demoLabel,
  closeLabel,
  detailsLabel,
  extraContent,
  onClose,
  onViewDetails,
}: DirectoryMapTooltipProps) => {
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
      aria-label={title}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className={styles.close}
        aria-label={closeLabel}
        onClick={onClose}
      >
        <AppIcon name="fi-rr-close" size={18} color="currentColor" />
      </button>
      <span className={styles.type}>{typeLabel}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {extraContent}
      <p className={styles.demo}>{demoLabel}</p>
      <Button
        kind="text"
        size="small"
        className={styles.details}
        onClick={onViewDetails}
      >
        {detailsLabel}
      </Button>
    </section>
  );
};

export default DirectoryMapTooltip;
