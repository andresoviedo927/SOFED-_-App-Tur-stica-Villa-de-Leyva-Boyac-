import React from 'react';
import { MapPinPOI } from '../types';

interface MapPinButtonProps {
  pin: MapPinPOI;
  onClick: (pin: MapPinPOI) => void;
}

const PIN_GRADIENTS = {
  blue: {
    bg: 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)',
    border: '#93C5FD',
    glow: 'rgba(59, 130, 246, 0.4)',
    iconColor: '#E0F2FE',
  },
  yellow: {
    bg: 'linear-gradient(180deg, #F59E0B 0%, #B45309 100%)',
    border: '#FDE68A',
    glow: 'rgba(245, 158, 11, 0.4)',
    iconColor: '#FEF3C7',
  },
  green: {
    bg: 'linear-gradient(180deg, #10B981 0%, #047857 100%)',
    border: '#A7F3D0',
    glow: 'rgba(16, 185, 129, 0.4)',
    iconColor: '#ECFDF5',
  },
  red: {
    bg: 'linear-gradient(180deg, #EF4444 0%, #B91C1C 100%)',
    border: '#FCA5A5',
    glow: 'rgba(239, 68, 68, 0.4)',
    iconColor: '#FEF2F2',
  },
};

export const MapPinButton: React.FC<MapPinButtonProps> = ({ pin, onClick }) => {
  const styleConfig = PIN_GRADIENTS[pin.color];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(pin);
      }}
      aria-label={`Ver información de ${pin.title}`}
      className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 z-20"
      style={{
        left: `${pin.xPercent}%`,
        top: `${pin.yPercent}%`,
      }}
    >
      {/* Pulse Ripple on Map */}
      <span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full blur-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: styleConfig.glow }}
      />

      {/* 3D Map Pin Body */}
      <div
        className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform"
        style={{
          background: styleConfig.bg,
          borderColor: styleConfig.border,
          boxShadow: `0 4px 10px ${styleConfig.glow}, inset 0 2px 4px rgba(255,255,255,0.6)`,
        }}
      >
        {/* Top Gloss Arc */}
        <span className="absolute top-0.5 left-1 right-1 h-3 rounded-t-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

        {/* Pin Center Icon / Dot */}
        <span className="w-3 h-3 rounded-full bg-white shadow-inner flex items-center justify-center">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: styleConfig.border }}
          />
        </span>
      </div>

      {/* Pin Tail Arrow */}
      <div
        className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px] mx-auto -mt-0.5"
        style={{ borderTopColor: styleConfig.border }}
      />
    </button>
  );
};

export default MapPinButton;
