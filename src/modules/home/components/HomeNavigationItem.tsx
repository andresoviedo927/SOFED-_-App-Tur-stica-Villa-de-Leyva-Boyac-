import React from 'react';
import styles from './HomeContainer.module.css';

export interface NavigationItemProps {
  label: string;
  icon: string;
  to: string;
  onNavigate: (destination: string) => void;
}

export const HomeNavigationItem: React.FC<NavigationItemProps> = ({
  label,
  icon,
  to,
  onNavigate,
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={styles.navigationItem}
      onClick={() => onNavigate(to)}
    >
      <span className={styles.navigationIcon} aria-hidden="true">
        <img
          src={icon}
          alt=""
          draggable={false}
          className={styles.navigationImage}
        />
      </span>
      <span className={styles.navigationLabel}>{label}</span>
    </button>
  );
};

export default HomeNavigationItem;
