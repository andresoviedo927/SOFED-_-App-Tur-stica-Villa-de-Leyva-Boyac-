import React from 'react';
import Icon from './Icon';
import { IllustratedIconProps } from './types';

/**
 * IllustratedIcon Component
 * Feature callout icon wrapper with 3D warm glow effects and glossy circular frame.
 */
export const IllustratedIcon: React.FC<IllustratedIconProps> = ({
  iconName,
  size = 48,
  glowColor = '#F2930D',
  className = '',
  children,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full p-4 shrink-0 transition-transform hover:scale-105 ${className}`.trim()}
      style={{
        background: `radial-gradient(circle, ${glowColor}33 0%, rgba(26, 33, 43, 0.8) 100%)`,
        border: `1.5px solid ${glowColor}66`,
        boxShadow: `0px 8px 24px ${glowColor}40, inset 0px 1px 2px rgba(255, 255, 255, 0.3)`,
      }}
    >
      <Icon
        name={iconName}
        size={size}
        color={glowColor}
        isDecorative={true}
      />
      {children}
    </div>
  );
};

export default IllustratedIcon;
