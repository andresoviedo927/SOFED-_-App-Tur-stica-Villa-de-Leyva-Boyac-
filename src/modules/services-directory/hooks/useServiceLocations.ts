import { useEffect, useMemo, useState } from 'react';
import type {
  ServiceCategoryId,
  ServiceLocation,
  ServicesDirectoryMetadata,
} from '../types/services.types';

interface RawPlace {
  nombre?: unknown;
  telefono_whatsapp?: unknown;
  instagram?: unknown;
  facebook?: unknown;
  pagina_web?: unknown;
  sitio_web?: unknown;
  website?: unknown;
  web?: unknown;
  correo?: unknown;
  email?: unknown;
  descripcion_corta?: unknown;
  ubicacion?: unknown;
  horarios?: unknown;
  petfriendly?: unknown;
  precio_promedio?: unknown;
  calificacion_referencia?: unknown;
  fuentes?: unknown;
  imagen?: unknown;
  imagenes?: unknown;
  foto?: unknown;
  fotos?: unknown;
  galeria?: unknown;
  lat?: unknown;
  lng?: unknown;
  latitud?: unknown;
  longitud?: unknown;
}

interface RawCategory {
  id?: unknown;
  nombre?: unknown;
  lugares?: unknown;
}

interface RawServicesFile {
  metadata?: {
    fecha_actualizacion?: unknown;
  };
  servicios?: unknown;
}

interface GeoRecord {
  id?: unknown;
  lat?: unknown;
  lng?: unknown;
}

const CATEGORY_MAP: Record<string, ServiceCategoryId> = {
  cafeteria: 'cafes',
  iglesias: 'churches',
  cajeros_automaticos: 'atms',
  que_hacer: 'thingsToDo',
  gasolineria: 'gasStations',
  restaurantes: 'restaurants',
  hospitales_farmacias: 'health',
  transporte_publico: 'publicTransport',
};

const meaningfulText = (value: unknown) => {
  if (typeof value !== 'string') return undefined;
  const text = value.trim();
  if (
    !text ||
    /^(?:no aplica|n\/?a|na|null|undefined|sin informaci[oó]n|no disponible|no registra|no tiene)$/i.test(
      text
    )
  ) {
    return undefined;
  }
  if (/^no se (?:encontr[oó]|hall[oó])/i.test(text)) return undefined;
  return text;
};

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const stableId = (categoryId: string, name: string) =>
  `${categoryId}-${slugify(name)}`;

const phoneMatches = (value: string | undefined) => {
  if (!value) return [];
  return [
    ...value.matchAll(
      /(?:01\s*8000\s*\d{6}|(?:\+?57\s*)?(?:60[1-8]\s*)?(?:3\d{2}|\d{3})[\s-]*\d{3}[\s-]*\d{4})/g
    ),
  ].map((match) => match[0]);
};

const normalizePhone = (value: string | undefined) => {
  const [match] = phoneMatches(value);
  if (!match) return undefined;
  const digits = match.replace(/\D/g, '');
  if (digits.startsWith('018000')) return digits;
  return digits.startsWith('57') ? `+${digits}` : `+57${digits}`;
};

const normalizeWhatsapp = (value: string | undefined) => {
  if (!value) return undefined;
  const candidates = phoneMatches(value).filter((phone) => {
    const national = phone.replace(/\D/g, '').replace(/^57/, '');
    return national.startsWith('3') && national.length === 10;
  });
  const preferred = /whatsapp/i.test(value)
    ? candidates.at(-1)
    : candidates[0];
  if (!preferred) return undefined;
  const digits = preferred.replace(/\D/g, '');
  return digits.startsWith('57') ? digits : `57${digits}`;
};

const normalizeUrl = (value: unknown) => {
  const text = meaningfulText(value);
  if (!text) return undefined;
  const candidate = /^https?:\/\//i.test(text)
    ? text
    : /^www\./i.test(text)
      ? `https://${text}`
      : undefined;
  if (!candidate) return undefined;
  try {
    return new URL(candidate).toString();
  } catch {
    return undefined;
  }
};

const normalizeSocialUrl = (
  value: unknown,
  network: 'instagram' | 'facebook'
) => {
  const directUrl = normalizeUrl(value);
  if (directUrl) return directUrl;
  const text = meaningfulText(value)?.replace(/^@/, '');
  return text ? `https://www.${network}.com/${text}/` : undefined;
};

const normalizeEmail = (...values: unknown[]) => {
  for (const value of values) {
    const text = meaningfulText(value);
    const email = text?.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0];
    if (email) return email;
  }
  return undefined;
};

const normalizeBoolean = (value: unknown) => {
  if (typeof value === 'boolean') return value;
  const text = meaningfulText(value)?.toLowerCase();
  if (!text) return undefined;
  if (/^(?:sí|si|true|1|yes)(?:\s|[;,.:-]|$)/.test(text)) return true;
  if (/^(?:no|false|0)(?:\s|[;,.:-]|$)/.test(text)) return false;
  return undefined;
};

const normalizeUrlList = (...values: unknown[]) => {
  const candidates = values.flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );
  return [
    ...new Set(
      candidates
        .map(normalizeUrl)
        .filter((url): url is string => Boolean(url))
    ),
  ];
};

const websiteLabel = (url: string) => {
  const hostname = new URL(url).hostname.replace(/^www\./, '');
  if (hostname.includes('tripadvisor.')) return 'Tripadvisor';
  if (hostname.includes('restaurantguru.')) return 'Restaurant Guru';
  if (hostname.includes('waze.')) return 'Waze';
  if (hostname.includes('google.')) return 'Google';
  if (hostname.includes('gov.co')) return 'Sitio oficial';
  return 'Sitio web';
};

const normalizeImages = (...values: unknown[]) => {
  const normalized = values.flatMap((value) => {
    if (typeof value === 'string') return [value.trim()];
    if (!Array.isArray(value)) return [];
    return value.flatMap((item) => {
      if (typeof item === 'string') return [item.trim()];
      if (!item || typeof item !== 'object') return [];
      const candidate = item as Record<string, unknown>;
      const source = candidate.src ?? candidate.url ?? candidate.imagen;
      return typeof source === 'string' ? [source.trim()] : [];
    });
  });
  return [...new Set(normalized.filter(Boolean))];
};

const isCoordinate = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const normalizeServices = (
  raw: RawServicesFile,
  geoRecords: GeoRecord[]
): { locations: ServiceLocation[]; metadata: ServicesDirectoryMetadata } => {
  const coordinates = new Map(
    geoRecords
      .filter(
        (record) =>
          typeof record.id === 'string' &&
          isCoordinate(record.lat) &&
          isCoordinate(record.lng)
      )
      .map((record) => [
        record.id as string,
        { lat: record.lat as number, lng: record.lng as number },
      ])
  );
  const seen = new Set<string>();
  const locations: ServiceLocation[] = [];
  const categories = Array.isArray(raw.servicios)
    ? (raw.servicios as RawCategory[])
    : [];

  categories.forEach((category) => {
    const sourceCategoryId = meaningfulText(category.id);
    const categoryId = sourceCategoryId
      ? CATEGORY_MAP[sourceCategoryId]
      : undefined;
    if (!sourceCategoryId || !categoryId || !Array.isArray(category.lugares)) {
      console.warn('Categoría de servicios omitida por formato inválido.', category);
      return;
    }

    const categoryLabel = meaningfulText(category.nombre) ?? sourceCategoryId;
    (category.lugares as RawPlace[]).forEach((place) => {
      const name = meaningfulText(place.nombre);
      if (!name) return;
      const id = stableId(sourceCategoryId, name);
      if (seen.has(id)) return;
      seen.add(id);

      const contact = meaningfulText(place.telefono_whatsapp);
      const inlineLat = isCoordinate(place.lat)
        ? place.lat
        : isCoordinate(place.latitud)
          ? place.latitud
          : undefined;
      const inlineLng = isCoordinate(place.lng)
        ? place.lng
        : isCoordinate(place.longitud)
          ? place.longitud
          : undefined;
      const geo = coordinates.get(id);
      const images = normalizeImages(
        place.imagenes,
        place.fotos,
        place.galeria,
        place.imagen,
        place.foto
      );
      const sourceUrls = normalizeUrlList(
        place.fuentes,
        place.pagina_web,
        place.sitio_web,
        place.website,
        place.web
      );
      const explicitInstagram = normalizeSocialUrl(place.instagram, 'instagram');
      const explicitFacebook = normalizeSocialUrl(place.facebook, 'facebook');
      const instagram =
        explicitInstagram ?? sourceUrls.find((url) => /instagram\.com/i.test(url));
      const facebook =
        explicitFacebook ?? sourceUrls.find((url) => /facebook\.com/i.test(url));
      const websiteLinks = sourceUrls
        .filter((url) => !/(?:instagram|facebook)\.com/i.test(url))
        .map((url) => ({ label: websiteLabel(url), url }));

      locations.push({
        id,
        categoryId,
        categoryLabel,
        name,
        description: meaningfulText(place.descripcion_corta),
        phone: normalizePhone(contact) ? contact : undefined,
        phoneHref: normalizePhone(contact),
        whatsapp: normalizeWhatsapp(contact),
        instagram,
        facebook,
        email: normalizeEmail(place.correo, place.email),
        websiteLinks: websiteLinks.length ? websiteLinks : undefined,
        address: meaningfulText(place.ubicacion),
        schedule: meaningfulText(place.horarios),
        petFriendly: normalizeBoolean(place.petfriendly),
        averagePrice: meaningfulText(place.precio_promedio),
        referenceRating: meaningfulText(place.calificacion_referencia),
        images: images.length ? images : undefined,
        lat: inlineLat ?? geo?.lat,
        lng: inlineLng ?? geo?.lng,
      });
    });
  });

  return {
    locations,
    metadata: {
      updatedAt: meaningfulText(raw.metadata?.fecha_actualizacion),
      totalPlaces: locations.length,
    },
  };
};

export const useServiceLocations = () => {
  const [locations, setLocations] = useState<ServiceLocation[]>([]);
  const [metadata, setMetadata] = useState<ServicesDirectoryMetadata>({
    totalPlaces: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, '/');

    Promise.all([
      fetch(`${baseUrl}data/Servicios.json`, { signal: controller.signal }),
      fetch(`${baseUrl}data/ServiciosGeo.json`, { signal: controller.signal }),
    ])
      .then(async ([servicesResponse, geoResponse]) => {
        if (!servicesResponse.ok || !geoResponse.ok) {
          throw new Error('No fue posible cargar los datos de servicios.');
        }
        const [services, geo] = await Promise.all([
          servicesResponse.json() as Promise<RawServicesFile>,
          geoResponse.json() as Promise<{ ubicaciones?: GeoRecord[] }>,
        ]);
        return normalizeServices(
          services,
          Array.isArray(geo.ubicaciones) ? geo.ubicaciones : []
        );
      })
      .then((result) => {
        setLocations(result.locations);
        setMetadata(result.metadata);
        setError(null);
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return;
        }
        setError('No pudimos cargar los servicios. Intenta nuevamente.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return useMemo(
    () => ({ locations, metadata, loading, error }),
    [error, loading, locations, metadata]
  );
};

export default useServiceLocations;
