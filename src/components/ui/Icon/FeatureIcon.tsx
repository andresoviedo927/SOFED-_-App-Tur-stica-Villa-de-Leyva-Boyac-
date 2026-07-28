import React from 'react';
import Icon from './Icon';
import { FeatureIconProps } from './types';
import Label from '../Typography/Label';

/**
 * FeatureIcon Component
 * High-prominence, 3D glossy circular icon button for Villa de Leyva's primary Home experiences.
 * Uses warm Villa de Leyva orange gradient (#F2930D -> #BA5900) with soft drop shadow.
 */
export const FeatureIcon: React.FC<FeatureIconProps> = ({
  iconName,
  size = 'md',
  label,
  onClick,
  className = '',
  isActive = false,
}) => {
  const containerSizeClass =
    size === 'sm'
      ? 'w-12 h-12 min-w-[48px] min-h-[48px]'
      : size === 'lg'
        ? 'w-18 h-18 min-w-[72px] min-h-[72px]'
        : 'w-14 h-14 sm:w-16 sm:h-16 min-w-[56px] min-h-[56px]';

  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 30;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label || 'Opción de navegación'}
      className={`group flex flex-col items-center justify-center gap-1.5 p-1 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2930D] rounded-2xl active:scale-95 ${className}`.trim()}
    >
      {/* 3D Glossy Circular Container */}
      <div
        className={`relative ${containerSizeClass} rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 ${
          isActive ? 'ring-4 ring-[#F2930D] ring-offset-2' : ''
        }`}
        style={{
          background: 'linear-gradient(180deg, #F2930D 0%, #BA5900 100%)',
          boxShadow:
            'inset 0px 2px 4px rgba(255, 255, 255, 0.4), inset 0px -2px 4px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(242, 147, 13, 0.35)',
        }}
      >
        <Icon
          name={iconName}
          size={iconSize}
          color="#FFFFFF"
          isDecorative={true}
        />
      </div>

      {/* Accompanying Label (Lexend) */}
      {label && (
        <Label
          size="small"
          className="text-white text-center font-medium line-clamp-1 max-w-[90px] drop-shadow-sm group-hover:text-[#F2930D] transition-colors"
        >
          {label}
        </Label>
      )}
    </button>
  );
};

export default FeatureIcon;
