import React from 'react';
import IMAGES from '@/assets/images';
import HomeHeader from './HomeHeader';
import HomeCurvedPanel from './HomeCurvedPanel';
import useHome from '../hooks/useHome';
import styles from './HomeContainer.module.css';

interface HomeContainerProps {
  onNavigate: (route: string) => void;
  onOpenSettings: () => void;
}

export const HomeContainer: React.FC<HomeContainerProps> = ({
  onNavigate,
  onOpenSettings,
}) => {
  const { navLinks } = useHome();

  return (
    <main className={styles.appShell}>
      <img
        className={styles.heroImage}
        src={IMAGES.home.heroBg}
        alt=""
        aria-hidden="true"
      />

      <div className={styles.topOverlay} aria-hidden="true" />

      <HomeHeader onOpenSettings={onOpenSettings} />

      <HomeCurvedPanel links={navLinks} onSelectLink={onNavigate} />
    </main>
  );
};

export default HomeContainer;
