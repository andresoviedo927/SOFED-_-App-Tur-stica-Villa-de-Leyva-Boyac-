export interface ServiceContact {
  type:
    | 'whatsapp'
    | 'phone'
    | 'instagram'
    | 'facebook'
    | 'website'
    | 'email';
  label: string;
  value: string;
  url?: string;
}

export interface ServiceAttribute {
  id: string;
  label: string;
  value: string;
  icon?: string;
  action?: 'showOnMap' | 'openLink';
  url?: string;
  fullValue?: string;
}

export interface ServiceGalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ServiceDetail {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  contacts: ServiceContact[];
  attributes: ServiceAttribute[];
  gallery: ServiceGalleryImage[];
  mapPointId: string;
  isMock: boolean;
}

export type ServiceGalleryStatus = 'loading' | 'ready' | 'error';

export interface ServiceDetailState {
  service: ServiceDetail | null;
  activeImageIndex: number;
  galleryStatus: ServiceGalleryStatus;
  errorMessage: string | null;
}
