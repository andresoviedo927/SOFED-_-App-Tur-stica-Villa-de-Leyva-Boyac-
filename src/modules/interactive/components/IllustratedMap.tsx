import React from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import type { MapPinPOI } from '../types';
import MapPin from './MapPin';
import styles from './InteractiveMapScreen.module.css';

interface IllustratedMapProps {
  pins: MapPinPOI[];
  zoomScale: number;
  panOffset: { x: number; y: number };
  isDragging: boolean;
  onOpenPlazaPrincipal?: () => void;
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp: React.PointerEventHandler<HTMLDivElement>;
}

export const IllustratedMap: React.FC<IllustratedMapProps> = ({
  pins,
  zoomScale,
  panOffset,
  isDragging,
  onOpenPlazaPrincipal,
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
      className={`${styles.mapTransform} ${styles.mapImageLayer}`}
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
    </div>
    <div
      className={`${styles.mapTransform} ${styles.pinLayer}`}
      style={{
        transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomScale})`,
      }}
    >
      {pins.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          onOpenDestination={
            pin.destination ? onOpenPlazaPrincipal : undefined
          }
        />
      ))}
    </div>
  </div>
);

export default IllustratedMap;
