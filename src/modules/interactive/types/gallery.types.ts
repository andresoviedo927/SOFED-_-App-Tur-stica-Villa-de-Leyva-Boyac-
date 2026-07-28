import type {
  KeyboardEvent,
  PointerEvent,
  RefObject,
  WheelEvent,
} from 'react';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  credit?: string;
}

export interface UsePhotoCarouselResult {
  activeIndex: number;
  isDragging: boolean;
  trackRef: RefObject<HTMLDivElement | null>;
  goTo: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  handleScroll: () => void;
  handleScrollEnd: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  handlePointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  handleWheel: (event: WheelEvent<HTMLDivElement>) => void;
}
