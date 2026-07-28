import React from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import PlaceExperienceHeader from './PlaceExperienceHeader';
import styles from './ExperiencePlaceholderScreen.module.css';

interface ExperiencePlaceholderScreenProps {
  title: string;
  onBack: () => void;
}

export const ExperiencePlaceholderScreen: React.FC<
  ExperiencePlaceholderScreenProps
> = ({ title, onBack }) => (
  <section className={styles.screen}>
    <div
      className={styles.background}
      style={{
        backgroundImage: `url("${IMAGES.settings.background}")`,
      }}
      aria-hidden="true"
    />
    <div className={styles.overlay} aria-hidden="true" />
    <div className={styles.content}>
      <PlaceExperienceHeader title={title} onBack={onBack} />
      <div className={styles.message} role="status">
        {TEXTS.interactive.plazaPrincipal.comingSoon}
      </div>
    </div>
  </section>
);

export default ExperiencePlaceholderScreen;
