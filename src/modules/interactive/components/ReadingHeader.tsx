import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import type { NarrationStatus } from '../types/narration.types';
import NarrationButton from './NarrationButton';
import styles from './PlaceReadingScreen.module.css';

interface ReadingHeaderProps {
  backLabel: string;
  screenTitle: string;
  narrationStatus: NarrationStatus;
  isNarrationActive: boolean;
  startNarrationLabel: string;
  loadingNarrationLabel: string;
  stopNarrationLabel: string;
  onBack: () => void;
  onToggleNarration: () => void;
}

export const ReadingHeader = ({
  backLabel,
  screenTitle,
  narrationStatus,
  isNarrationActive,
  startNarrationLabel,
  loadingNarrationLabel,
  stopNarrationLabel,
  onBack,
  onToggleNarration,
}: ReadingHeaderProps) => (
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
      onClick={onBack}
      ariaLabel={backLabel}
    >
      {backLabel}
    </Button>

    <h1 className={styles.screenTitle}>{screenTitle}</h1>

    <div className={styles.narrationAction}>
      <NarrationButton
        status={narrationStatus}
        isActive={isNarrationActive}
        startLabel={startNarrationLabel}
        loadingLabel={loadingNarrationLabel}
        stopLabel={stopNarrationLabel}
        onToggle={onToggleNarration}
      />
    </div>
  </header>
);

export default ReadingHeader;
