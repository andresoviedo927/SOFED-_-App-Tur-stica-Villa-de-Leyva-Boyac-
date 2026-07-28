import React from 'react';
import LandscapeModal from '@/components/ui/LandscapeModal';
import { MapPinPOI } from '../types';

interface POIDetailModalProps {
  pin: MapPinPOI | null;
  onClose: () => void;
  onExplore?: () => void;
}

export const POIDetailModal: React.FC<POIDetailModalProps> = ({ pin, onClose, onExplore }) => {
  if (!pin) return null;

  const isPlaza = pin.id === 'pin-red' || pin.title.toLowerCase().includes('plaza');

  return (
    <LandscapeModal
      isOpen={Boolean(pin)}
      onClose={onClose}
      title={pin.title}
    >
      <div className="flex flex-col gap-3">
        {/* Category Pill */}
        <div className="self-start px-3 py-1 rounded-full bg-[#F2930D]/20 border border-[#F2930D]/40 text-[#F2930D] font-primary font-medium text-xs">
          {pin.category}
        </div>

        {/* Description */}
        <p className="font-primary font-normal text-sm text-[#9AA8BC] leading-relaxed">
          {pin.description}
        </p>

        {/* Action Button */}
        <div className="flex justify-end items-center gap-2 mt-3">
          {isPlaza && onExplore && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onExplore();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#F2930D] hover:bg-[#D97C00] active:scale-95 text-white font-primary font-medium text-sm cursor-pointer transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center gap-2"
            >
              <span>Explorar Plaza Principal</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[90px] px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-slate-200 font-primary font-medium text-sm cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center"
          >
            Entendido
          </button>
        </div>
      </div>
    </LandscapeModal>
  );
};

export default POIDetailModal;
