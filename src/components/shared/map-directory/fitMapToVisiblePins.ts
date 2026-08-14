import { latLngBounds, type Map as LeafletMap } from 'leaflet';

export interface VisibleMapPin {
  lat: number;
  lng: number;
}

const DEFAULT_PADDING: [number, number] = [52, 52];
const SINGLE_PIN_ZOOM = 16;

export const fitMapToVisiblePins = (
  map: LeafletMap,
  pins: VisibleMapPin[]
) => {
  if (pins.length === 0) return;

  map.stop();

  if (pins.length === 1) {
    map.flyTo(
      [pins[0].lat, pins[0].lng],
      Math.min(SINGLE_PIN_ZOOM, map.getMaxZoom()),
      { duration: 0.45 }
    );
    return;
  }

  map.fitBounds(
    latLngBounds(pins.map((pin) => [pin.lat, pin.lng])),
    {
      padding: DEFAULT_PADDING,
      maxZoom: SINGLE_PIN_ZOOM,
      animate: true,
      duration: 0.45,
    }
  );
};

export default fitMapToVisiblePins;
