import type { Key } from 'react';
import type { GalleryOption } from '../data/plazaPrincipalGallery';
import styles from './GallerySubmenu.module.css';

interface GallerySubmenuButtonProps {
  key?: Key;
  option: GalleryOption;
  onSelect: (option: GalleryOption) => void;
}

export const GallerySubmenuButton = ({
  option,
  onSelect,
}: GallerySubmenuButtonProps) => (
  <button
    type="button"
    className={styles.button}
    data-position={option.position}
    aria-label={option.accessibilityLabel}
    title={option.label}
    onClick={() => onSelect(option)}
  >
    <span className={styles.gloss} aria-hidden="true" />
    <img src={option.icon} alt="" draggable={false} />
  </button>
);

export default GallerySubmenuButton;
