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
