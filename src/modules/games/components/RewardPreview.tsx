import AppIcon from '@/components/ui/AppIcon';
import styles from './GameIntroductionScreen.module.css';

interface RewardPreviewProps {
  title: string;
  description: string;
  disclaimer: string;
}

export const RewardPreview = ({
  title,
  description,
  disclaimer,
}: RewardPreviewProps) => (
  <section className={styles.reward}>
    <AppIcon name="fi-rr-trophy" size={24} color="#F2930D" />
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <small>{disclaimer}</small>
    </div>
  </section>
);

export default RewardPreview;
