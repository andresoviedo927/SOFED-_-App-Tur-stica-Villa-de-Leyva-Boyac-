import styles from './DroneVideoError.module.css';

interface DroneVideoErrorProps {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

export const DroneVideoError = ({
  title,
  message,
  retryLabel,
  onRetry,
}: DroneVideoErrorProps) => (
  <div className={styles.state} role="alert" aria-live="assertive">
    <strong>{title}</strong>
    <span>{message}</span>
    <button type="button" onClick={onRetry}>
      {retryLabel}
    </button>
  </div>
);

export default DroneVideoError;
