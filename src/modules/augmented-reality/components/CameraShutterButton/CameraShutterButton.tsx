import { forwardRef } from 'react';
import styles from './CameraShutterButton.module.css';

interface CameraShutterButtonProps {
  label: string;
  disabled: boolean;
  onCapture: () => void;
}

const CameraShutterButton = forwardRef<
  HTMLButtonElement,
  CameraShutterButtonProps
>(({ label, disabled, onCapture }, ref) => (
  <button
    ref={ref}
    type="button"
    className={styles.shutterButton}
    aria-label={label}
    disabled={disabled}
    onClick={onCapture}
  />
));

CameraShutterButton.displayName = 'CameraShutterButton';

export default CameraShutterButton;
