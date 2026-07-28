import type { GalleryPhoto } from '../../types/gallery.types';

export interface PhotoCarouselProps {
  photos: GalleryPhoto[];
  carouselLabel: string;
  photoOfLabel: string;
  loadingLabel: string;
  loadErrorLabel: string;
  retryLabel: string;
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
}
