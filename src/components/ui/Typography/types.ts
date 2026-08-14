import React from 'react';

/**
 * Scale Tokens for Typography Hierarchy
 */
export type TypographyVariant =
  | 'display' // Gochi Hand - Exclusively for "Villa de Leyva" branding
  | 'headlineLarge' // Lexend - Large section titles
  | 'headlineMedium' // Lexend - Subsection headers
  | 'headlineSmall' // Lexend - Card titles
  | 'titleLarge' // Lexend - Modal/View titles
  | 'titleMedium' // Lexend - Subtitles / Item titles
  | 'titleSmall' // Lexend - Small component titles
  | 'bodyLarge' // Lexend - Prominent body text
  | 'bodyMedium' // Lexend - Standard paragraphs
  | 'bodySmall' // Lexend - Secondary text, captions
  | 'labelLarge' // Lexend - Buttons, chips
  | 'labelMedium' // Lexend - Controls, form labels
  | 'labelSmall'; // Lexend - Tooltips, meta tags

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  ariaLabel?: string;
}

export interface HeadingProps extends Omit<TypographyProps, 'variant'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'large' | 'medium' | 'small' | 'display';
}

export interface BodyTextProps extends Omit<TypographyProps, 'variant'> {
  size?: 'large' | 'medium' | 'small';
}

export interface LabelProps extends Omit<TypographyProps, 'variant'> {
  size?: 'large' | 'medium' | 'small';
  htmlFor?: string;
}
