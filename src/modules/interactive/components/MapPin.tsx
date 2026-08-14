import React, { useId, useState } from 'react';
import IMAGES from '@/assets/images';
import type { MapPinPOI } from '../types';
import styles from './InteractiveMapScreen.module.css';

interface MapPinProps {
  pin: MapPinPOI;
  onOpenDestination?: () => void;
}

export const MapPin: React.FC<MapPinProps> = ({
  pin,
  onOpenDestination,
}) => {
  const tooltipId = useId();
  const [isTouchTooltipOpen, setIsTouchTooltipOpen] =
    useState(false);
  const className = `${styles.mapPin} ${
    pin.destination ? styles.mapPinDirect : styles.mapPinStatic
  } ${
    isTouchTooltipOpen ? styles.touchTooltipOpen : ''
  }`;
  const position = {
    left: `${pin.xPercent}%`,
    top: `${pin.yPercent}%`,
  };
  const content = (
    <>
      <span className={styles.pinVisual} aria-hidden="true">
        <img
          className={styles.pinImage}
          src={IMAGES.interactive.pins[pin.color]}
          alt=""
          draggable={false}
        />
      </span>
      <span
        id={tooltipId}
        className={styles.pinTooltip}
        role="tooltip"
      >
        {pin.title}
      </span>
    </>
  );

  const handlePointerUp = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.pointerType === 'touch') {
      if (!isTouchTooltipOpen) {
        setIsTouchTooltipOpen(true);
        return;
      }

      if (!pin.destination) {
        return;
      }
    }

    if (pin.destination) {
      setIsTouchTooltipOpen(false);
      onOpenDestination?.();
    }
  };

  if (!pin.destination) {
    return (
      <span
        className={className}
        style={position}
        tabIndex={0}
        aria-describedby={tooltipId}
        data-map-pin
        onPointerUp={handlePointerUp}
        onPointerCancel={(event) => event.stopPropagation()}
        onBlur={() => setIsTouchTooltipOpen(false)}
      >
        {content}
      </span>
    );
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onOpenDestination?.();
  };

  const handleDestinationPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setIsTouchTooltipOpen(false);
    onOpenDestination?.();
  };

  return (
    <button
      type="button"
      className={className}
      style={position}
      aria-label="Abrir Plaza Mayor"
      aria-describedby={tooltipId}
      data-map-pin
      onPointerDownCapture={handleDestinationPointerDown}
      onPointerUp={(event) => event.stopPropagation()}
      onPointerCancel={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsTouchTooltipOpen(false)}
    >
      {content}
    </button>
  );
};

export default MapPin;
