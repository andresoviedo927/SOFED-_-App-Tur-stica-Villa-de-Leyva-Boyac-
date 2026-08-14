import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import type { AudioButtonProps } from './AudioButton.types';
import styles from './AudioButton.module.css';

export const AudioButton: React.FC<AudioButtonProps> = ({
  muted,
  onToggle,
  disabled = false,
}) => {
  const isAudioActive = !muted;
  const label = isAudioActive
    ? TEXTS.interactive.plazaPrincipal.audioOn
    : TEXTS.interactive.plazaPrincipal.audioMuted;

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      aria-pressed={isAudioActive}
      disabled={disabled}
      data-audio-state={muted ? 'muted' : 'active'}
      onClick={onToggle}
    >
      <AppIcon
        name={
          muted
            ? 'fi-rr-volume-mute'
            : 'fi-rr-audio'
        }
        size={24}
        color={isAudioActive ? '#BA5900' : '#1A212B'}
      />
    </button>
  );
};

export default AudioButton;
