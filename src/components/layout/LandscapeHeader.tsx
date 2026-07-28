import React from 'react';
import NavigationIcon from '@/components/ui/Icon/NavigationIcon';
import Heading from '@/components/ui/Typography/Heading';

export interface LandscapeHeaderProps {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
  rightElement?: React.ReactNode;
  className?: string;
}

/**
 * LandscapeHeader
 * Low-profile header optimized for mobile and tablet landscape orientation (~40-48px height).
 * Uses centralized NavigationIcon and Heading typography component.
 */
export const LandscapeHeader: React.FC<LandscapeHeaderProps> = ({
  title,
  onBack,
  backLabel = 'Volver',
  rightElement,
  className = '',
}) => {
  return (
    <header
      className={`w-full h-[44px] shrink-0 flex flex-row items-center justify-between px-3 sm:px-4 z-20 ${className}`}
    >
      {/* Left Back Action */}
      <div className="flex items-center min-w-[44px] h-[44px]">
        {onBack ? (
          <NavigationIcon
            type="back"
            onClick={onBack}
            ariaLabel={backLabel}
          />
        ) : null}
      </div>

      {/* Center Title (Lexend Font) */}
      {title && (
        <Heading
          level={1}
          size="large"
          className="text-[#F6F8FB] text-center truncate mx-2 max-w-[60%]"
        >
          {title}
        </Heading>
      )}

      {/* Right Action Element */}
      <div className="flex items-center justify-end min-w-[44px] h-[44px]">
        {rightElement || null}
      </div>
    </header>
  );
};

export default LandscapeHeader;
