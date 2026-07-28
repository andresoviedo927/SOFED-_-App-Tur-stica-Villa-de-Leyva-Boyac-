import React from 'react';
import { SettingsButton } from './SettingsButton';
import styles from './HomeContainer.module.css';

interface HomeHeaderProps {
  onOpenSettings: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onOpenSettings }) => {
  return (
    <div className={styles.homeHeader}>
      <SettingsButton
        ariaLabel="Abrir configuraciones"
        onClick={onOpenSettings}
      />
    </div>
  );
};

export default HomeHeader;
