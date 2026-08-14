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

export interface LodgingRating {
  value: number;
  scale: number;
  display: string;
  reviewCount?: number;
  source?: string;
}

export interface LodgingLocation {
  id: string;
  categoryId: LodgingCategoryId;
  categoryLabel: string;
  name: string;
  alternateName?: string;
  description?: string;
  address?: string;
  phones: string[];
  whatsapp?: string;
  instagram?: string;
  website?: string;
  cancellation?: string;
  checkIn?: string;
  checkOut?: string;
  parking?: string;
  petFriendly?: string;
  breakfast?: string;
  languages: string[];
  rating?: LodgingRating;
  lat?: number;
  lng?: number;
}

export interface LodgingDirectoryMetadata {
  updatedAt?: string;
  totalPlaces: number;
  invalidCoordinateIds: string[];
}

export type LodgingSort = 'relevance' | 'nearest' | 'rating' | 'reviews';
