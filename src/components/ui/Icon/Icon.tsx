import React from 'react';
import { ICONS } from '@/assets/icons';
import { ICON_SIZES } from '@/constants/icons';
import { IconProps } from './types';

/**
 * Functional Icon Component
 * Renders Flaticon UIcons mapped to Lucide SVG icons with strict accessibility attributes.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  className = '',
  ariaLabel,
  isDecorative = !ariaLabel,
  ...svgProps
}) => {
  const IconComponent = ICONS[name] || ICONS['fi-rr-info'];

  const numericSize =
    typeof size === 'number'
      ? size
      : ICON_SIZES[size] || ICON_SIZES.md;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`.trim()}
      aria-label={ariaLabel}
      aria-hidden={isDecorative ? true : undefined}
      role={ariaLabel ? 'img' : undefined}
    >
      <IconComponent
        size={numericSize}
        color={color}
        {...svgProps}
      />
    </span>
  );
};

export default Icon;
