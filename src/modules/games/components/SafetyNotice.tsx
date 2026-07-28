import AppIcon from '@/components/ui/AppIcon';
import styles from './GameIntroductionScreen.module.css';

interface SafetyNoticeProps {
  message: string;
}

export const SafetyNotice = ({ message }: SafetyNoticeProps) => (
  <aside className={styles.safetyNotice}>
    <AppIcon name="fi-rr-triangle-warning" size={20} color="#FFD38A" />
    <p>{message}</p>
  </aside>
);

export default SafetyNotice;
