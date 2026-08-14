import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import styles from './ServicesHeader.module.css';

interface ServicesHeaderProps {
  onBack: () => void;
  onOpenSettings: () => void;
}

export const ServicesHeader = ({
  onBack,
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

    <span className={styles.headerSpacer} aria-hidden="true" />
  </header>
);

export default ServicesHeader;
