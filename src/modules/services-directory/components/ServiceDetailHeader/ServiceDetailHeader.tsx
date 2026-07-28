import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import styles from './ServiceDetailHeader.module.css';

interface ServiceDetailHeaderProps {
  onBack: () => void;
  onOpenSettings: () => void;
}

export const ServiceDetailHeader = ({
  onBack,
  onOpenSettings,
}: ServiceDetailHeaderProps) => (
  <header className={styles.header}>
    <Button
      kind="transparent"
      size="small"
      className={styles.back}
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
    <h1>{TEXTS.services.detail.screenTitle}</h1>
    <SettingsButton
      className={styles.settings}
      onClick={onOpenSettings}
      ariaLabel={TEXTS.common.settingsLabel}
    />
  </header>
);

export default ServiceDetailHeader;
