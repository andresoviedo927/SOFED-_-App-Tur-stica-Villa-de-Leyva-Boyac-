import React from 'react';
import { ICONS } from '@/assets/icons';
import { AppIconProps } from './AppIcon.types';
import './AppIcon.css';

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  state = 'normal',
  ariaLabel,
}) => {
  const IconComponent = ICONS[name] || ICONS['fi-rr-info'];

  return (
    <span
      className={`app-icon app-icon--${state} ${className}`}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <IconComponent size={size} color={color} />
    </span>
  );
};

export default AppIcon;
