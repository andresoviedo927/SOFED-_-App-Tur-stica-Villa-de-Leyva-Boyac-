import IMAGES from '@/assets/images';
import ROUTES from '@/constants/routes';
import TEXTS from '@/constants/texts';

export type GalleryOptionId = 'photos' | 'panorama' | 'drone';

export interface GalleryOption {
  id: GalleryOptionId;
  label: string;
  accessibilityLabel: string;
  icon: string;
  destination: string;
  position: 'top' | 'middle' | 'bottom';
}

const galleryTexts = TEXTS.interactive.plazaPrincipal.gallery;

export const plazaPrincipalGalleryOptions: GalleryOption[] = [
  {
    id: 'photos',
    label: galleryTexts.photos.label,
    accessibilityLabel: galleryTexts.photos.accessibilityLabel,
    icon: IMAGES.icons.photos,
    destination: ROUTES.PLAZA_PRINCIPAL_GALLERY_PHOTOS,
    position: 'top',
  },
  {
    id: 'panorama',
    label: galleryTexts.panorama.label,
    accessibilityLabel: galleryTexts.panorama.accessibilityLabel,
    icon: IMAGES.icons.panorama,
    destination: ROUTES.PLAZA_PRINCIPAL_GALLERY_PANORAMA,
    position: 'middle',
  },
  {
    id: 'drone',
    label: galleryTexts.drone.label,
    accessibilityLabel: galleryTexts.drone.accessibilityLabel,
    icon: IMAGES.icons.drone,
    destination: ROUTES.PLAZA_PRINCIPAL_GALLERY_DRONE,
    position: 'bottom',
  },
];

export default plazaPrincipalGalleryOptions;
