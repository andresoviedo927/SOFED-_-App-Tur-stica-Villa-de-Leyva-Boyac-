import React from 'react';
import MainNavigationItem from '../MainNavigationItem/MainNavigationItem';
import { MainNavigationProps } from './MainNavigation.types';
import styles from './MainNavigation.module.css';

export const MainNavigation: React.FC<MainNavigationProps> = ({
  items,
  activeId,
  onSelectItem,
  className = '',
}) => {
  return (
    <nav className={`${styles.navContainer} ${className}`}>
      {items.map((item) => (
        <MainNavigationItem
          key={item.id}
          id={item.id}
          label={item.label}
          icon={item.icon}
          isActive={item.id === activeId}
          onClick={() => onSelectItem(item.route)}
        />
      ))}
    </nav>
  );
};

export default MainNavigation;
