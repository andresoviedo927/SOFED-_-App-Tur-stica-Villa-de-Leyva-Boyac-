/**
 * Application Routes Constants
 */
import {
  eventRoutes,
  isEventDetailPath,
  isEventDronePath,
  isEventPhotosPath,
  parseEventDetailPath,
  parseEventDronePath,
  parseEventPhotosPath,
} from '@/modules/events/constants/eventRoutes';

export const ROUTES = {
  HOME: '/',
  INTERACTIVE: '/interactive',
  PLAZA_PRINCIPAL: '/interactive/plaza-principal',
  PLAZA_PRINCIPAL_GAME: '/interactive/plaza-principal/game',
  PLAZA_PRINCIPAL_GAME_ROUTE:
    '/interactive/plaza-principal/game/route',
  PLAZA_PRINCIPAL_READING: '/interactive/plaza-principal/reading',
  PLAZA_PRINCIPAL_GALLERY: '/interactive/plaza-principal/gallery',
  PLAZA_PRINCIPAL_GALLERY_PHOTOS:
    '/interactive/plaza-principal/gallery/photos',
  PLAZA_PRINCIPAL_GALLERY_PANORAMA:
    '/interactive/plaza-principal/gallery/panorama',
  PLAZA_PRINCIPAL_GALLERY_DRONE:
    '/interactive/plaza-principal/gallery/drone',
  PLAZA_PRINCIPAL_AR:
    '/interactive/plaza-principal/augmented-reality',
  SERVICES: '/services',
  LODGING: '/lodging',
  EVENTS: '/events',
  GAMES: '/games',
  AUGMENTED_REALITY: '/ar',
  SETTINGS: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

const SERVICE_DETAIL_PATTERN =
  /^\/services\/([^/]+)\/([^/]+)$/;
const LODGING_DETAIL_PATTERN =
  /^\/lodging\/([^/]+)\/([^/]+)$/;

export const createServiceDetailRoute = (
  categoryId: string,
  serviceId: string
) =>
  `${ROUTES.SERVICES}/${encodeURIComponent(
    categoryId
  )}/${encodeURIComponent(serviceId)}`;

export const parseServiceDetailRoute = (route: string) => {
  const match = route.match(SERVICE_DETAIL_PATTERN);
  if (!match) return null;
  try {
    return {
      categoryId: decodeURIComponent(match[1]),
      serviceId: decodeURIComponent(match[2]),
    };
  } catch {
    return null;
  }
};

export const isServiceDetailRoute = (route: string) =>
  SERVICE_DETAIL_PATTERN.test(route);

export const createLodgingDetailRoute = (
  categoryId: string,
  lodgingId: string
) =>
  `${ROUTES.LODGING}/${encodeURIComponent(
    categoryId
  )}/${encodeURIComponent(lodgingId)}`;

export const parseLodgingDetailRoute = (route: string) => {
  const match = route.match(LODGING_DETAIL_PATTERN);
  if (!match) return null;

  try {
    return {
      categoryId: decodeURIComponent(match[1]),
      lodgingId: decodeURIComponent(match[2]),
    };
  } catch {
    return null;
  }
};

export const isLodgingDetailRoute = (route: string) =>
  LODGING_DETAIL_PATTERN.test(route);

export const createEventDetailRoute = (eventSlug: string) =>
  eventRoutes.detail(eventSlug);

export const parseEventDetailRoute = parseEventDetailPath;

export const isEventDetailRoute = (route: string) =>
  isEventDetailPath(route);

export const createEventPhotosRoute = (eventSlug: string) =>
  eventRoutes.photos(eventSlug);

export const parseEventPhotosRoute = parseEventPhotosPath;

export const isEventPhotosRoute = (route: string) =>
  isEventPhotosPath(route);

export const createEventDroneRoute = (eventSlug: string) =>
  eventRoutes.drone(eventSlug);

export const parseEventDroneRoute = parseEventDronePath;

export const isEventDroneRoute = (route: string) =>
  isEventDronePath(route);

export default ROUTES;
