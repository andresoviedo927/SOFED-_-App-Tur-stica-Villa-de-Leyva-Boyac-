import { ReactNode } from 'react';

export interface ImageOverlayProps {
  imageUrl: string;
  altText?: string;
  overlayOpacity?: number;
  overlayColor?: string;
  children?: ReactNode;
  className?: string;
}
