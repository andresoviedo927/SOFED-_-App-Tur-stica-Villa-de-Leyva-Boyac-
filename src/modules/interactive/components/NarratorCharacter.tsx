import IMAGES from '@/assets/images';
import styles from './PlaceReadingScreen.module.css';

interface NarratorCharacterProps {
  alt: string;
}

export const NarratorCharacter = ({ alt }: NarratorCharacterProps) => (
  <div className={styles.character}>
    <img src={IMAGES.characters.guide3} alt={alt} />
    <span className={styles.characterShadow} aria-hidden="true" />
  </div>
);

export default NarratorCharacter;
