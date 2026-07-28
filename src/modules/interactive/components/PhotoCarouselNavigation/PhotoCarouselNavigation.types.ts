export interface PhotoCarouselNavigationProps {
  total: number;
  activeIndex: number;
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}
