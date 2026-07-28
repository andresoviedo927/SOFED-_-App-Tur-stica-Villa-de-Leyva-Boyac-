import React from 'react';
import Icon from './Icon';
import { IconButtonProps } from './types';

const VARIANT_CLASSES = {
  primary:
    'bg-[#F2930D] text-white hover:bg-[#D97C00] active:scale-95 shadow-md border border-white/20',
  secondary:
    'bg-white text-[#1A212B] hover:bg-slate-50 active:scale-95 shadow-md border border-[#9AA8BC]/20',
  glass:
    'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md active:scale-95 border border-white/20 shadow-md',
  transparent:
    'bg-transparent text-white hover:bg-white/10 active:scale-95',
  floating:
    'bg-white text-[#1A212B] hover:bg-slate-50 active:scale-95 shadow-lg border border-[#9AA8BC]/20 rounded-2xl',
};

/**
 * IconButton Component
 * Accessible, touch-friendly icon button wrapper with a minimum 44x44px target area.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconSize = 'md',
  iconColor,
  ariaLabel,
  variant = 'secondary',
  isDisabled = false,
  tooltip,
  className = '',
  onClick,
  ...buttonProps
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={tooltip || ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      className={`min-w-[44px] min-h-[44px] p-2.5 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2930D] focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent ${VARIANT_CLASSES[variant]} ${className}`.trim()}
      {...buttonProps}
    >
      <Icon
        name={iconName}
        size={iconSize}
        color={iconColor}
        isDecorative={true}
      />
    </button>
  );
};

export default IconButton;
