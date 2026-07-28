export interface RoutePointPreview {
  id: string;
  order: number;
  name: string;
  shortDescription: string;
}

export interface GameIntroduction {
  id: string;
  title: string;
  subtitle: string;
  estimatedDuration: string;
  difficulty: string;
  totalPoints: number;
  isSimulated: boolean;
  rewardDescription: string;
  points: RoutePointPreview[];
}

export type MapMode =
  | 'overview'
  | 'interactive'
  | 'route'
  | 'rewardLocation';

export interface MapLocationPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: 'historic' | 'service' | 'event' | 'reward' | 'game';
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface MapRoutePoint extends MapLocationPoint {
  order: number;
}

export type RouteProgressStatus =
  | 'notStarted'
  | 'pointActive'
  | 'pointCompleted'
  | 'routeCompleted';

export type SecretRouteStatus =
  | RouteProgressStatus
  | 'paused';

export interface SecretRoutePoint
  extends Omit<MapRoutePoint, 'id' | 'isCompleted' | 'isActive'> {
  id: number;
}
