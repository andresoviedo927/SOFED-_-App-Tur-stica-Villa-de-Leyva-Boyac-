import React from 'react';
import AppIcon from '@/components/ui/AppIcon';

interface OrientationFallbackProps {
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

/**
 * OrientationFallback
 * Displayed when the device is held in portrait orientation.
 * Prompts the user to rotate their device for the optimal mobile landscape experience.
 */
export const OrientationFallback: React.FC<OrientationFallbackProps> = ({
  message = 'Gira tu dispositivo para disfrutar mejor la experiencia.',
  onDismiss,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0B1017] text-white text-center select-none isolate ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(242, 147, 13, 0.12) 0%, rgba(11, 16, 23, 0.98) 70%)',
      }}
    >
      {/* Phone Rotation Visual Illustration */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 shadow-2xl">
        {/* Animated Pulsing Ring */}
        <span className="absolute inset-0 rounded-full border border-[#F2930D]/40 animate-ping opacity-30" />

        {/* Rotation Icon */}
        <div className="animate-bounce">
          <AppIcon name="fi-rr-touch" size={40} color="#F2930D" />
        </div>
      </div>

      {/* Main Title & Message */}
      <h2 className="font-primary font-semibold text-xl sm:text-2xl text-[#F6F8FB] mb-2 max-w-xs sm:max-w-md">
        {message}
      </h2>

      <p className="font-primary font-normal text-sm text-[#9AA8BC] mb-8 max-w-xs sm:max-w-sm leading-relaxed">
        Esta aplicación está diseñada exclusivamente para orientación horizontal (mobile landscape).
      </p>

      {/* Dismiss / Continue anyway button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Continuar en modo vertical"
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#F6F8FB] font-primary font-medium text-sm transition-all border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F2930D]"
        >
          Continuar de todos modos
        </button>
      )}
    </div>
  );
};

export default OrientationFallback;
