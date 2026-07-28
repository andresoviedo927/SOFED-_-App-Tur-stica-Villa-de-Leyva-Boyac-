import type { IconName } from '@/assets/icons';
import GameSummaryItem from './GameSummaryItem';
import styles from './GameIntroductionScreen.module.css';

interface GameSummaryProps {
  items: ReadonlyArray<{
    icon: IconName;
    label: string;
  }>;
  ariaLabel: string;
}

export const GameSummary = ({
  items,
  ariaLabel,
}: GameSummaryProps) => (
  <ul className={styles.summary} aria-label={ariaLabel}>
    {items.map((item) => (
      <GameSummaryItem
        key={item.label}
        icon={item.icon}
        label={item.label}
      />
    ))}
  </ul>
);

export default GameSummary;
