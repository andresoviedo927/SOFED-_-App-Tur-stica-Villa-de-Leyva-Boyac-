import React from 'react';
import IMAGES from '@/assets/images';
import type { MapPinPOI } from '../types';
import styles from './InteractiveMapScreen.module.css';

interface MapPinProps {
  pin: MapPinPOI;
  isSelected: boolean;
  onSelect: (pin: MapPinPOI) => void;
}

export const MapPin: React.FC<MapPinProps> = ({
  pin,
  isSelected,
  onSelect,
}) => {
  const lastDirectActivationRef = React.useRef(
    Number.NEGATIVE_INFINITY
  );

  const handlePointerUp = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    if (event.pointerType === 'mouse') {
      return;
    }

    lastDirectActivationRef.current = performance.now();
    onSelect(pin);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    const wasJustActivatedByTouch =
      performance.now() - lastDirectActivationRef.current < 500;

    if (!wasJustActivatedByTouch) {
      onSelect(pin);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    lastDirectActivationRef.current = performance.now();
    onSelect(pin);
  };

  return (
    <button
      type="button"
      className={styles.mapPin}
      style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
      aria-label={`${pin.title}. ${pin.category}`}
      aria-pressed={isSelected}
      disabled={pin.disabled}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerUp={handlePointerUp}
      onPointerCancel={(event) => event.stopPropagation()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <img
        className={styles.pinImage}
        src={IMAGES.interactive.pins[pin.color]}
        alt=""
        draggable={false}
      />
      <span className={styles.pinTooltip} role="status">
        {pin.title}
      </span>
    </button>
  );
};

export default MapPin;
