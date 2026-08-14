import type { ARCharacterOverlayProps } from './ARCharacterOverlay.types';
import styles from './ARCharacterOverlay.module.css';

export const ARCharacterOverlay = ({
  src,
  alt,
  isPlacing,
  videoRef,
}: ARCharacterOverlayProps) => (
  <div
    className={styles.character}
    data-placing={isPlacing || undefined}
  >
    <span aria-hidden="true" />
    <video
      ref={videoRef}
      src={src}
      aria-label={alt}
      autoPlay
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen"
      tabIndex={-1}
      onContextMenu={(event) => event.preventDefault()}
    />
  </div>
);

export default ARCharacterOverlay;
