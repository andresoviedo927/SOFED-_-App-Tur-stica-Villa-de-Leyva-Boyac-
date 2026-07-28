import AppIcon from '@/components/ui/AppIcon';
import styles from './DirectoryMapControls.module.css';

interface DirectoryMapControlsProps {
  resetLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  disableZoomIn: boolean;
  disableZoomOut: boolean;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const DirectoryMapControls = ({
  resetLabel,
  zoomInLabel,
  zoomOutLabel,
  disableZoomIn,
  disableZoomOut,
  onReset,
  onZoomIn,
  onZoomOut,
}: DirectoryMapControlsProps) => (
  <div
    className={styles.controls}
    onPointerDown={(event) => event.stopPropagation()}
  >
    <button
      type="button"
      className={styles.single}
      aria-label={resetLabel}
      title={resetLabel}
      onClick={onReset}
    >
      <AppIcon name="fi-rr-target" size={16} color="currentColor" />
    </button>
    <div className={styles.zoomGroup}>
      <button
        type="button"
        aria-label={zoomInLabel}
        disabled={disableZoomIn}
        onClick={onZoomIn}
      >
        <AppIcon name="fi-rr-plus-small" size={16} color="currentColor" />
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        aria-label={zoomOutLabel}
        disabled={disableZoomOut}
        onClick={onZoomOut}
      >
        <AppIcon name="fi-rr-minus-small" size={16} color="currentColor" />
      </button>
    </div>
  </div>
);

export default DirectoryMapControls;
