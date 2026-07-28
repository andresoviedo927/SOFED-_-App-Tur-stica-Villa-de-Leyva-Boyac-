import TEXTS from '@/constants/texts';
import AppIcon from '@/components/ui/AppIcon';
import styles from './PlaceReadingScreen.module.css';

interface NarrationFollowButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export const NarrationFollowButton = ({
  isVisible,
  onClick,
}: NarrationFollowButtonProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.followButton}
      onClick={onClick}
    >
      <AppIcon
        name="fi-rr-location-crosshairs"
        size={16}
        color="currentColor"
      />
      <span>
        {
          TEXTS.interactive.plazaPrincipal.reading
            .returnToNarration
        }
      </span>
    </button>
  );
};

export default NarrationFollowButton;

