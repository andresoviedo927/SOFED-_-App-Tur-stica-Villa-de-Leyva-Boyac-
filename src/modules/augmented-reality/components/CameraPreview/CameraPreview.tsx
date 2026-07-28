import type { CameraPreviewProps } from './CameraPreview.types';
import styles from './CameraPreview.module.css';

export const CameraPreview = ({
  videoRef,
  fallbackImage,
  showFallback,
  fallbackAlt,
}: CameraPreviewProps) => (
  <div className={styles.preview}>
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className={styles.cameraVideo}
      aria-label={fallbackAlt}
    />
    {showFallback && (
      <img
        className={styles.fallbackImage}
        src={fallbackImage}
        alt={fallbackAlt}
        draggable={false}
      />
    )}
  </div>
);

export default CameraPreview;
