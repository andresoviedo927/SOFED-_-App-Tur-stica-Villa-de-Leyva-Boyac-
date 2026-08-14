import panoramaIcon360 from '../../../../assets/images/Panorama-Icono-360.png';
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
    <img
      className={styles.icon}
      src={panoramaIcon360}
      alt=""
      aria-hidden="true"
    />
    <span className={styles.srOnly}>{text}</span>
  </div>
);

export default PanoramaInteractionHint;
