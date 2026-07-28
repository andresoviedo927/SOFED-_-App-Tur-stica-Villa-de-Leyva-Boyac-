import React from 'react';

export interface SafeAreaContainerProps {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SafeAreaContainer
 * Applies dynamic device safe area paddings using CSS env(safe-area-inset-*).
 */
export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  className = '',
  style = {},
}) => {
  const safeAreaStyle: React.CSSProperties = {
    paddingTop: edges.includes('top') ? 'var(--sat, env(safe-area-inset-top, 0px))' : undefined,
    paddingBottom: edges.includes('bottom') ? 'var(--sab, env(safe-area-inset-bottom, 0px))' : undefined,
    paddingLeft: edges.includes('left') ? 'var(--sal, env(safe-area-inset-left, 0px))' : undefined,
    paddingRight: edges.includes('right') ? 'var(--sar, env(safe-area-inset-right, 0px))' : undefined,
    ...style,
  };

  return (
    <div className={`w-full h-full ${className}`} style={safeAreaStyle}>
      {children}
    </div>
  );
};

export default SafeAreaContainer;
