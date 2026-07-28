import IMAGES from '@/assets/images';
import {
  DirectoryMapCard,
  DirectoryMapControls,
  DirectoryMapPin,
  DirectoryMapViewport,
} from '@/components/shared/map-directory';
import TEXTS from '@/constants/texts';
import LodgingMapTooltip from '../LodgingMapTooltip';
import type { LodgingMapProps } from './LodgingMap.types';
import styles from './LodgingMap.module.css';

export const LodgingMap = ({
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
}: LodgingMapProps) => (
  <DirectoryMapCard width={644}>
    <DirectoryMapViewport
      mapSrc={IMAGES.servicesMap.base}
      ariaLabel={TEXTS.lodging.map.label}
      zoom={zoom}
      offset={offset}
      onCloseOverlay={onClosePoint}
      onReset={onReset}
      onZoomIn={onZoomIn}
      onZoomOut={onZoomOut}
      onPanBy={onPanBy}
      mapContent={points.map((point, index) => (
        <DirectoryMapPin
          key={point.id}
          point={point}
          index={index}
          isSelected={selectedPoint?.id === point.id}
          visualWidth={24}
          visualHeight={24}
          onSelect={onSelectPoint}
        />
      ))}
      overlayContent={
        <>
          {selectedCategory && (
            <button
              type="button"
              className={styles.filterChip}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={onRemoveFilter}
            >
              {TEXTS.lodging.map.filterChip.replace(
                '{category}',
                selectedCategory.label
              )}
            </button>
          )}

          {selectedCategory && points.length === 0 && (
            <div className={styles.empty} role="status">
              <strong>{TEXTS.lodging.map.noResultsTitle}</strong>
              <span>{TEXTS.lodging.map.noResultsMessage}</span>
              <button type="button" onClick={onRemoveFilter}>
                {TEXTS.lodging.map.removeFilter}
              </button>
            </div>
          )}

          {selectedPoint && selectedCategory && (
            <LodgingMapTooltip
              point={selectedPoint}
              category={selectedCategory}
              onClose={onClosePoint}
              onViewDetails={() => onOpenDetails(selectedPoint)}
            />
          )}

          <DirectoryMapControls
            resetLabel={TEXTS.lodging.map.resetView}
            zoomInLabel={TEXTS.lodging.map.zoomIn}
            zoomOutLabel={TEXTS.lodging.map.zoomOut}
            disableZoomIn={isAtMaxZoom}
            disableZoomOut={isAtMinZoom}
            onReset={onReset}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
          />
        </>
      }
    />
  </DirectoryMapCard>
);

export default LodgingMap;
