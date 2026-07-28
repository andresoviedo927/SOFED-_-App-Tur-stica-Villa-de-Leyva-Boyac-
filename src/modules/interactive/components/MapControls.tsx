import React from 'react';
import LocateButton from './LocateButton';
import MapZoomControl from './MapZoomControl';
import styles from './InteractiveMapScreen.module.css';

interface MapControlsProps {
  zoomScale: number;
  onLocate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  zoomScale,
  onLocate,
  onZoomIn,
  onZoomOut,
}) => (
  <aside className={styles.mapControls}>
    <LocateButton onLocate={onLocate} />
    <MapZoomControl
      zoomScale={zoomScale}
      minZoom={0.8}
      maxZoom={1.6}
      onZoomIn={onZoomIn}
      onZoomOut={onZoomOut}
    />
  </aside>
);

export default MapControls;
