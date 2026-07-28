import React from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type { MapPinPOI } from '../types';
import MapPin from './MapPin';
import styles from './InteractiveMapScreen.module.css';

interface IllustratedMapProps {
  pins: MapPinPOI[];
  selectedPin: MapPinPOI | null;
  zoomScale: number;
  panOffset: { x: number; y: number };
  isDragging: boolean;
  onSelectPin: (pin: MapPinPOI) => void;
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp: React.PointerEventHandler<HTMLDivElement>;
}

export const IllustratedMap: React.FC<IllustratedMapProps> = ({
  pins,
  selectedPin,
  zoomScale,
  panOffset,
  isDragging,
  onSelectPin,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => (
  <div
    className={`${styles.mapViewport} ${
      isDragging ? styles.dragging : ''
    }`}
    aria-label={TEXTS.interactive.mapAriaLabel}
    role="group"
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onPointerCancel={onPointerUp}
  >
    <div
      className={styles.mapTransform}
      style={{
        transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomScale})`,
      }}
    >
      <img
        className={styles.mapImage}
        src={IMAGES.interactive.map}
        alt=""
        draggable={false}
      />
      {pins.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          isSelected={selectedPin?.id === pin.id}
          onSelect={onSelectPin}
        />
      ))}
    </div>
  </div>
);

export default IllustratedMap;
