import React from 'react';
import IMAGES from '@/assets/images';
import styles from './InteractiveMapScreen.module.css';

export const MapBanner: React.FC = () => (
  <img
    className={styles.banner}
    src={IMAGES.interactive.banner}
    alt="Villa de Leyva"
    draggable={false}
  />
);

export default MapBanner;
