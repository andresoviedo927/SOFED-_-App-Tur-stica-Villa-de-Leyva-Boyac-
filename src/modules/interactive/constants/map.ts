export const MAP_ZOOM_LEVELS = [
  1,
  1.2,
  1.4,
  1.6,
  1.8,
  2,
  2.2,
  2.4,
] as const;

export const MAP_MIN_ZOOM = MAP_ZOOM_LEVELS[0];
export const MAP_MAX_ZOOM =
  MAP_ZOOM_LEVELS[MAP_ZOOM_LEVELS.length - 1];
