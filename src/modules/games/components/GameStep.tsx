import AppIcon from '@/components/ui/AppIcon';
import type { IconName } from '@/assets/icons';
import styles from './GameIntroductionScreen.module.css';

interface GameStepProps {
  key?: string;
  order: number;
  icon: IconName;
  title: string;
  description: string;
}

export const GameStep = ({
  order,
  icon,
  title,
  description,
}: GameStepProps) => (
  <li className={styles.step}>
    <span className={styles.stepNumber}>{order}</span>
    <AppIcon name={icon} size={20} color="#F2930D" />
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </li>
);

export default GameStep;
