import type { Key } from 'react';
import type { GalleryPhoto } from '../../types/gallery.types';

export interface PhotoCarouselSlideProps {
  key?: Key;
  photo: GalleryPhoto;
  index: number;
  total: number;
  distanceFromActive: number;
  photoOfLabel: string;
  loadingLabel: string;
  loadErrorLabel: string;
  retryLabel: string;
}
