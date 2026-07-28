import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import styles from './ServicesHeader.module.css';

interface ServicesHeaderProps {
  onBack: () => void;
  onOpenSettings: () => void;
}

export const ServicesHeader = ({
  onBack,
  onOpenSettings,
}: ServicesHeaderProps) => (
  <header className={styles.header}>
    <Button
      kind="transparent"
      size="small"
      className={styles.backButton}
      ariaLabel={TEXTS.common.back}
      leftIcon={
        <AppIcon
          name="fi-rr-angle-small-left"
          size={24}
          color="currentColor"
        />
      }
      onClick={onBack}
    >
      {TEXTS.common.back}
    </Button>

    <h1>{TEXTS.services.screenTitle}</h1>

    <SettingsButton
      className={styles.settingsButton}
      onClick={onOpenSettings}
      ariaLabel={TEXTS.common.settingsLabel}
    />
  </header>
);

export default ServicesHeader;
