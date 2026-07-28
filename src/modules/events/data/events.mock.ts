import IMAGES from '@/assets/images';
import type {
  EventNarrationParagraph,
  TourismEvent,
} from '../types';

const descriptionFromNarration = (
  narration: readonly EventNarrationParagraph[]
) =>
  narration
    .map((paragraph) =>
      paragraph.sentences.map((sentence) => sentence.text).join(' ')
    )
    .join('\n\n');

const createGallery = (
  eventId: string,
  image: string,
  imageAlt: string
) => [
  { id: `${eventId}-principal`, src: image, alt: imageAlt },
];

const astronomyNarration: readonly EventNarrationParagraph[] = [
  {
    id: 'astronomy-1',
    sentences: [
      {
        id: 'astronomy-1-1',
        text: 'El Festival de Astronomía reúne actividades culturales y científicas relacionadas con la observación del cielo en Villa de Leyva.',
      },
      {
        id: 'astronomy-1-2',
        text: 'La programación de esta demostración puede incluir encuentros para familias, aficionados y visitantes.',
      },
    ],
  },
  {
    id: 'astronomy-2',
    sentences: [
      {
        id: 'astronomy-2-1',
        text: 'Las fechas, los horarios y las condiciones de acceso deben verificarse con la programación oficial vigente antes de la visita.',
      },
    ],
  },
];

const carmenNarration: readonly EventNarrationParagraph[] = [
  {
    id: 'carmen-1',
    sentences: [
      {
        id: 'carmen-1-1',
        text: 'Las Ferias y Fiestas de la Virgen del Carmen forman parte de las celebraciones tradicionales presentadas en este prototipo de Villa de Leyva.',
      },
      {
        id: 'carmen-1-2',
        text: 'Sus actividades pueden integrar expresiones religiosas, culturales y comunitarias en distintos espacios del municipio.',
      },
    ],
  },
  {
    id: 'carmen-2',
    sentences: [
      {
        id: 'carmen-2-1',
        text: 'La información definitiva sobre fechas, recorridos y programación debe consultarse en los canales oficiales.',
      },
    ],
  },
];

const windNarration: readonly EventNarrationParagraph[] = [
  {
    id: 'wind-1',
    sentences: [
      {
        id: 'wind-1-1',
        text: 'El Festival del Viento y las Cometas es una de las celebraciones más representativas de Villa de Leyva.',
      },
      {
        id: 'wind-1-2',
        text: 'Durante el evento, el cielo sobre la Plaza Mayor se llena de cometas de diferentes formas, tamaños y colores.',
      },
    ],
  },
  {
    id: 'wind-2',
    sentences: [
      {
        id: 'wind-2-1',
        text: 'La programación reúne a visitantes, familias, aficionados y participantes que presentan sus creaciones y habilidades.',
      },
      {
        id: 'wind-2-2',
        text: 'A lo largo de las jornadas se realizan exhibiciones y actividades relacionadas con el vuelo de cometas.',
      },
    ],
  },
  {
    id: 'wind-3',
    sentences: [
      {
        id: 'wind-3-1',
        text: 'La Plaza Mayor se convierte en el principal punto de encuentro.',
      },
      {
        id: 'wind-3-2',
        text: 'Sus amplios espacios permiten observar las cometas desde diferentes lugares y disfrutar del ambiente cultural y familiar del festival.',
      },
    ],
  },
  {
    id: 'wind-4',
    sentences: [
      {
        id: 'wind-4-1',
        text: 'Antes de publicar fechas, horarios, categorías o condiciones de participación, esta información debe verificarse con la programación oficial vigente.',
      },
    ],
  },
];

const lightsNarration: readonly EventNarrationParagraph[] = [
  {
    id: 'lights-1',
    sentences: [
      {
        id: 'lights-1-1',
        text: 'El Festival de Luces transforma el centro histórico de Villa de Leyva en un escenario nocturno de encuentro y celebración.',
      },
      {
        id: 'lights-1-2',
        text: 'Esta descripción corresponde al contenido demostrativo del prototipo y presenta de forma general su ambiente cultural.',
      },
    ],
  },
  {
    id: 'lights-2',
    sentences: [
      {
        id: 'lights-2-1',
        text: 'Las fechas, los accesos y la programación deben confirmarse en las fuentes oficiales antes de asistir.',
      },
    ],
  },
];

const createEvent = (
  event: Omit<TourismEvent, 'description' | 'gallery'> & {
    narration: readonly EventNarrationParagraph[];
  }
): TourismEvent => ({
  ...event,
  description: descriptionFromNarration(event.narration),
  gallery: createGallery(event.id, event.image, event.imageAlt),
});

export const tourismEventsMock: TourismEvent[] = [
  createEvent({
    id: 'astronomy-festival',
    slug: 'festival-astronomia',
    name: 'Festival de Astronomía',
    dateLabel: '20 al 22 de marzo',
    month: 3,
    image: IMAGES.events.astronomyFestival,
    imageAlt: 'Actividad de observación astronómica en Villa de Leyva',
    narration: astronomyNarration,
    narratorCharacter: IMAGES.characters.eventNarrator,
    location: 'Plaza Mayor de Villa de Leyva',
    schedule: 'Programación por confirmar',
    price: 'Información por confirmar',
    organizer: 'Organización por confirmar',
    isFeatured: true,
    isMock: true,
  }),
  createEvent({
    id: 'virgen-del-carmen-festivities',
    slug: 'fiestas-virgen-del-carmen',
    name: 'Ferias y Fiestas de la Virgen del Carmen',
    dateLabel: '11 al 16 de julio',
    month: 7,
    image: IMAGES.events.virgenDelCarmen,
    imageAlt: 'Celebración cultural en Villa de Leyva',
    narration: carmenNarration,
    narratorCharacter: IMAGES.characters.eventNarrator,
    location: 'Centro histórico de Villa de Leyva',
    schedule: 'Programación por confirmar',
    price: 'Información por confirmar',
    organizer: 'Organización por confirmar',
    isMock: true,
  }),
  createEvent({
    id: 'wind-kites-festival',
    slug: 'festival-viento-cometas',
    name: 'Festival del Viento y las Cometas',
    dateLabel: 'Agosto',
    month: 8,
    image: IMAGES.events.windAndKitesFestival,
    imageAlt: 'Cometas volando sobre Villa de Leyva',
    narration: windNarration,
    narratorCharacter: IMAGES.characters.eventNarrator,
    location: 'Plaza Mayor de Villa de Leyva',
    schedule: 'Programación por confirmar',
    price: 'Información por confirmar',
    organizer: 'Organización por confirmar',
    isMock: true,
  }),
  createEvent({
    id: 'lights-festival',
    slug: 'festival-luces',
    name: 'Festival de Luces',
    dateLabel: '7 y 8 de diciembre',
    month: 12,
    image: IMAGES.events.lightsFestival,
    imageAlt: 'Iluminación nocturna durante un festival en Villa de Leyva',
    narration: lightsNarration,
    narratorCharacter: IMAGES.characters.eventNarrator,
    location: 'Plaza Mayor de Villa de Leyva',
    schedule: 'Programación por confirmar',
    price: 'Información por confirmar',
    organizer: 'Organización por confirmar',
    isMock: true,
  }),
];

export const sortEventsByDate = (
  events: TourismEvent[]
): TourismEvent[] => [...events];

export default tourismEventsMock;
