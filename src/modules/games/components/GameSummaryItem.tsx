import AppIcon from '@/components/ui/AppIcon';
import type { IconName } from '@/assets/icons';
import styles from './GameIntroductionScreen.module.css';

interface GameSummaryItemProps {
  key?: string;
  icon: IconName;
  label: string;
}

export const GameSummaryItem = ({
  icon,
  label,
}: GameSummaryItemProps) => (
  <li className={styles.summaryItem}>
    <AppIcon name={icon} size={16} color="currentColor" />
    <span>{label}</span>
  </li>
);

export default GameSummaryItem;
