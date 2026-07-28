import React from 'react';
import { ImageOverlayProps } from './ImageOverlay.types';
import styles from './ImageOverlay.module.css';

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  imageUrl,
  altText = 'Overlay image',
  overlayOpacity = 0.4,
  overlayColor = '#000000',
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={imageUrl} alt={altText} className={styles.image} />
      <div
        className={styles.overlay}
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default ImageOverlay;
