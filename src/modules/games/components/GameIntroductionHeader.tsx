import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import styles from './GameIntroductionScreen.module.css';

interface GameIntroductionHeaderProps {
  backLabel: string;
  screenTitle: string;
  settingsLabel: string;
  onBack: () => void;
  onOpenSettings: () => void;
  showSettings?: boolean;
}

export const GameIntroductionHeader = ({
  backLabel,
  screenTitle,
  settingsLabel,
  onBack,
  onOpenSettings,
  showSettings = true,
}: GameIntroductionHeaderProps) => (
  <header className={styles.header}>
    <Button
      kind="transparent"
      size="small"
      className={styles.backButton}
      leftIcon={
        <AppIcon
          name="fi-rr-angle-small-left"
          size={24}
          color="currentColor"
        />
      }
      ariaLabel={backLabel}
      onClick={onBack}
    >
      {backLabel}
    </Button>

    <h1 className={styles.screenTitle}>{screenTitle}</h1>

    {showSettings ? (
      <SettingsButton
        className={styles.settingsButton}
        ariaLabel={settingsLabel}
        onClick={onOpenSettings}
      />
    ) : (
      <span className={styles.headerReservedSpace} aria-hidden="true" />
    )}
  </header>
);

export default GameIntroductionHeader;
