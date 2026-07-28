import React from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import Heading from '@/components/ui/Typography/Heading';
import HomeNavLinks from './HomeNavLinks';
import { HomeNavLink } from '../types';
import styles from './HomeContainer.module.css';

interface HomeCurvedPanelProps {
  links: HomeNavLink[];
  onSelectLink: (route: string) => void;
}

const PANEL_SHAPE =
  'M 0 31 Q 422 -31 844 31 L 844 180 L 0 180 Z';

export const HomeCurvedPanel: React.FC<HomeCurvedPanelProps> = ({
  links,
  onSelectLink,
}) => {
  return (
    <section className={styles.curvedPanel}>
      <div className={styles.panelBackground} aria-hidden="true">
        <svg
          viewBox="0 0 844 180"
          preserveAspectRatio="none"
          className={styles.curveSvg}
        >
          <defs>
            <clipPath id="home-panel-shape">
              <path d={PANEL_SHAPE} />
            </clipPath>
          </defs>

          <image
            href={IMAGES.home.figuresBg}
            x="0"
            y="0"
            width="844"
            height="180"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#home-panel-shape)"
            pointerEvents="none"
          />

        </svg>
      </div>

      <div className={styles.panelContent}>
        <div className={styles.titleWrapper}>
          <Heading level={1} size="display" className={styles.title}>
            {TEXTS.home.title}
          </Heading>
        </div>

        <HomeNavLinks links={links} onSelectLink={onSelectLink} />
      </div>
    </section>
  );
};

export default HomeCurvedPanel;
