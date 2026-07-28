import React from 'react';
import AppIcon from '../AppIcon';
import { IconButtonProps } from './IconButton.types';
import './IconButton.css';

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 24,
  iconColor = '#FFFFFF',
  variant = 'transparent',
  ariaLabel,
  isDisabled = false,
  className = '',
  onClick,
  ...restProps
}) => {
  return (
    <button
      type="button"
      className={`icon-button icon-button--${variant} ${className}`}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      {...restProps}
    >
      <span className="relative z-10 inline-flex items-center justify-center">
        <AppIcon name={iconName} size={iconSize} color={iconColor} />
      </span>
    </button>
  );
};

export default IconButton;
