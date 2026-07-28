import React from 'react';

export interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * ResponsiveContainer
 * Centers and bounds content cleanly for mobile landscape (640px-899px) and tablet landscape (900px-1366px).
 * Prevents over-stretching on tablets while keeping full touch responsiveness on mobile landscape.
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'max-w-[1024px]',
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={`responsive-container w-full ${maxWidth} mx-auto h-full flex flex-col justify-between items-center ${className}`}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer;
