import type { Key } from 'react';
import type { GalleryPhoto } from '../../types/gallery.types';

export type PhotoCarouselPosition =
  | -2
  | -1
  | 0
  | 1
  | 2
  | 'hidden-left'
  | 'hidden-right';

export interface PhotoCarouselSlideProps {
  key?: Key;
  photo: GalleryPhoto;
  index: number;
  total: number;
  relativePosition: PhotoCarouselPosition;
  isActive: boolean;
  isTransitioning: boolean;
  photoOfLabel: string;
  loadingLabel: string;
  loadErrorLabel: string;
  retryLabel: string;
  onSelect: () => void;
}
