import VIDEOS from '@/assets/videos';
import styles from './PlaceReadingScreen.module.css';

interface NarratorCharacterProps {
  alt: string;
}

export const NarratorCharacter = ({ alt }: NarratorCharacterProps) => (
  <div className={styles.character}>
    <video
      className={styles.readingCharacter}
      src={VIDEOS.plazaPrincipal.readingCharacter}
      aria-label={alt}
      autoPlay
      muted
      playsInline
      preload="metadata"
      controls={false}
      disablePictureInPicture
    />
    <span className={styles.characterShadow} aria-hidden="true" />
  </div>
);

export default NarratorCharacter;
