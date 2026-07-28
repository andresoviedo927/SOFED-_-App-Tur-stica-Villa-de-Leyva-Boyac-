import IMAGES from '@/assets/images';
import type { GalleryPhoto } from '../types/gallery.types';

/**
 * Temporary mock collection.
 *
 * Contenido currently has no definitive Plaza Principal photo set. The only
 * real Plaza Mayor photograph already in the project is reused here until five
 * final assets are supplied. Replace the centralized photo1…photo5 aliases;
 * the carousel and this data contract require no component changes.
 */
export const plazaPrincipalPhotos: GalleryPhoto[] = [
  {
    id: 'plaza-photo-1',
    src: IMAGES.gallery.plazaPrincipal.photo1,
    alt: 'Vista nocturna panorámica de la Plaza Mayor de Villa de Leyva.',
  },
  {
    id: 'plaza-photo-2',
    src: IMAGES.gallery.plazaPrincipal.photo2,
    alt: 'Iglesia y fachadas iluminadas en la Plaza Mayor durante la noche.',
  },
  {
    id: 'plaza-photo-3',
    src: IMAGES.gallery.plazaPrincipal.photo3,
    alt: 'Suelo empedrado y arquitectura colonial de la Plaza Mayor.',
  },
  {
    id: 'plaza-photo-4',
    src: IMAGES.gallery.plazaPrincipal.photo4,
    alt: 'Panorama nocturno del centro histórico de Villa de Leyva.',
  },
  {
    id: 'plaza-photo-5',
    src: IMAGES.gallery.plazaPrincipal.photo5,
    alt: 'Vista amplia de la Plaza Mayor y sus edificios coloniales.',
  },
];

export default plazaPrincipalPhotos;
