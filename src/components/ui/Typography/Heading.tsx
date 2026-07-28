import React from 'react';
import Typography from './Typography';
import { HeadingProps, TypographyVariant } from './types';

/**
 * Heading Component
 * Semantic heading wrapper mapped to Typography scale tokens.
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  size = 'medium',
  children,
  className = '',
  ...restProps
}) => {
  const Tag = (`h${level}` as React.ElementType) || 'h2';

  let variant: TypographyVariant = 'headlineMedium';

  if (size === 'display') {
    variant = 'display';
  } else if (size === 'large') {
    variant = level === 1 ? 'headlineLarge' : 'titleLarge';
  } else if (size === 'medium') {
    variant = level <= 2 ? 'headlineMedium' : 'titleMedium';
  } else if (size === 'small') {
    variant = 'headlineSmall';
  }

  return (
    <Typography
      as={Tag}
      variant={variant}
      className={className}
      {...restProps}
    >
      {children}
    </Typography>
  );
};

export default Heading;
