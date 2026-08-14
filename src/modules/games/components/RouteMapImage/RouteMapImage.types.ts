import type { SecretRouteStatus } from '../../types/game.types';

export interface RouteMapImageProps {
  status: SecretRouteStatus;
  completedPoints: number;
  activePoint: number;
  characterPoint: number;
  alt: string;
  scale?: number;
  onPointSelect?: (pointId: number) => void;
}
