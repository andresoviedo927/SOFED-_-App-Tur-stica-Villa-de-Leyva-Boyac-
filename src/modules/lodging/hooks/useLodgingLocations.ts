import { useEffect, useState } from 'react';
import type {
  LodgingCategoryId,
  LodgingDirectoryMetadata,
  LodgingLocation,
  LodgingRating,
} from '../types/lodging.types';

interface RawCoordinates {
  latitud?: unknown;
  longitud?: unknown;
}

interface RawRelevance {
  plataforma?: unknown;
  plataformas?: unknown;
  calificacion?: unknown;
  cantidad_resenas?: unknown;
  cantidad_resenas_booking?: unknown;
  cantidad_resenas_verificadas?: unknown;
}

interface RawLodging {
  id?: unknown;
  nombre?: unknown;
  nombre_alternativo?: unknown;
  descripcion_corta?: unknown;
  ubicacion?: unknown;
  telefono?: unknown;
  telefonos_adicionales?: unknown;
  whatsapp?: unknown;
  instagram?: unknown;
  sitio_web?: unknown;
  cancelacion_gratuita?: unknown;
  check_in?: unknown;
  check_out?: unknown;
  parqueadero?: unknown;
  petfriendly?: unknown;
  desayuno_incluido?: unknown;
  idiomas_atencion?: unknown;
  relevancia?: RawRelevance;
  coordenadas?: RawCoordinates;
}

interface RawGroup {
  tipo?: unknown;
  hospedajes?: unknown;
}

interface RawPayload {
  metadata?: {
    fecha_consulta?: unknown;
    cantidad_total?: unknown;
  };
  tipos_hospedaje?: unknown;
}

interface LodgingLocationsState {
  locations: LodgingLocation[];
  metadata: LodgingDirectoryMetadata;
  loading: boolean;
  error: string | null;
}

const EMPTY_METADATA: LodgingDirectoryMetadata = {
  totalPlaces: 0,
  invalidCoordinateIds: [],
};

const CATEGORY_IDS: Record<string, LodgingCategoryId> = {
  hoteles: 'hotels',
  cabanas: 'cabins',
  camping: 'camping',
};

const text = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

const textArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.map(text).filter((item): item is string => Boolean(item))
    : [];

const normalizeKey = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const safeUrl = (value: unknown): string | undefined => {
  const candidate = text(value);
  if (!candidate) return undefined;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? candidate
      : undefined;
  } catch {
    return undefined;
  }
};

const finiteNumber = (value: unknown): number | undefined => {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseRating = (value?: RawRelevance): LodgingRating | undefined => {
  const display = text(value?.calificacion);
  if (!display) return undefined;
  const match = display.match(/([0-9]+(?:[.,][0-9]+)?)\s*\/\s*([0-9]+(?:[.,][0-9]+)?)/);
  if (!match) return undefined;
  const ratingValue = Number(match[1].replace(',', '.'));
  const scale = Number(match[2].replace(',', '.'));
  if (!Number.isFinite(ratingValue) || !Number.isFinite(scale) || scale <= 0) {
    return undefined;
  }
  const sources = [text(value?.plataforma), ...textArray(value?.plataformas)];
  const reviewCount = finiteNumber(
    value?.cantidad_resenas ??
      value?.cantidad_resenas_booking ??
      value?.cantidad_resenas_verificadas
  );
  return {
    value: ratingValue,
    scale,
    display,
    reviewCount,
    source: sources.filter(Boolean).join(', ') || undefined,
  };
};

const normalizePayload = (payload: RawPayload) => {
  const groups = Array.isArray(payload.tipos_hospedaje)
    ? (payload.tipos_hospedaje as RawGroup[])
    : [];
  const locations: LodgingLocation[] = [];
  const invalidCoordinateIds: string[] = [];
  const usedIds = new Set<string>();

  groups.forEach((group) => {
    const categoryLabel = text(group.tipo);
    const categoryId = categoryLabel
      ? CATEGORY_IDS[normalizeKey(categoryLabel)]
      : undefined;
    if (!categoryId || !Array.isArray(group.hospedajes)) return;

    (group.hospedajes as RawLodging[]).forEach((raw, index) => {
      const name = text(raw.nombre);
      const candidateId = text(raw.id) ?? `${categoryId}-${index + 1}`;
      if (!name || usedIds.has(candidateId)) return;
      usedIds.add(candidateId);

      const lat = finiteNumber(raw.coordenadas?.latitud);
      const lng = finiteNumber(raw.coordenadas?.longitud);
      const hasValidCoordinates =
        lat !== undefined &&
        lng !== undefined &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180;
      if (!hasValidCoordinates) invalidCoordinateIds.push(candidateId);

      const phones = [text(raw.telefono), ...textArray(raw.telefonos_adicionales)]
        .filter((item): item is string => Boolean(item))
        .filter((item, itemIndex, items) => items.indexOf(item) === itemIndex);

      locations.push({
        id: candidateId,
        categoryId,
        categoryLabel,
        name,
        alternateName: text(raw.nombre_alternativo),
        description: text(raw.descripcion_corta),
        address: text(raw.ubicacion),
        phones,
        whatsapp: text(raw.whatsapp),
        instagram: safeUrl(raw.instagram),
        website: safeUrl(raw.sitio_web),
        cancellation: text(raw.cancelacion_gratuita),
        checkIn: text(raw.check_in),
        checkOut: text(raw.check_out),
        parking: text(raw.parqueadero),
        petFriendly: text(raw.petfriendly),
        breakfast: text(raw.desayuno_incluido),
        languages: textArray(raw.idiomas_atencion),
        rating: parseRating(raw.relevancia),
        lat: hasValidCoordinates ? lat : undefined,
        lng: hasValidCoordinates ? lng : undefined,
      });
    });
  });

  if (import.meta.env.DEV && invalidCoordinateIds.length > 0) {
    console.warn(
      `[Hospedaje] ${invalidCoordinateIds.length} registros sin coordenadas válidas; se muestran en la lista y se omiten del mapa:`,
      invalidCoordinateIds
    );
  }

  return {
    locations,
    metadata: {
      updatedAt: text(payload.metadata?.fecha_consulta),
      totalPlaces:
        finiteNumber(payload.metadata?.cantidad_total) ?? locations.length,
      invalidCoordinateIds,
    },
  };
};

export const useLodgingLocations = (): LodgingLocationsState => {
  const [state, setState] = useState<LodgingLocationsState>({
    locations: [],
    metadata: EMPTY_METADATA,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    fetch(`${baseUrl}data/Hospedajes.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<RawPayload>;
      })
      .then((payload) => {
        const normalized = normalizePayload(payload);
        setState({ ...normalized, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[Hospedaje] No fue posible cargar Hospedajes.json', error);
        setState({
          locations: [],
          metadata: EMPTY_METADATA,
          loading: false,
          error: 'No fue posible cargar los hospedajes. Intenta nuevamente.',
        });
      });

    return () => controller.abort();
  }, []);

  return state;
};

export default useLodgingLocations;
