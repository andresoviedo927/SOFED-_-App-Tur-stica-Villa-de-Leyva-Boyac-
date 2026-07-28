import styles from './PanoramaLoadingState.module.css';

interface PanoramaLoadingStateProps {
  text: string;
}

export const PanoramaLoadingState = ({
  text,
}: PanoramaLoadingStateProps) => (
  <div className={styles.state} role="status">
    <span className={styles.spinner} aria-hidden="true" />
    <span>{text}</span>
  </div>
);

export default PanoramaLoadingState;
