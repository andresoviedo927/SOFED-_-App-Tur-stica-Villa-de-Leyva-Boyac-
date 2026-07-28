import React from 'react';
import { TypographyProps, TypographyVariant } from './types';

const VARIANT_CLASS_MAP: Record<TypographyVariant, string> = {
  display: 'typography-display',
  headlineLarge: 'typography-headline-large',
  headlineMedium: 'typography-headline-medium',
  headlineSmall: 'typography-headline-small',
  titleLarge: 'typography-title-large',
  titleMedium: 'typography-title-medium',
  titleSmall: 'typography-title-small',
  bodyLarge: 'typography-body-large',
  bodyMedium: 'typography-body-medium',
  bodySmall: 'typography-body-small',
  labelLarge: 'typography-label-large',
  labelMedium: 'typography-label-medium',
  labelSmall: 'typography-label-small',
};

const DEFAULT_ELEMENT_MAP: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  headlineLarge: 'h1',
  headlineMedium: 'h2',
  headlineSmall: 'h3',
  titleLarge: 'h3',
  titleMedium: 'h4',
  titleSmall: 'h5',
  bodyLarge: 'p',
  bodyMedium: 'p',
  bodySmall: 'p',
  labelLarge: 'span',
  labelMedium: 'span',
  labelSmall: 'span',
};

/**
 * Typography Component
 * Centralized, accessible text renderer enforcing Villa de Leyva design tokens.
 *
 * NOTE: 'display' uses Figma Hand font (exclusively for Villa de Leyva branding).
 * All other variants use Lexend font for functional readability.
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'bodyMedium',
  as,
  children,
  className = '',
  align,
  truncate = false,
  ariaLabel,
  ...restProps
}) => {
  const Component = as || DEFAULT_ELEMENT_MAP[variant] || 'p';
  const variantClass = VARIANT_CLASS_MAP[variant];

  const alignClass = align ? `text-${align}` : '';
  const truncateClass = truncate ? 'truncate' : '';

  return (
    <Component
      className={`${variantClass} ${alignClass} ${truncateClass} ${className}`.trim()}
      aria-label={ariaLabel}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default Typography;
