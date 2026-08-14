import type { Key } from 'react';
import styles from './GallerySubmenu.module.css';

export interface GallerySubmenuButtonOption {
  icon: string;
  label: string;
  accessibilityLabel: string;
  position: 'top' | 'middle' | 'bottom';
}

interface GallerySubmenuButtonProps<
  TOption extends GallerySubmenuButtonOption,
> {
  key?: Key;
  option: TOption;
  disabled?: boolean;
  unavailableMessage?: string;
  onSelect: (option: TOption) => void;
}

export const GallerySubmenuButton = <
  TOption extends GallerySubmenuButtonOption,
>({
  option,
  disabled = false,
  unavailableMessage,
  onSelect,
}: GallerySubmenuButtonProps<TOption>) => (
  <button
    type="button"
    className={styles.button}
    data-position={option.position}
    aria-label={option.accessibilityLabel}
    aria-disabled={disabled}
    title={disabled ? unavailableMessage : option.label}
    disabled={disabled}
    onClick={() => onSelect(option)}
  >
    <span className={styles.gloss} aria-hidden="true" />
    <img src={option.icon} alt="" draggable={false} />
  </button>
);

export default GallerySubmenuButton;
