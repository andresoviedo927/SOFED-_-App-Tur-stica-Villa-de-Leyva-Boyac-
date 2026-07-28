import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import styles from './EventsHeader.module.css';

interface EventsHeaderProps {
  title: string;
  onBack: () => void;
  onOpenSettings: () => void;
}

export const EventsHeader = ({
  title,
  onBack,
  onOpenSettings,
}: EventsHeaderProps) => (
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
    <h1>{title}</h1>
    <SettingsButton
      className={styles.settings}
      onClick={onOpenSettings}
      ariaLabel={TEXTS.common.settingsLabel}
    />
  </header>
);

export default EventsHeader;
