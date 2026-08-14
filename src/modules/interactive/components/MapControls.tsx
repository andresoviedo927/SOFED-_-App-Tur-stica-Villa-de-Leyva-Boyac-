import React from 'react';
import LocateButton from './LocateButton';
import MapZoomControl from './MapZoomControl';
import {
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
} from '../constants/map';
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
      minZoom={MAP_MIN_ZOOM}
      maxZoom={MAP_MAX_ZOOM}
      onZoomIn={onZoomIn}
      onZoomOut={onZoomOut}
    />
  </aside>
);

export default MapControls;
