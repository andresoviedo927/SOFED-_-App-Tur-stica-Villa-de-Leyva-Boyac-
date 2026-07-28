import {
  useRef,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type {
  ServiceCategory,
  ServiceMapPoint,
} from '../../types/services.types';
import { ServiceMapPin } from '../ServiceMapPin';
import { ServiceMapTooltip } from '../ServiceMapTooltip';
import { ServicesMapControls } from '../ServicesMapControls';
import styles from './ServicesMap.module.css';

interface ServicesMapProps {
  selectedCategory: ServiceCategory | null;
  points: ServiceMapPoint[];
  selectedPoint: ServiceMapPoint | null;
  zoom: number;
  offset: { x: number; y: number };
  isAtMinZoom: boolean;
  isAtMaxZoom: boolean;
  onRemoveFilter: () => void;
  onSelectPoint: (pointId: string) => void;
  onClosePoint: () => void;
  onOpenDetails: (point: ServiceMapPoint) => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanBy: (x: number, y: number) => void;
}

export const ServicesMap = ({
  selectedCategory,
  points,
  selectedPoint,
  zoom,
  offset,
  isAtMinZoom,
  isAtMaxZoom,
  onRemoveFilter,
  onSelectPoint,
  onClosePoint,
  onOpenDetails,
  onReset,
  onZoomIn,
  onZoomOut,
  onPanBy,
}: ServicesMapProps) => {
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;
    dragStart.current = { x: event.clientX, y: event.clientY };
    onPanBy(deltaX, deltaY);
  };

  const endDrag = () => {
    dragStart.current = null;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.deltaY < 0) onZoomIn();
    else onZoomOut();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+' || event.key === '=') onZoomIn();
    if (event.key === '-') onZoomOut();
    if (event.key === 'Home') onReset();
    if (event.key === 'Escape') onClosePoint();
  };

  return (
    <div className={styles.frame}>
      <div
        className={styles.map}
        role="application"
        tabIndex={0}
        aria-label={TEXTS.services.map.label}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={handleWheel}
        onKeyDown={handleKeyboard}
      >
        <div
          className={styles.canvas}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          }}
        >
          <img
            className={styles.base}
            src={IMAGES.servicesMap.base}
            alt=""
            draggable={false}
          />
          {points.map((point, index) => (
            <ServiceMapPin
              key={point.id}
              point={point}
              index={index}
              isSelected={selectedPoint?.id === point.id}
              onSelect={onSelectPoint}
            />
          ))}
        </div>

        {selectedCategory && (
          <button
            type="button"
            className={styles.filterChip}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onRemoveFilter}
          >
            {TEXTS.services.map.filterChip.replace(
              '{category}',
              selectedCategory.label
            )}
          </button>
        )}

        {selectedCategory && points.length === 0 && (
          <div className={styles.empty} role="status">
            <strong>{TEXTS.services.map.noResultsTitle}</strong>
            <span>{TEXTS.services.map.noResultsMessage}</span>
          </div>
        )}

        {selectedPoint && selectedCategory && (
          <ServiceMapTooltip
            key={selectedPoint.id}
            point={selectedPoint}
            categoryLabel={selectedCategory.label}
            onClose={onClosePoint}
            onViewDetails={() => onOpenDetails(selectedPoint)}
          />
        )}

        <ServicesMapControls
          resetLabel={TEXTS.services.map.resetView}
          zoomInLabel={TEXTS.services.map.zoomIn}
          zoomOutLabel={TEXTS.services.map.zoomOut}
          disableZoomIn={isAtMaxZoom}
          disableZoomOut={isAtMinZoom}
          onReset={onReset}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
        />
      </div>
    </div>
  );
};

export default ServicesMap;
