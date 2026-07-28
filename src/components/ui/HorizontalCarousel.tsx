import React, { useRef, useState, useEffect, useCallback } from 'react';
import AppIcon from '@/components/ui/AppIcon';

export interface HorizontalCarouselProps {
  children: React.ReactNode;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * HorizontalCarousel
 * Mobile-first horizontal scroll carousel designed for landscape interfaces.
 * Features snap scrolling, touch-drag support, page indicators, and touch controls (>= 44px).
 */
export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  children,
  showIndicators = true,
  showControls = true,
  className = '',
  itemClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const checkScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);

    const childrenCount = containerRef.current.children.length;
    setItemCount(childrenCount);

    if (childrenCount > 0 && clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / (clientWidth * 0.75));
      setActiveIndex(Math.min(newIndex, childrenCount - 1));
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollBy = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const amount = direction === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const children = Array.from(containerRef.current.children) as HTMLElement[];
    if (children[index]) {
      children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full flex flex-row gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-1 scroll-smooth touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={`snap-center shrink-0 min-w-[240px] max-w-[320px] sm:min-w-[280px] sm:max-w-[360px] ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Floating Left/Right Controls for Landscape Touch */}
      {showControls && (canScrollLeft || canScrollRight) && (
        <div className="absolute inset-y-0 inset-x-0 pointer-events-none flex items-center justify-between px-1">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scrollBy('left')}
            disabled={!canScrollLeft}
            aria-label="Ver anterior"
            className={`pointer-events-auto w-11 h-11 rounded-full bg-[#1A212B]/80 hover:bg-[#1A212B] text-white border border-white/20 shadow-lg flex items-center justify-center transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#F2930D] ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <AppIcon name="fi-rr-angle-small-left" size={24} color="#FFFFFF" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scrollBy('right')}
            disabled={!canScrollRight}
            aria-label="Ver siguiente"
            className={`pointer-events-auto w-11 h-11 rounded-full bg-[#1A212B]/80 hover:bg-[#1A212B] text-white border border-white/20 shadow-lg flex items-center justify-center transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#F2930D] ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <AppIcon name="fi-rr-angle-small-right" size={24} color="#FFFFFF" />
          </button>
        </div>
      )}

      {/* Pagination Dot Indicators */}
      {showIndicators && itemCount > 1 && (
        <div className="flex flex-row items-center justify-center gap-1.5 mt-2">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir al elemento ${i + 1}`}
              className={`min-w-[24px] min-h-[24px] flex items-center justify-center cursor-pointer p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#F2930D]`}
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  i === activeIndex
                    ? 'w-5 h-2 bg-[#F2930D]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalCarousel;
