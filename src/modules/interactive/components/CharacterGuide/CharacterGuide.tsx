import React from 'react';
import CharacterShadow from '../CharacterShadow';
import type { CharacterGuideProps } from './CharacterGuide.types';
import styles from './CharacterGuide.module.css';

export const CharacterGuide: React.FC<CharacterGuideProps> = ({
  image,
  name,
}) => (
  <figure className={styles.guide}>
    <img
      className={styles.image}
      src={image}
      alt={name}
      draggable={false}
    />
    <CharacterShadow className={styles.shadow} />
  </figure>
);

export default CharacterGuide;
