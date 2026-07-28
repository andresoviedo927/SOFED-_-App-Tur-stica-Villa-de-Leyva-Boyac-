import React from 'react';
import type { CharacterShadowProps } from './CharacterShadow.types';
import styles from './CharacterShadow.module.css';

export const CharacterShadow: React.FC<CharacterShadowProps> = ({
  className = '',
}) => (
  <span
    className={`${styles.shadow} ${className}`}
    aria-hidden="true"
  />
);

export default CharacterShadow;
