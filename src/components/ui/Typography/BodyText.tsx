import React from 'react';
import Typography from './Typography';
import { BodyTextProps, TypographyVariant } from './types';

/**
 * BodyText Component
 * Paragraph and body content wrapper enforcing Lexend font and comfortable line height.
 */
export const BodyText: React.FC<BodyTextProps> = ({
  size = 'medium',
  children,
  className = '',
  as = 'p',
  ...restProps
}) => {
  const variantMap: Record<string, TypographyVariant> = {
    large: 'bodyLarge',
    medium: 'bodyMedium',
    small: 'bodySmall',
  };

  const variant = variantMap[size] || 'bodyMedium';

  return (
    <Typography
      as={as}
      variant={variant}
      className={className}
      {...restProps}
    >
      {children}
    </Typography>
  );
};

export default BodyText;
