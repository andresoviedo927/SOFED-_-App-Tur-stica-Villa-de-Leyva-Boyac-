export interface DroneVideoContent {
  id: string;
  src: string;
  provider?: 'youtube';
  watchUrl?: string;
  poster?: string;
  title: string;
  description?: string;
  accessibilityLabel: string;
  captions?: string;
  objectPosition?: string;
}

export const plazaPrincipalDroneVideo: DroneVideoContent = {
  id: 'plaza-principal-drone-flight',
  provider: 'youtube',
  src: 'https://www.youtube.com/embed/7DeGW1S3eaA?autoplay=1&mute=0&rel=0&modestbranding=1',
  watchUrl: 'https://www.youtube.com/watch?v=7DeGW1S3eaA',
  title: 'Vuelo de drone sobre la Plaza Mayor de Villa de Leyva',
  accessibilityLabel:
    'Video de drone sobre la Plaza Mayor de Villa de Leyva',
};

export default plazaPrincipalDroneVideo;
