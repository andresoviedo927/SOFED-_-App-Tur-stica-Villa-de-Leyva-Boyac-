import styles from './EventNarratorCharacter.module.css';

interface EventNarratorCharacterProps {
  src: string;
  alt: string;
  isExiting: boolean;
}

export const EventNarratorCharacter = ({
  src,
  alt,
  isExiting,
}: EventNarratorCharacterProps) => (
  <div
    className={styles.character}
    data-exiting={isExiting || undefined}
  >
    <img src={src} alt={alt} draggable={false} />
  </div>
);

export default EventNarratorCharacter;
