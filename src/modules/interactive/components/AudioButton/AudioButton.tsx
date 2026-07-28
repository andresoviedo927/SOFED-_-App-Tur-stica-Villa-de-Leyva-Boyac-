import React, { useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import type { AudioButtonProps } from './AudioButton.types';
import styles from './AudioButton.module.css';

export const AudioButton: React.FC<AudioButtonProps> = ({
  disabled = false,
}) => {
  const [audioState, setAudioState] = useState<
    'inactive' | 'active' | 'muted'
  >('inactive');
  const isAudioActive = audioState === 'active';
  const label =
    audioState === 'active'
      ? TEXTS.interactive.plazaPrincipal.audioOn
      : audioState === 'muted'
        ? TEXTS.interactive.plazaPrincipal.audioMuted
        : TEXTS.interactive.plazaPrincipal.audioOff;

  const handleToggle = () => {
    setAudioState((current) => {
      if (current === 'inactive') return 'active';
      if (current === 'active') return 'muted';
      return 'inactive';
    });
  };

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={label}
      aria-pressed={isAudioActive}
      disabled={disabled}
      data-audio-state={audioState}
      onClick={handleToggle}
    >
      <AppIcon
        name={
          audioState === 'muted'
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
