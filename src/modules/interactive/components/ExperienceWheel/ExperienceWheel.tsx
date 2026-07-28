import React, { useEffect, useRef, useState } from 'react';
import type { PlaceExperience } from '../../types';
import ExperienceWheelItem from '../ExperienceWheelItem';
import ExperienceWheelOverlay from '../ExperienceWheelOverlay';
import PlaceCenterButton from '../PlaceCenterButton';
import type { ExperienceWheelProps } from './ExperienceWheel.types';
import styles from './ExperienceWheel.module.css';

export const ExperienceWheel: React.FC<ExperienceWheelProps> = ({
  experiences,
  centerIcon,
  placeLabel,
  activeSubmenu,
  onToggleGallery,
  onCloseSubmenu,
  onNavigate,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigationTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    },
    []
  );

  const handleSelect = (experience: PlaceExperience) => {
    if (experience.type === 'gallery') {
      setSelectedId(null);
      onToggleGallery();
      return;
    }

    onCloseSubmenu();
    setSelectedId(experience.id);
    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
    }
    navigationTimerRef.current = window.setTimeout(
      () => onNavigate(experience.destination),
      140
    );
  };

  return (
    <div className={styles.wheel} aria-label={placeLabel}>
      {experiences.map((experience) => (
        <ExperienceWheelItem
          key={experience.id}
          experience={experience}
          isSelected={
            experience.type === 'gallery'
              ? activeSubmenu === 'gallery'
              : selectedId === experience.id
          }
          controls={
            experience.type === 'gallery'
              ? 'plaza-gallery-submenu'
              : undefined
          }
          expanded={
            experience.type === 'gallery'
              ? activeSubmenu === 'gallery'
              : undefined
          }
          onSelect={handleSelect}
        />
      ))}

      <span className={`${styles.separator} ${styles.diagonalOne}`} />
      <span className={`${styles.separator} ${styles.diagonalTwo}`} />

      {activeSubmenu === 'gallery' && <ExperienceWheelOverlay />}

      <PlaceCenterButton icon={centerIcon} label={placeLabel} />
    </div>
  );
};

export default ExperienceWheel;
