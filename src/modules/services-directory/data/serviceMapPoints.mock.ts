import { SERVICE_CATEGORY_PIN_ASSET } from './serviceCategories';
import type {
  ServiceCategoryId,
  ServiceMapPoint,
} from '../types/services.types';

const point = (
  id: string,
  categoryId: ServiceCategoryId,
  name: string,
  xPercent: number,
  yPercent: number
): ServiceMapPoint => ({
  id,
  categoryId,
  name,
  shortDescription:
    'Punto de referencia de demostración cercano al centro histórico.',
  mapPosition: { xPercent, yPercent },
  pinAsset: SERVICE_CATEGORY_PIN_ASSET[categoryId],
  isMock: true,
});

export const serviceMapPoints: ServiceMapPoint[] = [
  point('cafe-demo-01', 'cafes', 'Cafetería de muestra 1', 42, 35),
  point('cafe-demo-02', 'cafes', 'Cafetería de muestra 2', 55, 44),
  point('cafe-demo-03', 'cafes', 'Cafetería de muestra 3', 64, 31),
  point('cafe-demo-04', 'cafes', 'Cafetería de muestra 4', 48, 58),
  point('atm-demo-01', 'atms', 'Cajero de muestra 1', 38, 43),
  point('atm-demo-02', 'atms', 'Cajero de muestra 2', 58, 36),
  point('atm-demo-03', 'atms', 'Cajero de muestra 3', 68, 57),
  point('gas-demo-01', 'gasStations', 'Gasolinería de muestra 1', 20, 70),
  point('gas-demo-02', 'gasStations', 'Gasolinería de muestra 2', 80, 24),
  point('gas-demo-03', 'gasStations', 'Gasolinería de muestra 3', 74, 74),
  point('health-demo-01', 'health', 'Servicio de salud de muestra 1', 31, 28),
  point('health-demo-02', 'health', 'Servicio de salud de muestra 2', 62, 69),
  point('health-demo-03', 'health', 'Servicio de salud de muestra 3', 83, 53),
  point('church-demo-01', 'churches', 'Iglesia de muestra 1', 50, 38),
  point('church-demo-02', 'churches', 'Iglesia de muestra 2', 69, 22),
  point('church-demo-03', 'churches', 'Iglesia de muestra 3', 32, 62),
  point('todo-demo-01', 'thingsToDo', 'Actividad de muestra 1', 24, 34),
  point('todo-demo-02', 'thingsToDo', 'Actividad de muestra 2', 46, 46),
  point('todo-demo-03', 'thingsToDo', 'Actividad de muestra 3', 70, 55),
  point('todo-demo-04', 'thingsToDo', 'Actividad de muestra 4', 78, 32),
  point('restaurant-demo-01', 'restaurants', 'Restaurante de muestra 1', 45, 27),
  point('restaurant-demo-02', 'restaurants', 'Restaurante de muestra 2', 54, 48),
  point('restaurant-demo-03', 'restaurants', 'Restaurante de muestra 3', 63, 40),
  point('restaurant-demo-04', 'restaurants', 'Restaurante de muestra 4', 72, 62),
  point('transport-demo-01', 'publicTransport', 'Parada de muestra 1', 28, 76),
  point('transport-demo-02', 'publicTransport', 'Parada de muestra 2', 62, 78),
  point('transport-demo-03', 'publicTransport', 'Parada de muestra 3', 82, 67),
];

export default serviceMapPoints;
