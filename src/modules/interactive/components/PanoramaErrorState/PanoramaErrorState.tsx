import styles from './PanoramaErrorState.module.css';

interface PanoramaErrorStateProps {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

export const PanoramaErrorState = ({
  title,
  message,
  retryLabel,
  onRetry,
}: PanoramaErrorStateProps) => (
  <div className={styles.state} role="alert">
    <strong>{title}</strong>
    <span>{message}</span>
    <button type="button" onClick={onRetry}>
      {retryLabel}
    </button>
  </div>
);

export default PanoramaErrorState;
