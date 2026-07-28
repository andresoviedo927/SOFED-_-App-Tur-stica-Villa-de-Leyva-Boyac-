import React from 'react';
import IMAGES from '@/assets/images';
import Heading from '@/components/ui/Typography/Heading';
import MainNavigation from '../MainNavigation/MainNavigation';
import { CurvedNavigationPanelProps } from './CurvedNavigationPanel.types';
import styles from './CurvedNavigationPanel.module.css';

export const CurvedNavigationPanel: React.FC<CurvedNavigationPanelProps> = ({
  title,
  links,
  onSelectLink,
  className = '',
}) => {
  return (
    <div className={`${styles.panel} ${className}`}>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          viewBox="0 0 844 190"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[0px_-6px_16px_rgba(0,0,0,0.18)]"
        >
          <path
            d="M 0 65 Q 422 -15 844 65 L 844 190 L 0 190 Z"
            fill="#F6F8FB"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
        </svg>
        <div
          className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url("${IMAGES.FIGURAS_BG}")` }}
        />
      </div>

      <div className={styles.content}>
        {title && (
          <div className="w-full text-center">
            <Heading level={1} size="display" className="text-[#1A212B] text-center">
              {title}
            </Heading>
          </div>
        )}
        <MainNavigation items={links} onSelectItem={onSelectLink} />
      </div>
    </div>
  );
};

export default CurvedNavigationPanel;
