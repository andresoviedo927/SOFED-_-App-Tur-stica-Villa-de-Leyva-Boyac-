import React from 'react';
import Icon from './Icon';
import { StatusIconProps } from './types';
import BodyText from '../Typography/BodyText';

/**
 * StatusIcon Component
 * Status & feedback indicator pairing icon, status color, and required accessible text message.
 */
export const StatusIcon: React.FC<StatusIconProps> = ({
  status = 'info',
  size = 20,
  message,
  className = '',
}) => {
  const STATUS_CONFIG = {
    success: {
      iconName: 'fi-rr-check' as const,
      color: '#10B981',
      bgClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      label: 'Éxito',
    },
    warning: {
      iconName: 'fi-rr-info' as const,
      color: '#F59E0B',
      bgClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      label: 'Advertencia',
    },
    info: {
      iconName: 'fi-rr-info' as const,
      color: '#3B82F6',
      bgClass: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      label: 'Información',
    },
    error: {
      iconName: 'fi-rr-close' as const,
      color: '#EF4444',
      bgClass: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      label: 'Error',
    },
    location: {
      iconName: 'fi-rr-map-pin' as const,
      color: '#F2930D',
      bgClass: 'bg-orange-500/10 border-orange-500/30 text-[#F2930D]',
      label: 'Ubicación',
    },
  }[status];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${STATUS_CONFIG.bgClass} ${className}`.trim()}
      role="status"
    >
      <Icon
        name={STATUS_CONFIG.iconName}
        size={size}
        color={STATUS_CONFIG.color}
        ariaLabel={STATUS_CONFIG.label}
      />
      {message && (
        <BodyText size="small" className="font-medium text-current">
          {message}
        </BodyText>
      )}
    </div>
  );
};

export default StatusIcon;
