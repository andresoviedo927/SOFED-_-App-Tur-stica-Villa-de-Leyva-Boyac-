import { ReactNode } from 'react';

export type CardVariant =
  | 'default'
  | 'image'
  | 'featured'
  | 'compact'
  | 'interactive'
  | 'selected'
  | 'disabled';

export interface CardProps {
  children?: ReactNode;
  variant?: CardVariant;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
  className?: string;
  onClick?: () => void;
}

