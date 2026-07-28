import AppIcon from '@/components/ui/AppIcon';
import styles from './PanoramaResetButton.module.css';

interface PanoramaResetButtonProps {
  label: string;
  isVisible: boolean;
  onReset: () => void;
}

export const PanoramaResetButton = ({
  label,
  isVisible,
  onReset,
}: PanoramaResetButtonProps) => {
  if (!isVisible) return null;

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onReset}
    >
      <AppIcon
        name="fi-rr-rotate-left"
        size={18}
        color="currentColor"
      />
    </button>
  );
};

export default PanoramaResetButton;
