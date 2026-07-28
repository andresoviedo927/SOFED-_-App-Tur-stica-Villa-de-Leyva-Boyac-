import TEXTS from '@/constants/texts';
import type { SecretRoutePoint } from '../types/game.types';

const pointTexts = TEXTS.games.secretPlazaRoute.points;

/** Fixed mock data used only to render the guided prototype route. */
export const SECRET_ROUTE_POINTS: readonly SecretRoutePoint[] = [
  {
    id: 1,
    order: 1,
    name: pointTexts[0].name,
    latitude: 5.63345,
    longitude: -73.52525,
    category: 'game',
    description: pointTexts[0].description,
  },
  {
    id: 2,
    order: 2,
    name: pointTexts[1].name,
    latitude: 5.6331,
    longitude: -73.52465,
    category: 'game',
    description: pointTexts[1].description,
  },
  {
    id: 3,
    order: 3,
    name: pointTexts[2].name,
    latitude: 5.63265,
    longitude: -73.5251,
    category: 'game',
    description: pointTexts[2].description,
  },
  {
    id: 4,
    order: 4,
    name: pointTexts[3].name,
    latitude: 5.6327,
    longitude: -73.524,
    category: 'game',
    description: pointTexts[3].description,
  },
  {
    id: 5,
    order: 5,
    name: pointTexts[4].name,
    latitude: 5.63345,
    longitude: -73.5241,
    category: 'game',
    description: pointTexts[4].description,
  },
] as const;

export const SECRET_ROUTE_TOTAL_POINTS = SECRET_ROUTE_POINTS.length;
