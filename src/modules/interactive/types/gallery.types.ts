import type {
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
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
  isTransitioning: boolean;
  goTo: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  handlePointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  handleClickCapture: (event: MouseEvent<HTMLDivElement>) => void;
  handleWheel: (event: WheelEvent<HTMLDivElement>) => void;
}
