import AppIcon from '@/components/ui/AppIcon';
import type { NarrationStatus } from '../types/narration.types';
import styles from './PlaceReadingScreen.module.css';

interface NarrationButtonProps {
  status: NarrationStatus;
  isActive: boolean;
  startLabel: string;
  loadingLabel: string;
  stopLabel: string;
  onToggle: () => void;
}

export const NarrationButton = ({
  status,
  isActive,
  startLabel,
  loadingLabel,
  stopLabel,
  onToggle,
}: NarrationButtonProps) => {
  const isLoading = status === 'loading';
  const isStopping = status === 'stopping';
  const isDisabled = isLoading || isStopping;
  const accessibleLabel = isLoading
    ? loadingLabel
    : isActive
      ? stopLabel
      : startLabel;

  return (
    <button
      type="button"
      className={styles.narrationButton}
      onClick={onToggle}
      disabled={isDisabled}
      aria-pressed={isActive}
      aria-label={accessibleLabel}
      title={accessibleLabel}
    >
      {isLoading ? (
        <span className={styles.audioSpinner} aria-hidden="true" />
      ) : (
        <AppIcon
          name={isActive ? 'fi-rr-volume-mute' : 'fi-rr-audio'}
          size={24}
          color="#1A212B"
        />
      )}
    </button>
  );
};

export default NarrationButton;
