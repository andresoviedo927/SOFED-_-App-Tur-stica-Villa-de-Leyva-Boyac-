import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import styles from './GameIntroductionScreen.module.css';

interface StartRouteButtonProps {
  label: string;
  onClick: () => void;
}

export const StartRouteButton = ({
  label,
  onClick,
}: StartRouteButtonProps) => (
  <Button
    kind="solid"
    size="small"
    className={styles.startButton}
    rightIcon={
      <AppIcon
        name="fi-rr-arrow-small-right"
        size={24}
        color="currentColor"
      />
    }
    ariaLabel={label}
    onClick={onClick}
  >
    {label}
  </Button>
);

export default StartRouteButton;
