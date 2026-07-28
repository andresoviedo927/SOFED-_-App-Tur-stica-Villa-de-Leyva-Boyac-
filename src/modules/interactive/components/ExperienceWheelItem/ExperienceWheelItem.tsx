import React from 'react';
import type { ExperienceWheelItemProps } from './ExperienceWheelItem.types';
import styles from './ExperienceWheelItem.module.css';

export const ExperienceWheelItem: React.FC<
  ExperienceWheelItemProps
> = ({
  experience,
  isSelected,
  controls,
  expanded,
  onSelect,
}) => (
  <button
    type="button"
    className={`${styles.item} ${styles[experience.type]}`}
    aria-label={experience.label}
    aria-pressed={isSelected}
    aria-controls={controls}
    aria-expanded={expanded}
    disabled={experience.disabled}
    onClick={() => onSelect(experience)}
  >
    <img
      className={styles.icon}
      src={experience.icon}
      alt=""
      draggable={false}
    />
  </button>
);

export default ExperienceWheelItem;
