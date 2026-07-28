import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import { SettingsButtonProps } from './SettingsButton.types';
import styles from './SettingsButton.module.css';

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  onClick,
  ariaLabel = TEXTS.common.settingsLabel,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <AppIcon
        name="fi-rr-settings-sliders"
        size={24}
        color="#1A212B"
      />
    </button>
  );
};

export default SettingsButton;
