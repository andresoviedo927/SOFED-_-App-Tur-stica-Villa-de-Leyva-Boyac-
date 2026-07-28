const EVENT_DETAIL_PATTERN = /^\/events\/([^/]+)$/;
const EVENT_PHOTOS_PATTERN = /^\/events\/([^/]+)\/photos$/;
const EVENT_DRONE_PATTERN = /^\/events\/([^/]+)\/drone$/;

const decodeEventSlug = (
  route: string,
  pattern: RegExp
): string | null => {
  const match = route.match(pattern);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
};

export const eventRoutes = {
  list: '/events',
  detail: (eventSlug: string) =>
    `/events/${encodeURIComponent(eventSlug)}`,
  photos: (eventSlug: string) =>
    `/events/${encodeURIComponent(eventSlug)}/photos`,
  drone: (eventSlug: string) =>
    `/events/${encodeURIComponent(eventSlug)}/drone`,
} as const;

export const parseEventDetailPath = (route: string) => {
  const eventSlug = decodeEventSlug(route, EVENT_DETAIL_PATTERN);
  return eventSlug ? { eventSlug } : null;
};

export const parseEventPhotosPath = (route: string) => {
  const eventSlug = decodeEventSlug(route, EVENT_PHOTOS_PATTERN);
  return eventSlug ? { eventSlug } : null;
};

export const parseEventDronePath = (route: string) => {
  const eventSlug = decodeEventSlug(route, EVENT_DRONE_PATTERN);
  return eventSlug ? { eventSlug } : null;
};

export const isEventDetailPath = (route: string) =>
  EVENT_DETAIL_PATTERN.test(route);

export const isEventPhotosPath = (route: string) =>
  EVENT_PHOTOS_PATTERN.test(route);

export const isEventDronePath = (route: string) =>
  EVENT_DRONE_PATTERN.test(route);

export default eventRoutes;
