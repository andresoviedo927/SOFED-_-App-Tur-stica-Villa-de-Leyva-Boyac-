import type {
  KeyboardEvent,
  PointerEvent,
  RefObject,
  UIEvent,
  WheelEvent,
} from 'react';
import type {
  EventDroneVideo,
  EventGalleryPhoto,
  EventNarrationParagraph,
} from './eventDetail.types';

export interface TourismEvent {
  id: string;
  slug: string;
  name: string;
  dateLabel: string;
  startDate?: string;
  endDate?: string;
  month?: number;
  image: string;
  imageAlt: string;
  description: string;
  narration: readonly EventNarrationParagraph[];
  gallery: readonly EventGalleryPhoto[];
  droneVideo?: EventDroneVideo;
  narratorCharacter?: string;
  location?: string;
  schedule?: string;
  price?: string;
  organizer?: string;
  contactUrl?: string;
  isFeatured?: boolean;
  isMock: boolean;
}

export type EventCardState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'focus';

export interface EventsCarouselState {
  activeIndex: number;
  scrollLeft: number;
  isDragging: boolean;
}

export interface UseEventsCarouselResult {
  viewportRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  isDragging: boolean;
  scrollToEvent: (index: number) => void;
  scrollPrevious: () => void;
  scrollNext: () => void;
  handleScroll: (event: UIEvent<HTMLDivElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  handlePointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  handleWheel: (event: WheelEvent<HTMLDivElement>) => void;
  consumeDragClick: () => boolean;
}
