import IMAGES from '@/assets/images';
import VIDEOS from '@/assets/videos';

export interface DroneVideoContent {
  id: string;
  src: string;
  poster: string;
  title: string;
  description?: string;
  accessibilityLabel: string;
  captions?: string;
  objectPosition?: string;
}

/**
 * Single-video configuration.
 *
 * The poster uses the real Plaza Mayor photograph already in the project.
 * src remains empty until the requested aerial video is supplied locally.
 */
export const plazaPrincipalDroneVideo: DroneVideoContent = {
  id: 'plaza-principal-drone-flight',
  src: VIDEOS.plazaPrincipal.droneFlight,
  poster: IMAGES.gallery.plazaPrincipal.dronePoster,
  title: 'Vuelo aéreo sobre la Plaza Principal',
  accessibilityLabel:
    'Video aéreo de la Plaza Principal de Villa de Leyva',
  objectPosition: 'center',
};

export default plazaPrincipalDroneVideo;
