import React from 'react';
import Typography from './Typography';
import { LabelProps, TypographyVariant } from './types';

/**
 * Label Component
 * Functional UI control text wrapper (buttons, labels, chips, badges, forms) enforcing Lexend font.
 */
export const Label: React.FC<LabelProps> = ({
  size = 'medium',
  children,
  className = '',
  as = 'span',
  htmlFor,
  ...restProps
}) => {
  const variantMap: Record<string, TypographyVariant> = {
    large: 'labelLarge',
    medium: 'labelMedium',
    small: 'labelSmall',
  };

  const variant = variantMap[size] || 'labelMedium';
  const Element = htmlFor ? 'label' : as;

  return (
    <Typography
      as={Element}
      variant={variant}
      className={className}
      htmlFor={htmlFor}
      {...restProps}
    >
      {children}
    </Typography>
  );
};

export default Label;
