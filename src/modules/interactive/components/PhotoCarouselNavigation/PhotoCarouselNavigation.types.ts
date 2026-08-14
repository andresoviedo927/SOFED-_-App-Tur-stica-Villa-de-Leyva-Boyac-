export interface PhotoCarouselNavigationProps {
  total: number;
  activeIndex: number;
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
  isTransitioning: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}
