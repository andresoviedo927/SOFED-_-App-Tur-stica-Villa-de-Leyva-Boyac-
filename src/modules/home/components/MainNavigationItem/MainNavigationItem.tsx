import React from 'react';
import FeatureIcon from '@/components/ui/Icon/FeatureIcon';
import { MainNavigationItemProps } from './MainNavigationItem.types';
import styles from './MainNavigationItem.module.css';

export const MainNavigationItem: React.FC<MainNavigationItemProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.item} ${isActive ? styles.active : ''} ${className}`}
    >
      <FeatureIcon iconName={icon} label={label} isActive={isActive} onClick={onClick} />
    </button>
  );
};

export default MainNavigationItem;
