import type { NarrationParagraph } from '../types/narration.types';

export const PLAZA_PRINCIPAL_NARRATION: readonly NarrationParagraph[] = [
  {
    id: 'plaza-paragraph-1',
    sentences: [
      {
        id: 'plaza-sentence-1-1',
        text: 'La Plaza Mayor es el corazón de Villa de Leyva. Sus calles empedradas y las fachadas blancas que la rodean conservan el ambiente histórico y tranquilo del municipio.',
      },
    ],
  },
  {
    id: 'plaza-paragraph-2',
    sentences: [
      {
        id: 'plaza-sentence-2-1',
        text: 'Alrededor de la plaza se encuentran construcciones coloniales de fachadas blancas, balcones de madera y la iglesia de Nuestra Señora del Rosario. Su arquitectura conserva gran parte de la identidad histórica de la región.',
      },
    ],
  },
  {
    id: 'plaza-paragraph-3',
    sentences: [
      {
        id: 'plaza-sentence-3-1',
        text: 'Hoy es un punto de encuentro para habitantes y visitantes, además de escenario de festivales, celebraciones y actividades culturales que mantienen vivas las tradiciones de Villa de Leyva.',
      },
    ],
  },
] as const;
