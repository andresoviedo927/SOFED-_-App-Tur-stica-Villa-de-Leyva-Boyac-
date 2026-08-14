import React from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import Heading from '@/components/ui/Typography/Heading';
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
    <main
      className={styles.appShell}
      style={{
        backgroundImage: `url(${IMAGES.home.heroBg})`,
      }}
    >
      <div className={styles.heroTitleWrapper}>
        <Heading
          level={1}
          size="display"
          className={styles.heroTitle}
        >
          {TEXTS.home.title}
        </Heading>
      </div>

      <HomeHeader onOpenSettings={onOpenSettings} />

      <HomeCurvedPanel links={navLinks} onSelectLink={onNavigate} />
    </main>
  );
};

export default HomeContainer;
