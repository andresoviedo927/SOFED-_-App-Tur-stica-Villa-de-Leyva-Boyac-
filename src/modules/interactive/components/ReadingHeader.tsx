import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import styles from './PlaceReadingScreen.module.css';

interface ReadingHeaderProps {
  backLabel: string;
  screenTitle: string;
  isMuted: boolean;
  muteLabel: string;
  unmuteLabel: string;
  onBack: () => void;
  onToggleAudio: () => void;
}

export const ReadingHeader = ({
  backLabel,
  screenTitle,
  isMuted,
  muteLabel,
  unmuteLabel,
  onBack,
  onToggleAudio,
}: ReadingHeaderProps) => {
  const audioLabel = isMuted ? unmuteLabel : muteLabel;

  return (
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

      <button
        type="button"
        className={styles.narrationButton}
        onClick={onToggleAudio}
        aria-pressed={!isMuted}
        aria-label={audioLabel}
        title={audioLabel}
      >
        <AppIcon
          name={isMuted ? 'fi-rr-volume-mute' : 'fi-rr-audio'}
          size={24}
          color="#1A212B"
        />
      </button>
    </header>
  );
};

export default ReadingHeader;
