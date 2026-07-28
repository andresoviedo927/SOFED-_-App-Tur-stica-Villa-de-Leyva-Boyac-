import IMAGES from '@/assets/images';
import type { LodgingMapPoint } from '../types/lodging.types';

const point = (
  id: string,
  categoryId: LodgingMapPoint['categoryId'],
  name: string,
  xPercent: number,
  yPercent: number,
  highlight: string
): LodgingMapPoint => ({
  id,
  categoryId,
  name,
  shortDescription:
    'Alojamiento configurado para la demostración del directorio.',
  mapPosition: { xPercent, yPercent },
  address: 'Punto fijo de demostración',
  highlight,
  pinAsset: IMAGES.mapPins.lodging,
  isMock: true,
});

export const lodgingMapPointsMock: LodgingMapPoint[] = [
  point('hotel-demo-01', 'hotels', 'Hotel de muestra 1', 16, 25, 'Zona histórica'),
  point('hotel-demo-02', 'hotels', 'Hotel de muestra 2', 38, 46, 'Ambiente tranquilo'),
  point('hotel-demo-03', 'hotels', 'Hotel de muestra 3', 64, 34, 'Referencia central'),
  point('hotel-demo-04', 'hotels', 'Hotel de muestra 4', 82, 66, 'Estadía demostrativa'),
  point('cabin-demo-01', 'cabins', 'Cabaña de muestra 1', 22, 67, 'Entorno natural'),
  point('cabin-demo-02', 'cabins', 'Cabaña de muestra 2', 43, 29, 'Alojamiento rural'),
  point('cabin-demo-03', 'cabins', 'Cabaña de muestra 3', 67, 72, 'Espacio familiar'),
  point('cabin-demo-04', 'cabins', 'Cabaña de muestra 4', 84, 27, 'Vista demostrativa'),
  point('camping-demo-01', 'camping', 'Camping de muestra 1', 12, 58, 'Zona al aire libre'),
  point('camping-demo-02', 'camping', 'Camping de muestra 2', 31, 31, 'Entorno campestre'),
  point('camping-demo-03', 'camping', 'Camping de muestra 3', 52, 59, 'Área demostrativa'),
  point('camping-demo-04', 'camping', 'Camping de muestra 4', 73, 43, 'Espacio natural'),
  point('camping-demo-05', 'camping', 'Camping de muestra 5', 88, 73, 'Zona de descanso'),
];

export default lodgingMapPointsMock;
