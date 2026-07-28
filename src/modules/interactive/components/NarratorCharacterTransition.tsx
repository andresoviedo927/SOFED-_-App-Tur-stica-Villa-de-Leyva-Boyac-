import type { NarrationStatus } from '../types/narration.types';
import NarratorCharacter from './NarratorCharacter';
import styles from './PlaceReadingScreen.module.css';

interface NarratorCharacterTransitionProps {
  status: NarrationStatus;
  isVisible: boolean;
  alt: string;
}

export const NarratorCharacterTransition = ({
  status,
  isVisible,
  alt,
}: NarratorCharacterTransitionProps) => {
  if (!isVisible) {
    return null;
  }

  const transitionClassName = [
    styles.characterTransition,
    status === 'stopping'
      ? styles.characterExiting
      : styles.characterVisible,
  ].join(' ');

  return (
    <aside className={transitionClassName}>
      <NarratorCharacter alt={alt} />
    </aside>
  );
};

export default NarratorCharacterTransition;
