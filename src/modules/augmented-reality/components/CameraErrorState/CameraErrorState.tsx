import styles from './CameraErrorState.module.css';

interface CameraErrorStateProps {
  title: string;
  message: string;
  retryLabel: string;
  backLabel: string;
  demoLabel: string;
  onRetry: () => void;
  onBack: () => void;
  onDemo: () => void;
}

const CameraErrorState = ({
  title,
  message,
  retryLabel,
  backLabel,
  demoLabel,
  onRetry,
  onBack,
  onDemo,
}: CameraErrorStateProps) => (
  <div className={styles.errorState} role="alert">
    <div className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        !
      </span>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className={styles.actions}>
        <button type="button" onClick={onRetry}>
          {retryLabel}
        </button>
        <button type="button" onClick={onDemo}>
          {demoLabel}
        </button>
        <button
          type="button"
          aria-label={backLabel}
          onClick={onBack}
        >
          {backLabel}
        </button>
      </div>
    </div>
  </div>
);

export default CameraErrorState;
