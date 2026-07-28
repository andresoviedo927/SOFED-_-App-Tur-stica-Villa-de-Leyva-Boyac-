import React from 'react';
import IconButton from '@/components/ui/IconButton';
import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import { HeaderProps } from './Header.types';
import './Header.css';

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackClick,
  onSettingsClick,
  className = '',
}) => {
  return (
    <header className={`app-header ${className}`}>
      <div>
        {showBack && (
          <button
            type="button"
            className="app-header-back-button"
            onClick={onBackClick}
            aria-label={TEXTS.app.backLabel}
          >
            <AppIcon name="fi-rr-angle-small-left" size={20} color="#FFFFFF" />
            <span>{TEXTS.app.backLabel}</span>
          </button>
        )}
      </div>

      {title && <h1 className="app-header-title">{title}</h1>}

      <div>
        {onSettingsClick && (
          <IconButton
            iconName="fi-rr-settings-sliders"
            iconSize={20}
            ariaLabel={TEXTS.app.settingsLabel}
            onClick={onSettingsClick}
            variant="transparent"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
