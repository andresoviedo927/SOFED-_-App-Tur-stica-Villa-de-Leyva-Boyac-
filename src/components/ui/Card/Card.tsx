import React from 'react';
import { CardProps } from './Card.types';
import './Card.css';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  title,
  subtitle,
  imageUrl,
  badge,
  className = '',
  onClick,
}) => {
  const isInteractive = variant === 'interactive' || !!onClick;
  const isDisabled = variant === 'disabled';
  const isSelected = variant === 'selected';

  return (
    <div
      className={`app-card app-card--${variant} ${
        isInteractive ? 'app-card--interactive' : ''
      } ${isSelected ? 'app-card--selected' : ''} ${
        isDisabled ? 'app-card--disabled' : ''
      } ${className}`.trim()}
      onClick={isDisabled ? undefined : onClick}
      role={isInteractive && !isDisabled ? 'button' : undefined}
      tabIndex={isInteractive && !isDisabled ? 0 : undefined}
    >
      {badge && <span className="app-card-badge">{badge}</span>}
      
      {imageUrl && (
        <div className="app-card-image-wrapper">
          <img src={imageUrl} alt={title || 'Card image'} className="app-card-image" />
        </div>
      )}

      <div className="app-card-body">
        {title && <h3 className="app-card-title">{title}</h3>}
        {subtitle && <p className="app-card-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
