import React from 'react';
import type { PlaceCenterButtonProps } from './PlaceCenterButton.types';
import styles from './PlaceCenterButton.module.css';

export const PlaceCenterButton: React.FC<
  PlaceCenterButtonProps
> = ({ icon, label }) => (
  <button
    type="button"
    className={styles.button}
    aria-label={label}
    aria-current="location"
  >
    <span className={styles.gloss} aria-hidden="true" />
    <img className={styles.icon} src={icon} alt="" draggable={false} />
  </button>
);

export default PlaceCenterButton;
