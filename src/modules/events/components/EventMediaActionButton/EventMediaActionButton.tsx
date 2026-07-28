import styles from './EventMediaActionButton.module.css';
import type { EventMediaActionButtonProps } from './EventMediaActionButton.types';

export const EventMediaActionButton = ({
  type,
  icon,
  label,
  disabled = false,
  unavailableMessage,
  onClick,
}: EventMediaActionButtonProps) => (
  <button
    type="button"
    className={styles.button}
    data-media-type={type}
    aria-label={label}
    aria-disabled={disabled}
    title={disabled ? unavailableMessage : label}
    disabled={disabled}
    onClick={onClick}
  >
    <img src={icon} alt="" draggable={false} aria-hidden="true" />
  </button>
);

export default EventMediaActionButton;
