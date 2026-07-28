import type { ServiceGalleryImage } from '../../types/serviceDetail.types';

export interface ServiceGalleryProps {
  images: ServiceGalleryImage[];
  serviceName: string;
}
