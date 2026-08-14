export type ServiceCategoryId =
  | 'cafes'
  | 'atms'
  | 'gasStations'
  | 'health'
  | 'churches'
  | 'thingsToDo'
  | 'restaurants'
  | 'publicTransport';

export type ServiceCategoryState =
  | 'default'
  | 'selected'
  | 'disabled';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  shortLabel?: string;
  accessibilityLabel: string;
  icon: string;
  pinAsset: string;
  column: 'left' | 'right';
  order: number;
}

export interface ServiceMapPoint {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  shortDescription?: string;
  mapPosition: {
    xPercent: number;
    yPercent: number;
  };
  pinAsset: string;
  address?: string;
  schedule?: string;
  phone?: string;
  isMock: boolean;
}

export interface MapTransform {
  scale: number;
  translateX: number;
  translateY: number;
}

export interface ServicesMapState {
  selectedCategoryId: ServiceCategoryId | null;
  selectedServiceId: string | null;
  zoom: number;
  mapOffset: {
    x: number;
    y: number;
  };
}

export interface ServiceLocation {
  id: string;
  categoryId: ServiceCategoryId;
  categoryLabel: string;
  name: string;
  description?: string;
  phone?: string;
  phoneHref?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  websiteLinks?: Array<{
    label: string;
    url: string;
  }>;
  address?: string;
  schedule?: string;
  petFriendly?: boolean;
  averagePrice?: string;
  referenceRating?: string;
  images?: string[];
  lat?: number;
  lng?: number;
}

export interface ServicesDirectoryMetadata {
  updatedAt?: string;
  totalPlaces: number;
}
