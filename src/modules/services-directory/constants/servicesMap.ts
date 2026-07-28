export const SERVICES_MAP_CONFIG = {
  center: {
    locationId: 'villa-de-leyva-center',
    label: 'Centro de Villa de Leyva',
  },
  initialZoom: 1,
  minZoom: 1,
  maxZoom: 3,
  zoomStep: 0.25,
  maxPanAtInitialZoom: 36,
  maxPanPerZoomLevel: 92,
} as const;

export default SERVICES_MAP_CONFIG;
