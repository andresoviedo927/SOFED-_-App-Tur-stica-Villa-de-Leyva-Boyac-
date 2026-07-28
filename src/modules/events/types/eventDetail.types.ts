export type EventDetailNarrationState =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'error';

export interface EventNarrationSentence {
  id: string;
  text: string;
}

export interface EventNarrationParagraph {
  id: string;
  sentences: readonly EventNarrationSentence[];
}

export interface EventGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface EventDroneVideo {
  id: string;
  src: string;
  poster: string;
  title: string;
  accessibilityLabel: string;
  captions?: string;
  objectPosition?: string;
}
