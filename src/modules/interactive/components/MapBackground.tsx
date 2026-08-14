import React from 'react';
import IMAGES from '@/assets/images';
import MapCloudLayer from './MapCloudLayer';
import styles from './InteractiveMapScreen.module.css';

export const MapBackground: React.FC = () => (
  <div className={styles.background} aria-hidden="true">
    <div className={styles.backgroundContent}>
      <img
        className={styles.sun}
        src={IMAGES.interactive.sun}
        alt=""
        draggable={false}
      />
      <MapCloudLayer />
    </div>
  </div>
);

export default MapBackground;
