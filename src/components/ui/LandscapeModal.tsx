import React, { useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';

export interface LandscapeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * LandscapeModal
 * Modal dialog specifically tailored for landscape screens.
 * Ensures the modal height fits within low-height viewports (max-h-[85dvh]) with smooth internal scroll.
 */
export const LandscapeModal: React.FC<LandscapeModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn isolate"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'landscape-modal-title' : undefined}
    >
      <div
        className={`relative w-full max-w-[720px] max-h-[calc(100dvh-32px)] bg-[#1A212B] border border-white/20 rounded-[20px] p-3 sm:p-4 shadow-2xl text-white flex flex-col gap-3 overflow-hidden animate-scaleIn ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Title and Close Button */}
        <div className="flex items-center justify-between gap-3 shrink-0 pb-2 border-b border-white/10">
          {title ? (
            <h3
              id="landscape-modal-title"
              className="font-primary font-semibold text-base sm:text-lg text-[#F6F8FB] truncate"
            >
              {title}
            </h3>
          ) : (
            <div />
          )}

          {/* Close Button (Touch target >= 44x44px) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#F2930D]"
          >
            <AppIcon name="fi-rr-close" size={20} color="#FFFFFF" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 text-sm text-[#9AA8BC] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LandscapeModal;
