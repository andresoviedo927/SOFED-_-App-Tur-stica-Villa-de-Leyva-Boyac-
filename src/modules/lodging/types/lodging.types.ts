import type {
  MapCategoryState,
  MapDirectoryCategory,
  MapDirectoryPoint,
} from '@/components/shared/map-directory';

export type LodgingCategoryId = 'hotels' | 'cabins' | 'camping';
export type LodgingCategoryState = MapCategoryState;

export interface LodgingCategory extends MapDirectoryCategory {
  id: LodgingCategoryId;
  pinAsset: string;
  order: number;
}

export interface LodgingMapPoint extends MapDirectoryPoint {
  categoryId: LodgingCategoryId;
  address?: string;
  priceRange?: string;
  highlight?: string;
}

export interface LodgingMapState {
  selectedCategoryId: LodgingCategoryId | null;
  selectedLodgingId: string | null;
  zoom: number;
  mapOffset: {
    x: number;
    y: number;
  };
}
