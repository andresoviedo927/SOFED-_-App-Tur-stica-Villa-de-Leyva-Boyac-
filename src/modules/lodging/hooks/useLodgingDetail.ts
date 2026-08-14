import { useMemo } from 'react';
import IMAGES from '@/assets/images';
import { buildGoogleMapsUrl } from '@/utils/googleMaps';
import type {
  ServiceAttribute,
  ServiceContact,
  ServiceDetail,
  ServiceGalleryImage,
} from '@/modules/services-directory/types/serviceDetail.types';
import type {
  LodgingCategoryId,
  LodgingLocation,
} from '../types/lodging.types';
import useLodgingLocations from './useLodgingLocations';

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '').replace(/^57/, '');
  return digits.length === 10
    ? `+57 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    : phone;
};

const socialHandle = (url: string) => {
  try {
    const profile = new URL(url).pathname.split('/').filter(Boolean)[0];
    return profile ? `@${decodeURIComponent(profile)}` : url;
  } catch {
    return url;
  }
};

const isAffirmative = (value?: string) => {
  if (!value) return false;
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
  return /^si(?:$|[\s,;])/i.test(normalized);
};

const conciseAddress = (address: string) =>
  address
    .replace(
      /^Aproximadamente 500 metros por la vía Cementerio\s*[–—-]\s*Arcabuco(?:,\s*Villa de Leyva,\s*Boyacá)?$/i,
      'Aprox. 500 metros por la vía Cementerio - Arcabuco'
    )
    .replace(
      /^Frente a La Periquera,\s*vía Pozo de la Vieja,\s*aproximadamente 16 km de la Plaza Mayor de Villa de Leyva,\s*Boyacá$/i,
      'Frente a La Periquera, vía Pozo de la Vieja; aprox. 16 km de la Plaza Mayor'
    )
    .replace(/,\s*Villa de Leyva,\s*Boyacá\s*$/i, '')
    .replace(/,\s*Villa de Leyva\s*$/i, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\s,]+$/g, '')
    .trim();

const timeValue = (value: string) =>
  value.match(/\d{1,2}:\d{2}(?:\s*a\s*\d{1,2}:\d{2})?/i)?.[0] ?? value;

const createContacts = (location: LodgingLocation): ServiceContact[] => {
  const contacts: ServiceContact[] = [];
  const whatsappDigits = location.whatsapp?.replace(/\D/g, '');

  if (location.whatsapp && whatsappDigits) {
    contacts.push({
      type: 'whatsapp',
      label: 'WhatsApp',
      value: formatPhone(location.whatsapp),
      url: `https://wa.me/${whatsappDigits}`,
    });
  } else if (location.phones[0]) {
    contacts.push({
      type: 'phone',
      label: 'Teléfono',
      value: formatPhone(location.phones[0]),
      url: `tel:${location.phones[0].replace(/[^\d+]/g, '')}`,
    });
  }
  if (location.instagram) {
    contacts.push({
      type: 'instagram',
      label: 'Instagram',
      value: socialHandle(location.instagram),
      url: location.instagram,
    });
  }
  if (location.website) {
    contacts.push({
      type: 'website',
      label: 'Sitio web',
      value: 'Página web',
      url: location.website,
    });
  }

  return contacts;
};

const createAttributes = (location: LodgingLocation): ServiceAttribute[] => {
  const attributes: ServiceAttribute[] = [];

  if (location.address) {
    const address = conciseAddress(location.address);
    const googleMapsUrl = buildGoogleMapsUrl({
      lat: location.lat,
      lng: location.lng,
      address: location.address,
    });
    if (address && googleMapsUrl) {
      attributes.push({
        id: 'location',
        label: '',
        value: address,
        fullValue: location.address,
        icon: '📍',
        action: 'openLink',
        url: googleMapsUrl,
      });
    }
  }
  if (location.checkIn) {
    attributes.push({
      id: 'check-in',
      label: '',
      value: `Check-in ${timeValue(location.checkIn)}`,
      fullValue: location.checkIn,
      icon: '🕒',
    });
  }
  if (location.checkOut) {
    attributes.push({
      id: 'check-out',
      label: '',
      value: `Check-out ${timeValue(location.checkOut)}`,
      fullValue: location.checkOut,
      icon: '🕒',
    });
  }
  if (isAffirmative(location.petFriendly)) {
    attributes.push({
      id: 'pet-friendly',
      label: '',
      value: 'Petfriendly',
      fullValue: location.petFriendly,
      icon: '🐾',
    });
  }
  if (isAffirmative(location.parking)) {
    attributes.push({
      id: 'parking',
      label: '',
      value: 'Parqueadero',
      fullValue: location.parking,
      icon: '🅿️',
    });
  }
  if (isAffirmative(location.breakfast)) {
    attributes.push({
      id: 'breakfast',
      label: '',
      value: 'Desayuno incluido',
      fullValue: location.breakfast,
      icon: '☕',
    });
  }
  if (isAffirmative(location.cancellation)) {
    attributes.push({
      id: 'cancellation',
      label: '',
      value: 'Cancelación gratuita',
      fullValue: location.cancellation,
      icon: '✓',
    });
  }
  if (location.languages.length > 0) {
    attributes.push({
      id: 'languages',
      label: '',
      value: location.languages.join(', '),
      icon: '🌐',
    });
  }
  if (location.rating) {
    attributes.push({
      id: 'rating',
      label: '',
      value: location.rating.display.replace('.', ','),
      fullValue: location.rating.source,
      icon: '⭐',
    });
  }

  return attributes;
};

const createGallery = (location: LodgingLocation): ServiceGalleryImage[] => {
  const sources = IMAGES.lodging.galleryPlaceholders[location.categoryId];

  return sources.map((src, index) => ({
    id: `${location.id}-photo-${index + 1}`,
    src,
    alt: `Fotografía ${index + 1} de ${location.name}`,
  }));
};

const createLodgingDetail = (location: LodgingLocation): ServiceDetail => ({
  id: location.id,
  categoryId: location.categoryId,
  name: location.name,
  description: location.description ?? '',
  contacts: createContacts(location),
  attributes: createAttributes(location),
  gallery: createGallery(location),
  mapPointId: location.id,
  isMock: false,
});

export const useLodgingDetail = (
  categoryId: string | null,
  lodgingId: string | null
) => {
  const { locations, loading, error } = useLodgingLocations();
  const lodging = useMemo(() => {
    const currentLocation = locations.find(
      (candidate) =>
        candidate.id === lodgingId &&
        candidate.categoryId === (categoryId as LodgingCategoryId)
    );
    return currentLocation ? createLodgingDetail(currentLocation) : null;
  }, [categoryId, locations, lodgingId]);

  return { lodging, loading, error, isFound: lodging !== null };
};

export default useLodgingDetail;
