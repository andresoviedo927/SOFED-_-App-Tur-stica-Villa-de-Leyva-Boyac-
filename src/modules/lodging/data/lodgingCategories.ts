import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type { LodgingCategory } from '../types/lodging.types';

export const lodgingCategories: LodgingCategory[] = [
  {
    id: 'hotels',
    label: TEXTS.lodging.categories.hotels,
    accessibilityLabel:
      TEXTS.lodging.accessibility.showHotels,
    icon: IMAGES.icons.lodgingCategories.hotels,
    pinAsset: IMAGES.mapPins.lodging,
    order: 1,
  },
  {
    id: 'cabins',
    label: TEXTS.lodging.categories.cabins,
    accessibilityLabel:
      TEXTS.lodging.accessibility.showCabins,
    icon: IMAGES.icons.lodgingCategories.cabins,
    pinAsset: IMAGES.mapPins.lodging,
    order: 2,
  },
  {
    id: 'camping',
    label: TEXTS.lodging.categories.camping,
    accessibilityLabel:
      TEXTS.lodging.accessibility.showCamping,
    icon: IMAGES.icons.lodgingCategories.camping,
    pinAsset: IMAGES.mapPins.lodging,
    order: 3,
  },
];

export default lodgingCategories;
