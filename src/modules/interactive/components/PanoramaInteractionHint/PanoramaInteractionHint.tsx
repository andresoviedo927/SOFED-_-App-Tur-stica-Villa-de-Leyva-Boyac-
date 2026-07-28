import styles from './PanoramaInteractionHint.module.css';

interface PanoramaInteractionHintProps {
  text: string;
  isVisible: boolean;
}

export const PanoramaInteractionHint = ({
  text,
  isVisible,
}: PanoramaInteractionHintProps) => (
  <div
    className={styles.hint}
    data-visible={isVisible}
    aria-hidden={!isVisible}
  >
    <span className={styles.icon} aria-hidden="true">
      360°
    </span>
    <span className={styles.srOnly}>{text}</span>
  </div>
);

export default PanoramaInteractionHint;
