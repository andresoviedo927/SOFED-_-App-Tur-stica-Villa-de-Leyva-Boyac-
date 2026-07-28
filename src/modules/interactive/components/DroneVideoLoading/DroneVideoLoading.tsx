import styles from './DroneVideoLoading.module.css';

interface DroneVideoLoadingProps {
  text: string;
}

export const DroneVideoLoading = ({
  text,
}: DroneVideoLoadingProps) => (
  <div className={styles.state} role="status">
    <span className={styles.spinner} aria-hidden="true" />
    <span className={styles.srOnly}>{text}</span>
  </div>
);

export default DroneVideoLoading;
