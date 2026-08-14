import IMAGES from '@/assets/images';
import VIDEOS from '@/assets/videos';
import type {
  EventDroneVideo,
  EventNarrationParagraph,
  TourismEvent,
} from '../types';
import EVENTS_CALENDAR from './eventsCalendar';

const EVENT_IMAGES: Record<
  (typeof EVENTS_CALENDAR)[number]['id'],
  string
> = {
  'astronomy-festival': IMAGES.events.astronomyFestival,
  'holy-week-ancient-music': IMAGES.events.holyWeekAncientMusic,
  'flavors-knowledge-meeting': IMAGES.events.flavorsAndKnowledge,
  'villa-de-leyva-anniversary': IMAGES.events.villaAnniversary,
  'jazz-festival': IMAGES.events.jazzFestival,
  'virgen-del-carmen-festivities': IMAGES.events.virgenDelCarmen,
  'wind-kites-festival': IMAGES.events.windAndKitesFestival,
  'lights-festival': IMAGES.events.lightsFestival,
};

const WIND_KITES_GALLERY = [
  {
    id: 'wind-kites-festival-photo-1',
    src: IMAGES.events.windAndKitesGallery[0],
    alt: 'Vista panorámica de la Plaza Mayor llena de visitantes y cometas de colores.',
  },
  {
    id: 'wind-kites-festival-photo-2',
    src: IMAGES.events.windAndKitesGallery[1],
    alt: 'Participantes contemplan grandes cometas con formas de lagarto y pulpo.',
  },
  {
    id: 'wind-kites-festival-photo-3',
    src: IMAGES.events.windAndKitesGallery[2],
    alt: 'Familias reunidas en la Plaza Mayor bajo cometas multicolores.',
  },
  {
    id: 'wind-kites-festival-photo-4',
    src: IMAGES.events.windAndKitesGallery[3],
    alt: 'Exhibición de cometas coordinadas frente a la iglesia de la Plaza Mayor.',
  },
  {
    id: 'wind-kites-festival-photo-5',
    src: IMAGES.events.windAndKitesGallery[4],
    alt: 'Festival del Viento y las Cometas durante el atardecer en Villa de Leyva.',
  },
  {
    id: 'wind-kites-festival-photo-6',
    src: IMAGES.events.windAndKitesGallery[5],
    alt: 'Vista aérea de cometas monumentales sobre la Plaza Mayor y sus alrededores.',
  },
  {
    id: 'wind-kites-festival-photo-7',
    src: IMAGES.events.windAndKitesGallery[6],
    alt: 'Una familia disfruta el vuelo de una gran cometa con forma de pulpo.',
  },
  {
    id: 'wind-kites-festival-photo-8',
    src: IMAGES.events.windAndKitesGallery[7],
    alt: 'Participantes del festival junto a una gran cometa negra y multicolor.',
  },
] as const;

const WIND_KITES_DRONE_VIDEO: EventDroneVideo = {
  id: 'wind-kites-festival-drone-flight',
  provider: 'youtube',
  src: 'https://www.youtube.com/embed/ag33xtLPKmI?autoplay=1&mute=0&rel=0&modestbranding=1',
  watchUrl: 'https://www.youtube.com/watch?v=ag33xtLPKmI',
  title: 'Vuelo en drone 4K del Festival de Cometas de Villa de Leyva',
  description: 'Recorrido aéreo del Festival de Cometas de Villa de Leyva.',
  accessibilityLabel:
    'Video aéreo del Festival del Viento y las Cometas de Villa de Leyva',
};

const descriptionFromNarration = (
  narration: readonly EventNarrationParagraph[]
) =>
  narration
    .map((paragraph) =>
      paragraph.sentences.map((sentence) => sentence.text).join(' ')
    )
    .join('\n\n');

const createNarration = (
  id: string,
  name: string,
  date: string
): readonly EventNarrationParagraph[] => {
  if (id === 'wind-kites-festival') {
    return [
      {
        id: `${id}-description`,
        sentences: [
          {
            id: `${id}-description-1`,
            text: 'El Festival del Viento y las Cometas es una de las celebraciones más emblemáticas de Villa de Leyva.',
          },
          {
            id: `${id}-description-2`,
            text: 'Cada año reúne a familias, visitantes y expertos en vuelo de cometas alrededor de la Plaza Mayor y sus alrededores.',
          },
          {
            id: `${id}-description-3`,
            text: 'Esta tradición nació como un encuentro para disfrutar del viento característico de la región y con el tiempo se convirtió en un evento cultural y turístico muy esperado.',
          },
          {
            id: `${id}-description-4`,
            text: 'Durante el festival se realizan exhibiciones, concursos de cometas artesanales y actividades para niños y adultos.',
          },
          {
            id: `${id}-description-5`,
            text: 'Más que un espectáculo visual, es una celebración de la creatividad, la tradición y el encuentro comunitario.',
          },
        ],
      },
    ];
  }

  return [
    {
      id: `${id}-calendar`,
      sentences: [
        {
          id: `${id}-calendar-1`,
          text: `${name} forma parte del calendario tradicional de Villa de Leyva y está programado para ${date}.`,
        },
        {
          id: `${id}-calendar-2`,
          text: 'Consulta la programación oficial vigente antes de tu visita.',
        },
      ],
    },
  ];
};

const createEvent = (
  calendarEvent: (typeof EVENTS_CALENDAR)[number]
): TourismEvent => {
  const narration = createNarration(
    calendarEvent.id,
    calendarEvent.name,
    calendarEvent.date
  );
  const image = EVENT_IMAGES[calendarEvent.id];
  const imageAlt = `Fotografía de ${calendarEvent.name}`;

  return {
    id: calendarEvent.id,
    slug: calendarEvent.slug,
    name: calendarEvent.name,
    dateLabel: calendarEvent.date,
    month: calendarEvent.month,
    image,
    imageAlt,
    description: descriptionFromNarration(narration),
    narration,
    gallery:
      calendarEvent.id === 'wind-kites-festival'
        ? WIND_KITES_GALLERY
        : [
            {
              id: `${calendarEvent.id}-principal`,
              src: image,
              alt: imageAlt,
            },
          ],
    droneVideo:
      calendarEvent.id === 'wind-kites-festival'
        ? WIND_KITES_DRONE_VIDEO
        : undefined,
    narratorVideo:
      calendarEvent.id === 'wind-kites-festival'
        ? VIDEOS.events.windKitesCharacter
        : VIDEOS.plazaPrincipal.readingCharacter,
    location: 'Villa de Leyva, Boyacá',
    schedule: calendarEvent.date,
    price: 'Consulta la programación oficial',
    organizer: 'Alcaldía Municipal de Villa de Leyva',
    isFeatured: calendarEvent.id === 'astronomy-festival',
    isMock: true,
  };
};

export const tourismEventsMock: TourismEvent[] =
  EVENTS_CALENDAR.map(createEvent);

export const sortEventsByDate = (
  events: TourismEvent[]
): TourismEvent[] => [...events];

export default tourismEventsMock;
