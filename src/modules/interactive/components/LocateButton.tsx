import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@/components/ui/IconButton';
import TEXTS from '@/constants/texts';
import type { LocateState } from '../types';
import styles from './InteractiveMapScreen.module.css';

interface LocateButtonProps {
  onLocate: () => void;
}

const STATE_LABELS: Record<LocateState, string> = {
  default: TEXTS.interactive.locateMap,
  loading: TEXTS.interactive.resettingMap,
  success: TEXTS.interactive.mapCentered,
};

export const LocateButton: React.FC<LocateButtonProps> = ({ onLocate }) => {
  const [state, setState] = useState<LocateState>('default');
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const handleLocate = () => {
    if (state === 'loading') return;

    setState('loading');
    timeoutRef.current = window.setTimeout(() => {
      onLocate();
      setState('success');
      timeoutRef.current = window.setTimeout(
        () => setState('default'),
        900
      );
    }, 450);
  };

  return (
    <IconButton
      iconName={
        state === 'loading'
          ? 'fi-rr-target'
          : state === 'success'
            ? 'fi-rr-check'
            : 'fi-rr-target'
      }
      iconSize={22}
      iconColor="#1A212B"
      variant="transparent"
      ariaLabel={STATE_LABELS[state]}
      isDisabled={state === 'loading'}
      className={`${styles.controlButton} ${
        state === 'loading' ? styles.resetting : ''
      }`}
      onClick={handleLocate}
    />
  );
};

export default LocateButton;
