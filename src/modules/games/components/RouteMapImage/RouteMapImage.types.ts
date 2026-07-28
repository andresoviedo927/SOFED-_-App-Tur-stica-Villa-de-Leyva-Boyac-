import type { SecretRouteStatus } from '../../types/game.types';

export interface RouteMapImageProps {
  status: SecretRouteStatus;
  completedPoints: number;
  activePoint: number;
  alt: string;
  scale?: number;
}

