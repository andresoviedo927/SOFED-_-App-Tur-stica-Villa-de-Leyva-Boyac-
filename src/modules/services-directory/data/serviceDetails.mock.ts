import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { serviceMapPoints } from './serviceMapPoints.mock';
import type { ServiceCategoryId } from '../types/services.types';
import type {
  ServiceAttribute,
  ServiceDetail,
} from '../types/serviceDetail.types';

const categoryDescription: Record<ServiceCategoryId, string> = {
  cafes:
    'Cafetería de demostración ubicada cerca del centro histórico de Villa de Leyva.',
  atms:
    'Punto de cajero automático incluido para demostrar la consulta de servicios financieros cercanos.',
  gasStations:
    'Estación de servicio de demostración incluida como referencia fija dentro del mapa.',
  health:
    'Servicio de salud de demostración para explorar información útil desde el directorio.',
  churches:
    'Lugar religioso de demostración ubicado dentro del área histórica representada en el mapa.',
  thingsToDo:
    'Actividad turística de demostración para conocer opciones disponibles en el municipio.',
  restaurants:
    'Restaurante de demostración cercano al centro histórico de Villa de Leyva.',
  publicTransport:
    'Punto de transporte público de demostración configurado como referencia fija.',
};

const categoryAttribute: Record<
  ServiceCategoryId,
  ServiceAttribute
> = {
  cafes: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Cafetería',
    icon: '☕',
  },
  atms: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Cajero automático',
    icon: '🏧',
  },
  gasStations: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Estación de servicio',
    icon: '⛽',
  },
  health: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Servicio de salud',
    icon: '✚',
  },
  churches: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Lugar religioso',
    icon: '⛪',
  },
  thingsToDo: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Actividad turística',
    icon: '🎟️',
  },
  restaurants: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Restaurante',
    icon: '🍽️',
  },
  publicTransport: {
    id: 'service-type',
    label: 'Tipo',
    value: 'Transporte público',
    icon: '🚌',
  },
};

const createAttributes = (
  categoryId: ServiceCategoryId
): ServiceAttribute[] => [
  {
    id: 'location',
    label: TEXTS.services.detail.attributes.location,
    value: TEXTS.services.detail.attributes.fixedMapPoint,
    icon: '📍',
    action: 'showOnMap',
  },
  categoryAttribute[categoryId],
  {
    id: 'data-status',
    label: TEXTS.services.detail.attributes.status,
    value: TEXTS.services.detail.attributes.demo,
    icon: 'ℹ️',
  },
];

export const serviceDetailsMock: ServiceDetail[] =
  serviceMapPoints.map((point) => ({
    id: point.id,
    categoryId: point.categoryId,
    name: point.name,
    description: categoryDescription[point.categoryId],
    contacts: [],
    attributes: createAttributes(point.categoryId),
    gallery: [
      {
        id: `${point.id}-photo-1`,
        src: IMAGES.VILLA_DE_LEYVA_NIGHT,
        alt: TEXTS.services.detail.galleryPhotoAlt.replace(
          '{service}',
          point.name
        ),
      },
      {
        id: `${point.id}-photo-2`,
        src: IMAGES.HOME_BACKGROUND,
        alt: TEXTS.services.detail.galleryPhotoAlt.replace(
          '{service}',
          point.name
        ),
      },
    ],
    mapPointId: point.id,
    isMock: true,
  }));

export default serviceDetailsMock;
