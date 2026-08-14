import React from 'react';
import type { PlaceCenterButtonProps } from './PlaceCenterButton.types';
import styles from './PlaceCenterButton.module.css';

export const PlaceCenterButton: React.FC<
  PlaceCenterButtonProps
> = ({ icon, label }) => (
  <div
    className={styles.button}
    role="img"
    aria-label={label}
  >
    <img className={styles.icon} src={icon} alt="" draggable={false} />
  </div>
);

export default PlaceCenterButton;
