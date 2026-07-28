import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type {
  ServiceCategory,
  ServiceCategoryId,
} from '../types/services.types';

const categoryTexts = TEXTS.services.categories;

export const SERVICE_CATEGORY_PIN_ASSET: Record<
  ServiceCategoryId,
  string
> = {
  cafes: IMAGES.servicesMap.pins.red,
  atms: IMAGES.servicesMap.pins.blue,
  gasStations: IMAGES.servicesMap.pins.yellow,
  health: IMAGES.servicesMap.pins.green,
  churches: IMAGES.servicesMap.pins.black,
  thingsToDo: IMAGES.servicesMap.pins.orange,
  restaurants: IMAGES.servicesMap.pins.red,
  publicTransport: IMAGES.servicesMap.pins.blue,
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'cafes',
    label: categoryTexts.cafes,
    accessibilityLabel: categoryTexts.cafes,
    icon: IMAGES.servicesMap.categoryIcons.cafes,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.cafes,
    column: 'left',
    order: 1,
  },
  {
    id: 'atms',
    label: categoryTexts.atms,
    shortLabel: 'Cajeros automáti…',
    accessibilityLabel: categoryTexts.atms,
    icon: IMAGES.servicesMap.categoryIcons.atms,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.atms,
    column: 'left',
    order: 2,
  },
  {
    id: 'gasStations',
    label: categoryTexts.gasStations,
    accessibilityLabel: categoryTexts.gasStations,
    icon: IMAGES.servicesMap.categoryIcons.gasStations,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.gasStations,
    column: 'left',
    order: 3,
  },
  {
    id: 'health',
    label: categoryTexts.health,
    shortLabel: 'Hospitales y farm…',
    accessibilityLabel: categoryTexts.health,
    icon: IMAGES.servicesMap.categoryIcons.health,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.health,
    column: 'left',
    order: 4,
  },
  {
    id: 'churches',
    label: categoryTexts.churches,
    accessibilityLabel: categoryTexts.churches,
    icon: IMAGES.servicesMap.categoryIcons.churches,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.churches,
    column: 'right',
    order: 1,
  },
  {
    id: 'thingsToDo',
    label: categoryTexts.thingsToDo,
    accessibilityLabel: categoryTexts.thingsToDo,
    icon: IMAGES.servicesMap.categoryIcons.thingsToDo,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.thingsToDo,
    column: 'right',
    order: 2,
  },
  {
    id: 'restaurants',
    label: categoryTexts.restaurants,
    accessibilityLabel: categoryTexts.restaurants,
    icon: IMAGES.servicesMap.categoryIcons.restaurants,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.restaurants,
    column: 'right',
    order: 3,
  },
  {
    id: 'publicTransport',
    label: categoryTexts.publicTransport,
    accessibilityLabel: categoryTexts.publicTransport,
    icon: IMAGES.servicesMap.categoryIcons.publicTransport,
    pinAsset: SERVICE_CATEGORY_PIN_ASSET.publicTransport,
    column: 'right',
    order: 4,
  },
];

export default serviceCategories;
