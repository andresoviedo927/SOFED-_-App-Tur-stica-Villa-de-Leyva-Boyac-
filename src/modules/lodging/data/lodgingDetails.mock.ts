import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type {
  ServiceAttribute,
  ServiceDetail,
} from '@/modules/services-directory/types/serviceDetail.types';
import { lodgingMapPointsMock } from './lodgingMapPoints.mock';
import type { LodgingCategoryId } from '../types/lodging.types';

const descriptionByCategory: Record<LodgingCategoryId, string> = {
  hotels: TEXTS.lodging.detail.hotelDescription,
  cabins: TEXTS.lodging.detail.cabinDescription,
  camping: TEXTS.lodging.detail.campingDescription,
};

const typeByCategory: Record<LodgingCategoryId, string> = {
  hotels: TEXTS.lodging.categories.hotels,
  cabins: TEXTS.lodging.categories.cabins,
  camping: TEXTS.lodging.categories.camping,
};

const createAttributes = (
  categoryId: LodgingCategoryId,
  highlight?: string
): ServiceAttribute[] => [
  {
    id: 'location',
    label: TEXTS.lodging.detail.attributes.location,
    value: TEXTS.lodging.detail.attributes.fixedMapPoint,
    icon: '📍',
    action: 'showOnMap',
  },
  {
    id: 'lodging-type',
    label: TEXTS.lodging.detail.attributes.type,
    value: typeByCategory[categoryId],
    icon: '🏡',
  },
  ...(highlight
    ? [
        {
          id: 'environment',
          label: TEXTS.lodging.detail.attributes.environment,
          value: highlight,
          icon: '🌿',
        },
      ]
    : []),
  {
    id: 'data-status',
    label: TEXTS.lodging.detail.attributes.dataStatus,
    value: TEXTS.lodging.detail.attributes.demo,
    icon: 'ℹ️',
  },
];

export const lodgingDetailsMock: ServiceDetail[] =
  lodgingMapPointsMock.map((point) => ({
    id: point.id,
    categoryId: point.categoryId,
    name: point.name,
    description: descriptionByCategory[point.categoryId],
    contacts: [],
    attributes: createAttributes(
      point.categoryId,
      point.highlight
    ),
    gallery: [
      {
        id: `${point.id}-photo-1`,
        src: IMAGES.TOURISM_FALLBACK_NIGHT,
        alt: TEXTS.lodging.detail.galleryPhotoAlt.replace(
          '{lodging}',
          point.name
        ),
      },
      {
        id: `${point.id}-photo-2`,
        src: IMAGES.TOURISM_FALLBACK_BACKGROUND,
        alt: TEXTS.lodging.detail.galleryPhotoAlt.replace(
          '{lodging}',
          point.name
        ),
      },
    ],
    mapPointId: point.id,
    isMock: true,
  }));

export default lodgingDetailsMock;
