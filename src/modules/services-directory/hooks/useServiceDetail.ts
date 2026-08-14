import { useMemo } from 'react';
import { buildGoogleMapsUrl } from '@/utils/googleMaps';
import { getServiceGallerySources } from '../data/serviceGalleryImages';
import type {
  ServiceAttribute,
  ServiceContact,
  ServiceDetail,
  ServiceGalleryImage,
} from '../types/serviceDetail.types';
import type {
  ServiceCategoryId,
  ServiceLocation,
} from '../types/services.types';
import useServiceLocations from './useServiceLocations';

const socialHandle = (url: string) => {
  try {
    const profile = new URL(url).pathname.split('/').filter(Boolean)[0];
    return profile ? `@${decodeURIComponent(profile)}` : url;
  } catch {
    return url;
  }
};

const formatPhone = (phone: string) => {
  const rawDigits = phone.replace(/\D/g, '');
  if (rawDigits.startsWith('018000')) {
    return `01 8000 ${rawDigits.slice(6)}`;
  }
  const digits = rawDigits.replace(/^57/, '');
  if (digits.length === 10) {
    return `+57 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return phone;
};

const createContacts = (location: ServiceLocation): ServiceContact[] => {
  const contacts: ServiceContact[] = [];

  if (location.whatsapp) {
    contacts.push({
      type: 'whatsapp',
      label: 'WhatsApp',
      value: formatPhone(`+${location.whatsapp}`),
      url: `https://wa.me/${location.whatsapp}`,
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
  const website = location.websiteLinks?.[0];
  if (website) {
    contacts.push({
      type: 'website',
      label: 'Sitio web',
      value: website.label,
      url: website.url,
    });
  }

  return contacts;
};

const minutesFromTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const normalizeAddress = (address: string) => {
  const normalized = address.replace(/\s+/g, ' ').trim();

  if (
    /^Sector Plaza Mayor,\s*Carrera 10 entre calles 12 y 13,\s*Villa de Leyva\s*[:;,.]?\s*confirmar numeración en el localizador oficial\.?$/i.test(
      normalized
    )
  ) {
    return 'Carrera 10 entre calles 12 y 13';
  }
  if (
    /^Calle 4 #1A-37,\s*Sáchica,\s*Boyacá;\s*aproximadamente 15 minutos de Villa de Leyva$/i.test(
      normalized
    )
  ) {
    return 'Calle 4 #1A-37, Sáchica, Boyacá; aprox. 15 minutos de Villa de Leyva';
  }
  if (
    /^Zona rural de Sutamarchán,\s*aproximadamente 8-10 km de Villa de Leyva$/i.test(
      normalized
    )
  ) {
    return 'Zona rural de Sutamarchán, aprox. 8-10 km de Villa de Leyva';
  }

  const cleaned = address
    .replace(/,\s*Villa de Leyva\s*\.?$/i, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ',')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\s,]+$/g, '')
    .trim();

  return cleaned || undefined;
};

const summarizeSchedule = (schedule: string) => {
  const normalized = schedule.replace(/\s+/g, ' ').trim();

  if (
    /^Acceso del cajero sujeto a la sede;\s*consultar en el localizador oficial antes de desplazarse\.?$/i.test(
      normalized
    )
  ) {
    return 'Sujeto a la sede';
  }
  if (
    /^Cajero reportado 24 horas;\s*la oficina bancaria maneja horario distinto\.?$/i.test(
      normalized
    )
  ) {
    return '24 horas';
  }
  if (
    /^Operación reportada en jornada continua;\s*confirmar disponibilidad y servicios directamente con la red Terpel\.?$/i.test(
      normalized
    )
  ) {
    return 'Jornada continua';
  }
  if (
    /^Atención 24 horas reportada en directorios;\s*confirmar por teléfono, especialmente en horario nocturno\.?$/i.test(
      normalized
    )
  ) {
    return '24 horas';
  }
  if (
    /^Atención turística normalmente entre 10[:.]00 y 17:00;\s*reserva recomendada y horario sujeto al tipo de experiencia\.?$/i.test(
      normalized
    )
  ) {
    return 'Entre 10.00 y 17:00';
  }

  if (
    /(?:horario\s+)?no\s+(?:est[aá]\s+)?(?:publicado|disponible)|sin\s+horario/i.test(
      normalized
    )
  ) {
    return undefined;
  }
  if (/urgencias?\s*:?\s*24\s*horas?/i.test(normalized)) {
    return 'Urgencias 24 horas';
  }
  if (
    /acceso\s+(?:reportado\s+)?24\s*horas?/i.test(normalized) &&
    /sujeto\s+a\s+disponibilidad/i.test(normalized)
  ) {
    return '24 horas';
  }
  if (/horario\s+comercial\s+sujeto\s+a(?:\s+la)?\s+sede/i.test(normalized)) {
    return 'Horario sujeto a sede';
  }

  const ranges = [
    ...normalized.matchAll(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/g),
  ];
  if (!ranges.length) {
    return normalized || undefined;
  }

  const starts = ranges.map((range) => range[1]);
  const ends = ranges.map((range) => range[2]);
  const earliest = starts.reduce((selected, time) =>
    minutesFromTime(time) < minutesFromTime(selected) ? time : selected
  );
  const latest = ends.reduce((selected, time) =>
    minutesFromTime(time) > minutesFromTime(selected) ? time : selected
  );
  return `${earliest}–${latest}`;
};

const summarizePrice = (price: string) => {
  const amounts = [...price.matchAll(/\d[\d.]*\d|\d+/g)].map(
    (match) => match[0]
  );
  if (!amounts.length) return undefined;
  const range = amounts.length > 1
    ? `$${amounts[0]}–${amounts[1]}`
    : `$${amounts[0]}`;
  return `Precio prom. ${range}`;
};

const summarizeRating = (rating: string) =>
  rating.match(/\d(?:[.,]\d)?\s*\/\s*5/)?.[0]?.replace(/\s/g, '');

const createAttributes = (location: ServiceLocation): ServiceAttribute[] => {
  const attributes: ServiceAttribute[] = [];

  if (location.address) {
    const address = normalizeAddress(location.address);
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
  if (location.schedule) {
    const schedule = summarizeSchedule(location.schedule);
    if (schedule) {
      attributes.push({
        id: 'schedule',
        label: '',
        value: schedule,
        fullValue: location.schedule,
        icon: '🕒',
      });
    }
  }
  if (location.petFriendly === true) {
    attributes.push({
      id: 'pet-friendly',
      label: '',
      value: 'Petfriendly',
      icon: '🐾',
    });
  }
  if (location.averagePrice) {
    const shortPrice = summarizePrice(location.averagePrice);
    if (shortPrice) {
      attributes.push({
        id: 'average-price',
        label: '',
        value: shortPrice,
        fullValue: location.averagePrice,
        icon: '💰',
      });
    }
  }
  if (location.referenceRating) {
    const shortRating = summarizeRating(location.referenceRating);
    if (shortRating) {
      attributes.push({
        id: 'reference-rating',
        label: '',
        value: shortRating,
        fullValue: location.referenceRating,
        icon: '⭐',
      });
    }
  }

  return attributes;
};

const createGallery = (location: ServiceLocation): ServiceGalleryImage[] => {
  const localSources = getServiceGallerySources(location.id);
  const sources = (location.images?.length && location.images.length >= 3
    ? location.images
    : localSources
  ).slice(0, 4);

  return sources.map((src, index) => ({
    id: `${location.id}-photo-${index + 1}`,
    src,
    alt: `Fotografía ${index + 1} de ${location.name}`,
  }));
};

const createServiceDetail = (location: ServiceLocation): ServiceDetail => ({
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

export const useServiceDetail = (
  categoryId: string | null,
  serviceId: string | null
) => {
  const { locations, loading, error } = useServiceLocations();
  const service = useMemo(() => {
    const currentLocation = locations.find(
      (candidate) =>
        candidate.id === serviceId &&
        candidate.categoryId === (categoryId as ServiceCategoryId)
    );
    return currentLocation ? createServiceDetail(currentLocation) : null;
  }, [categoryId, locations, serviceId]);

  return { service, loading, error, isFound: service !== null };
};

export default useServiceDetail;
