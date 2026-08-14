interface GoogleMapsLocation {
  lat?: number;
  lng?: number;
  address?: string;
}

const hasValidCoordinates = (
  lat?: number,
  lng?: number
): lat is number =>
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  lat! >= -90 &&
  lat! <= 90 &&
  lng! >= -180 &&
  lng! <= 180;

export const buildGoogleMapsUrl = ({
  lat,
  lng,
  address,
}: GoogleMapsLocation) => {
  if (hasValidCoordinates(lat, lng)) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  const normalizedAddress = address?.replace(/\s+/g, ' ').trim();
  return normalizedAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(normalizedAddress)}`
    : undefined;
};

export default buildGoogleMapsUrl;
