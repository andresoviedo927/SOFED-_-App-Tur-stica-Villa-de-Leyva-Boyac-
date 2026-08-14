import type { ServiceGalleryImage } from '../../types/serviceDetail.types';

export interface ServiceGalleryProps {
  images: ServiceGalleryImage[];
  serviceName: string;
  className?: string;
  transitionMode?: 'fade' | 'horizontal';
}
