import IMAGES from '@/assets/images';
import type { PlazaPrincipalPanorama } from '../types/panorama.types';

/**
 * The available Plaza Mayor photograph is a conventional wide panorama,
 * not a verified 2:1 equirectangular image. Replace the centralized asset
 * and change the type only when a real 360-degree source is supplied.
 */
export const plazaPrincipalPanorama: PlazaPrincipalPanorama = {
  id: 'plaza-principal-panorama',
  src: IMAGES.gallery.plazaPrincipal.panorama,
  title: 'Plaza Principal de Villa de Leyva',
  alt: 'Vista panorámica de la Plaza Principal de Villa de Leyva',
  type: 'widePanorama',
  initialYaw: 0,
  initialPitch: 0,
  initialZoom: 1.12,
};

export default plazaPrincipalPanorama;
