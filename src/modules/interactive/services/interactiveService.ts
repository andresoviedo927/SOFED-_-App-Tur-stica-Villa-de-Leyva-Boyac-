import TEXTS from '@/constants/texts';
import ROUTES from '@/constants/routes';
import { InteractiveItem, MapPinPOI } from '../types';

export const getInteractiveItems = (): InteractiveItem[] => [
  {
    id: '1',
    title: TEXTS.interactive.map3d,
    description: 'Explora la Plaza Mayor de Villa de Leyva en tres dimensiones.',
    type: '3d',
  },
  {
    id: '2',
    title: TEXTS.interactive.virtualTour,
    description: 'Recorrido interactivo 360 por los sitios más emblemáticos.',
    type: 'tour',
  },
  {
    id: '3',
    title: TEXTS.interactive.audioGuide,
    description: 'Historias y datos culturales relatados por historiadores locales.',
    type: 'audio',
  },
  {
    id: '4',
    title: TEXTS.interactive.augmentedReality,
    description: 'Descubre fósiles prehispánicos mediante cámara AR.',
    type: 'ar',
  },
];

export const getMapPins = (): MapPinPOI[] => [
  {
    id: 'pin-blue',
    color: 'blue',
    title: 'Cascada La Periquera y Pozos',
    category: 'Naturaleza y Ecología',
    description: 'Hermosas caídas de agua enmarcadas por exuberante naturaleza nativa y senderos ecológicos.',
    xPercent: 29,
    yPercent: 10,
  },
  {
    id: 'pin-yellow',
    color: 'yellow',
    title: 'Casa Terracota y Museo',
    category: 'Patrimonio Arquitectónico',
    description: 'La estructura de cerámica esculpida más grande del mundo, moldeada artesanalmente en arcilla.',
    xPercent: 16,
    yPercent: 46,
  },
  {
    id: 'pin-green',
    color: 'green',
    title: 'Jardín Botánico y Pozos Azules',
    category: 'Reserva Ecológica',
    description: 'Espejos de agua azul turquesa rodeados de vegetación única en el paisaje semiárido boyacense.',
    xPercent: 20,
    yPercent: 70,
  },
  {
    id: 'pin-red',
    color: 'red',
    title: 'Plaza Mayor e Iglesia de Nuestra Señora del Rosario',
    category: 'Monumento Nacional',
    description: 'La gran plaza empedrada de 14.000 m² rodeada de arquitectura colonial del siglo XVI.',
    xPercent: 42,
    yPercent: 52,
    destination: ROUTES.PLAZA_PRINCIPAL,
  },
  {
    id: 'pin-orange',
    color: 'orange',
    title: 'Zona de camping',
    category: 'Aventura',
    description: 'Campamentos y senderos en el entorno rural de Villa de Leyva.',
    xPercent: 63,
    yPercent: 35,
  },
  {
    id: 'pin-black',
    color: 'black',
    title: 'Mirador del bosque',
    category: 'Paisaje',
    description: 'Punto panorámico de prueba para futuras rutas interactivas.',
    xPercent: 79,
    yPercent: 28,
  },
];
