import IMAGES from '@/assets/images';
import type { PlazaPrincipalPanorama } from '../types/panorama.types';

export const plazaPrincipalPanorama: PlazaPrincipalPanorama = {
  id: 'plaza-principal-panorama',
  src: IMAGES.gallery.plazaPrincipal.panorama,
  title: 'Plaza Principal de Villa de Leyva',
  alt: 'Vista panorámica de la Plaza Principal de Villa de Leyva',
  type: 'equirectangular360',
  initialYaw: -1,
  initialPitch: 0,
  initialZoom: 1,
};

export default plazaPrincipalPanorama;
