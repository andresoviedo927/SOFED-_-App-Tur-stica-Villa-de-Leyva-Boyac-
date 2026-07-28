import React from 'react';
import IconButton from '@/components/ui/IconButton';
import TEXTS from '@/constants/texts';
import styles from './InteractiveMapScreen.module.css';

interface MapZoomControlProps {
  zoomScale: number;
  minZoom: number;
  maxZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const MapZoomControl: React.FC<MapZoomControlProps> = ({
  zoomScale,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
}) => (
  <div className={styles.zoomControl} aria-label="Controles de zoom">
    <IconButton
      iconName="fi-rr-plus-small"
      iconSize={22}
      iconColor="#1A212B"
      variant="transparent"
      ariaLabel={TEXTS.interactive.zoomIn}
      isDisabled={zoomScale >= maxZoom}
      className={styles.zoomButton}
      onClick={onZoomIn}
    />
    <span className={styles.zoomDivider} aria-hidden="true" />
    <IconButton
      iconName="fi-rr-minus-small"
      iconSize={22}
      iconColor="#1A212B"
      variant="transparent"
      ariaLabel={TEXTS.interactive.zoomOut}
      isDisabled={zoomScale <= minZoom}
      className={styles.zoomButton}
      onClick={onZoomOut}
    />
  </div>
);

export default MapZoomControl;
