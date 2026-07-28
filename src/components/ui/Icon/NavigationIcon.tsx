import React from 'react';
import Icon from './Icon';
import { NavigationIconProps } from './types';
import Label from '../Typography/Label';

/**
 * NavigationIcon Component
 * Purpose-built navigation button (Back, Forward, Close, Home) with accessible touch areas.
 */
export const NavigationIcon: React.FC<NavigationIconProps> = ({
  type = 'back',
  onClick,
  ariaLabel,
  className = '',
}) => {
  const iconConfig = {
    back: {
      name: 'fi-rr-angle-small-left' as const,
      label: 'Volver',
      defaultAria: 'Volver a la pantalla anterior',
    },
    forward: {
      name: 'fi-rr-arrow-right' as const,
      label: 'Continuar',
      defaultAria: 'Continuar a la siguiente pantalla',
    },
    close: {
      name: 'fi-rr-close' as const,
      label: 'Cerrar',
      defaultAria: 'Cerrar modal',
    },
    home: {
      name: 'fi-rr-touch' as const,
      label: 'Inicio',
      defaultAria: 'Volver al Inicio',
    },
  }[type];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || iconConfig.defaultAria}
      className={`min-w-[44px] min-h-[44px] px-3.5 py-2 flex items-center justify-center gap-1.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-white backdrop-blur-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/20 shadow-md ${className}`.trim()}
    >
      <Icon
        name={iconConfig.name}
        size={22}
        color="#FFFFFF"
        isDecorative={true}
      />
      {type === 'back' || type === 'forward' ? (
        <Label size="medium" className="hidden sm:inline font-medium text-white">
          {iconConfig.label}
        </Label>
      ) : null}
    </button>
  );
};

export default NavigationIcon;
