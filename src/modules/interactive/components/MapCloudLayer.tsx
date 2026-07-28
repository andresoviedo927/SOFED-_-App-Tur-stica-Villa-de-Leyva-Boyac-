import React from 'react';
import IMAGES from '@/assets/images';
import styles from './InteractiveMapScreen.module.css';

export const MapCloudLayer: React.FC = () => (
  <div className={styles.cloudLayer} aria-hidden="true">
    {IMAGES.interactive.clouds.map((cloud, index) => (
      <img
        key={cloud}
        src={cloud}
        alt=""
        draggable={false}
        className={`${styles.cloud} ${styles[`cloud${index + 1}`]}`}
      />
    ))}
  </div>
);

export default MapCloudLayer;
