import React from 'react';
import IMAGES from '@/assets/images';
import HomeNavLinks from './HomeNavLinks';
import { HomeNavLink } from '../types';
import styles from './HomeContainer.module.css';

interface HomeCurvedPanelProps {
  links: HomeNavLink[];
  onSelectLink: (route: string) => void;
}

export const HomeCurvedPanel: React.FC<HomeCurvedPanelProps> = ({
  links,
  onSelectLink,
}) => {
  return (
    <section
      className={styles.curvedPanel}
      style={{
        backgroundImage: `url(${IMAGES.home.figuresBg})`,
      }}
    >
      <div className={styles.panelContent}>
        <HomeNavLinks links={links} onSelectLink={onSelectLink} />
      </div>
    </section>
  );
};

export default HomeCurvedPanel;
