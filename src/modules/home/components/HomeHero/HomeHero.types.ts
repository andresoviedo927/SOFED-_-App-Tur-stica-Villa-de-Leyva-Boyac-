import { ReactNode } from 'react';

export interface HomeHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  overlayOpacity?: number;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}
