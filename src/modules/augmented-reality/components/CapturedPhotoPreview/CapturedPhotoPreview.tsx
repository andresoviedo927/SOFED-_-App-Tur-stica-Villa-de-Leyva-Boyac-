import { useEffect, useRef } from 'react';
import styles from './CapturedPhotoPreview.module.css';

interface CapturedPhotoPreviewProps {
  photoUrl: string;
  alt: string;
  retakeLabel: string;
  saveLabel: string;
  onRetake: () => void;
  onSave: () => void;
}

const CapturedPhotoPreview = ({
  photoUrl,
  alt,
  retakeLabel,
  saveLabel,
  onRetake,
  onSave,
}: CapturedPhotoPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.preview}
      tabIndex={-1}
    >
      <img className={styles.photo} src={photoUrl} alt={alt} />
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onRetake}
        >
          {retakeLabel}
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onSave}
        >
          {saveLabel}
        </button>
      </div>
    </div>
  );
};

export default CapturedPhotoPreview;
