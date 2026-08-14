import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Button from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import AudioButton from '../AudioButton';
import type { PlaceExperienceHeaderProps } from './PlaceExperienceHeader.types';
import styles from './PlaceExperienceHeader.module.css';

export const PlaceExperienceHeader: React.FC<
  PlaceExperienceHeaderProps
> = ({
  title,
  onBack,
  isAudioMuted = true,
  onAudioToggle,
  hideAudio = false,
  onOpenSettings,
}) => (
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
      {onOpenSettings ? (
        <SettingsButton onClick={onOpenSettings} />
      ) : !hideAudio ? (
        <AudioButton
          muted={isAudioMuted}
          disabled={!onAudioToggle}
          onToggle={onAudioToggle}
        />
      ) : null}
    </div>
  </header>
);

export default PlaceExperienceHeader;
