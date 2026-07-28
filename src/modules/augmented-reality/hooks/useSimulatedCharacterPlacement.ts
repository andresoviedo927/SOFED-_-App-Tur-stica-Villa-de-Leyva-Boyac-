import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CHARACTER_PLACEMENT_DURATION_MS,
  SURFACE_SCAN_DURATION_MS,
} from '../constants/augmentedReality';
import type {
  SimulatedPlacementStatus,
  UseSimulatedCharacterPlacementResult,
} from '../types';

const TICK_INTERVAL_MS = 100;

export const useSimulatedCharacterPlacement =
  (): UseSimulatedCharacterPlacementResult => {
    const [status, setStatus] =
      useState<SimulatedPlacementStatus>('idle');
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const surfaceReadyTimerRef = useRef<number | null>(null);
    const placementTimerRef = useRef<number | null>(null);

    const cancelPlacementSequence = useCallback(() => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (placementTimerRef.current !== null) {
        window.clearTimeout(placementTimerRef.current);
        placementTimerRef.current = null;
      }
      if (surfaceReadyTimerRef.current !== null) {
        window.clearTimeout(surfaceReadyTimerRef.current);
        surfaceReadyTimerRef.current = null;
      }
    }, []);

    const resetPlacementSequence = useCallback(() => {
      cancelPlacementSequence();
      setElapsedTime(0);
      setStatus('idle');
    }, [cancelPlacementSequence]);

    const startPlacementSequence = useCallback(() => {
      cancelPlacementSequence();
      const startedAt = performance.now();
      setElapsedTime(0);
      setStatus('scanning');

      intervalRef.current = window.setInterval(() => {
        const elapsed = Math.min(
          performance.now() - startedAt,
          SURFACE_SCAN_DURATION_MS
        );
        setElapsedTime(elapsed);

        if (elapsed >= SURFACE_SCAN_DURATION_MS) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setStatus('surfaceReady');
          surfaceReadyTimerRef.current = window.setTimeout(() => {
            setStatus('placing');
            surfaceReadyTimerRef.current = null;
            placementTimerRef.current = window.setTimeout(() => {
              setStatus('visible');
              placementTimerRef.current = null;
            }, CHARACTER_PLACEMENT_DURATION_MS);
          }, 120);
        }
      }, TICK_INTERVAL_MS);
    }, [cancelPlacementSequence]);

    useEffect(
      () => cancelPlacementSequence,
      [cancelPlacementSequence]
    );

    return {
      status,
      elapsedTime,
      progress: Math.min(
        1,
        elapsedTime / SURFACE_SCAN_DURATION_MS
      ),
      startPlacementSequence,
      resetPlacementSequence,
      cancelPlacementSequence,
    };
  };

export default useSimulatedCharacterPlacement;
