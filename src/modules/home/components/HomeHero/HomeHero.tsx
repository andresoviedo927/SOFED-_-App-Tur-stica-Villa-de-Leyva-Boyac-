import React from 'react';
import { HomeHeroProps } from './HomeHero.types';
import styles from './HomeHero.module.css';

export const HomeHero: React.FC<HomeHeroProps> = ({
  title,
  subtitle,
  backgroundImageUrl,
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.heroContainer} ${className}`}>
      {backgroundImageUrl && (
        <img src={backgroundImageUrl} alt={title || 'Villa de Leyva Hero'} className={styles.heroImage} />
      )}
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        {title && <h1 className="text-2xl font-bold text-white drop-shadow">{title}</h1>}
        {subtitle && <p className="text-sm text-slate-200 drop-shadow">{subtitle}</p>}
        {actions && <div className="mt-2 flex gap-2">{actions}</div>}
        {children}
      </div>
    </div>
  );
};

export default HomeHero;
