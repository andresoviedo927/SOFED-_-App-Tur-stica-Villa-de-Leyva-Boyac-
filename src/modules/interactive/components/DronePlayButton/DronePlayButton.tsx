import AppIcon from '@/components/ui/AppIcon';
import styles from './DronePlayButton.module.css';

interface DronePlayButtonProps {
  label: string;
  onPlay: () => void;
}

export const DronePlayButton = ({
  label,
  onPlay,
}: DronePlayButtonProps) => (
  <button
    type="button"
    className={styles.button}
    aria-label={label}
    onClick={onPlay}
  >
    <AppIcon
      name="fi-rr-play"
      size={24}
      color="currentColor"
    />
  </button>
);

export default DronePlayButton;
