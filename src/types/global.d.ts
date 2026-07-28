declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.css';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

/**
 * Global Shared Types & Interfaces for Villa de Leyva App
 */

export type EntityId = string;

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

export interface BaseApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Maps & Location
export interface MapMarkerType {
  id: EntityId;
  title: string;
  category: string;
  coordinates: GeoCoordinates;
  icon?: string;
  isActive?: boolean;
}

export type MapRouteMode = 'walking' | 'biking' | 'driving' | 'transit';

export interface MapRouteType {
  id: EntityId;
  name: string;
  waypoints: GeoCoordinates[];
  distanceKm: number;
  durationMinutes: number;
  mode: MapRouteMode;
}

// Augmented Reality (AR)
export interface ARTargetType {
  id: EntityId;
  title: string;
  model3dUrl?: string;
  description?: string;
  coordinates: GeoCoordinates;
  triggerDistanceMeters: number;
}

// Interactive Games & Gamification
export interface GameChallengeType {
  id: EntityId;
  title: string;
  description: string;
  rewardPoints: number;
  isCompleted: boolean;
  requiredLocation?: GeoCoordinates;
}

// Events
export interface EventType {
  id: EntityId;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  coordinates?: GeoCoordinates;
  imageUrl?: string;
  category: string;
}

// Services
export interface ServiceType {
  id: EntityId;
  name: string;
  category: 'restaurant' | 'crafts' | 'guide' | 'transport' | 'emergency' | 'bank' | 'other';
  address: string;
  phone?: string;
  whatsapp?: string;
  schedule?: string;
  rating?: number;
  imageUrl?: string;
}

// Lodging
export interface LodgingType {
  id: EntityId;
  name: string;
  type: 'hotel' | 'hostel' | 'glamping' | 'cabin' | 'apartment';
  address: string;
  pricePerNight?: number;
  rating?: number;
  amenities: string[];
  imageUrl?: string;
  bookingUrl?: string;
}

