import React, { useState, useEffect } from 'react';
import SafeAreaContainer from './SafeAreaContainer';
import OrientationFallback from './OrientationFallback';

export interface LandscapeLayoutProps {
  children: React.ReactNode;
  showOrientationFallback?: boolean;
  className?: string;
  contentClassName?: string;
}

/**
 * LandscapeLayout
 * Master full-screen container (`100dvw` x `100dvh`) for Villa de Leyva App.
 * Optimized specifically for mobile landscape and tablet landscape orientation.
 * Handles safe area insets and presents a fallback overlay when held vertically.
 */
export const LandscapeLayout: React.FC<LandscapeLayoutProps> = ({
  children,
  showOrientationFallback = true,
  className = '',
  contentClassName = '',
}) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [dismissFallback, setDismissFallback] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check both media query and window dimensions
      const portraitMedia = window.matchMedia('(orientation: portrait)').matches;
      const isHeightGreater = window.innerHeight > window.innerWidth && window.innerWidth < 640;
      setIsPortrait(portraitMedia || isHeightGreater);
    };

    checkOrientation();

    const mediaQuery = window.matchMedia('(orientation: portrait)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    window.addEventListener('resize', checkOrientation);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return (
    <div
      className={`app-shell bg-[#0B1017] select-none flex items-center justify-center ${className}`}
    >
      {/* Orientation Fallback Prompt when in Portrait Mode */}
      {showOrientationFallback && isPortrait && !dismissFallback && (
        <OrientationFallback
          onDismiss={() => setDismissFallback(true)}
        />
      )}

      {/* Main Fullscreen Safe Area Content Container */}
      <SafeAreaContainer
        edges={[]}
        className="relative w-full h-full min-w-0 min-h-0 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className={`w-full h-full flex flex-col justify-between items-center overflow-hidden ${contentClassName}`}>
          {children}
        </div>
      </SafeAreaContainer>
    </div>
  );
};

export default LandscapeLayout;
