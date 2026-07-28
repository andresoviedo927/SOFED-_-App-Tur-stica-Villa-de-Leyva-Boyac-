import type { ARCharacterOverlayProps } from './ARCharacterOverlay.types';
import styles from './ARCharacterOverlay.module.css';

export const ARCharacterOverlay = ({
  src,
  alt,
  isPlacing,
}: ARCharacterOverlayProps) => (
  <div
    className={styles.character}
    data-placing={isPlacing || undefined}
  >
    <span aria-hidden="true" />
    <img src={src} alt={alt} draggable={false} />
  </div>
);

export default ARCharacterOverlay;
