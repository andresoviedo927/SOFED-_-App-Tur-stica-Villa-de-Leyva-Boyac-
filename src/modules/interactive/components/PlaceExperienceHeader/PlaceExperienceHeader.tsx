import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Button from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import AudioButton from '../AudioButton';
import type { PlaceExperienceHeaderProps } from './PlaceExperienceHeader.types';
import styles from './PlaceExperienceHeader.module.css';

export const PlaceExperienceHeader: React.FC<
  PlaceExperienceHeaderProps
> = ({ title, onBack }) => (
  <header className={styles.header}>
    <Button
      kind="transparent"
      size="small"
      className={styles.backButton}
      ariaLabel={TEXTS.common.backLabel}
      leftIcon={
        <AppIcon
          name="fi-rr-angle-small-left"
          size={22}
          color="#F6F8FB"
        />
      }
      onClick={onBack}
    >
      {TEXTS.common.backLabel}
    </Button>

    <h1 className={styles.title}>{title}</h1>

    <div className={styles.audioSlot}>
      <AudioButton />
    </div>
  </header>
);

export default PlaceExperienceHeader;
