import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import narrationService, {
  subscribeToNarrationStopRequests,
} from '../services/BrowserNarrationService';
import {
  GUIDE_VOICE_CONFIG,
  GUIDE_VOICE_TIMING,
} from '../constants/voice';
import type {
  NarrationError,
  NarrationParagraph,
  NarrationStatus,
  NarrationTrackingState,
  ReadingScreenState,
} from '../types/narration.types';

interface UseNarrationOptions {
  content: readonly NarrationParagraph[];
  language?: 'es-CO';
  volume: number;
  autoStart?: boolean;
  leadInMs?: number;
  onError?: (error: NarrationError) => void;
}

interface UseNarrationResult extends ReadingScreenState {
  start: () => Promise<void>;
  stop: () => void;
  toggle: () => void;
  pause: () => void;
  resume: () => void;
  pauseAutoFollow: () => void;
  resumeAutoFollow: () => void;
}

interface NarrationSegment {
  paragraphId: string;
  sentenceId: string;
  text: string;
}

const CHARACTER_EXIT_DURATION = 400;
const COMPLETION_HOLD_DURATION = 500;
const ERROR_MESSAGE_DURATION = 2600;
const AUTO_FOLLOW_RESUME_DURATION = 4000;

const initialTrackingState: NarrationTrackingState = {
  status: 'idle',
  activeParagraphId: null,
  activeSentenceId: null,
  activeWordIndex: null,
  completedSentenceIds: [],
  isAutoFollowEnabled: true,
};

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

export const useNarration = ({
  content,
  language = 'es-CO',
  volume,
  autoStart = false,
  leadInMs = GUIDE_VOICE_TIMING.characterLeadInMs,
  onError,
}: UseNarrationOptions): UseNarrationResult => {
  const [tracking, setTracking] =
    useState<NarrationTrackingState>(initialTrackingState);
  const [selectedVoiceName, setSelectedVoiceName] =
    useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );
  const segments = useMemo<NarrationSegment[]>(
    () =>
      content.flatMap((paragraph) =>
        paragraph.sentences.map((sentence) => ({
          paragraphId: paragraph.id,
          sentenceId: sentence.id,
          text: sentence.text,
        }))
      ),
    [content]
  );
  const contentKey = useMemo(
    () =>
      segments
        .map((segment) => `${segment.sentenceId}:${segment.text}`)
        .join('|'),
    [segments]
  );
  const mountedRef = useRef(true);
  const narrationStatusRef = useRef<NarrationStatus>('idle');
  const sequenceRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const autoFollowTimerRef = useRef<number | null>(null);
  const autoStartContentRef = useRef<string | null>(null);

  const updateTracking = useCallback(
    (
      update:
        | Partial<NarrationTrackingState>
        | ((
            current: NarrationTrackingState
          ) => Partial<NarrationTrackingState>)
    ) => {
      setTracking((current) => {
        const patch =
          typeof update === 'function' ? update(current) : update;
        const next = { ...current, ...patch };
        narrationStatusRef.current = next.status;
        return next;
      });
    },
    []
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    if (autoFollowTimerRef.current !== null) {
      window.clearTimeout(autoFollowTimerRef.current);
      autoFollowTimerRef.current = null;
    }
  }, []);

  const queueAction = useCallback(
    (action: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        if (mountedRef.current) {
          action();
        }
      }, delay);
      timersRef.current.push(timer);
    },
    []
  );

  const resetTracking = useCallback(
    (status: NarrationStatus) => {
      updateTracking({
        status,
        activeParagraphId: null,
        activeSentenceId: null,
        activeWordIndex: null,
        completedSentenceIds: [],
        isAutoFollowEnabled: true,
      });
    },
    [updateTracking]
  );

  const handleError = useCallback(
    (error: NarrationError) => {
      if (!mountedRef.current) {
        return;
      }

      sequenceRef.current += 1;
      clearTimers();
      setErrorMessage(error.message);
      resetTracking('error');
      onError?.(error);
      queueAction(() => resetTracking('idle'), ERROR_MESSAGE_DURATION);
    },
    [clearTimers, onError, queueAction, resetTracking]
  );

  const start = useCallback(async () => {
    if (
      narrationStatusRef.current !== 'idle' ||
      segments.length === 0
    ) {
      return Promise.resolve();
    }

    clearTimers();
    setErrorMessage(null);
    setSelectedVoiceName(null);
    const sequence = ++sequenceRef.current;
    const firstSegment = segments[0];
    updateTracking({
      status: 'loading',
      activeParagraphId: firstSegment.paragraphId,
      activeSentenceId: firstSegment.sentenceId,
      activeWordIndex: null,
      completedSentenceIds: [],
      isAutoFollowEnabled: true,
    });

    await (async () => {
      try {
        for (let index = 0; index < segments.length; index += 1) {
          if (
            !mountedRef.current ||
            sequence !== sequenceRef.current
          ) {
            return;
          }

          const segment = segments[index];
          const nextSegment = segments[index + 1];

          updateTracking({
            activeParagraphId: segment.paragraphId,
            activeSentenceId: segment.sentenceId,
            activeWordIndex: null,
          });

          await narrationService.speak({
            text: segment.text,
            language,
            volume,
            rate: GUIDE_VOICE_CONFIG.rate,
            leadInMs:
              index === 0
                ? leadInMs
                : 0,
            onStart: () => {
              if (
                mountedRef.current &&
                sequence === sequenceRef.current
              ) {
                updateTracking({ status: 'playing' });
              }
            },
            onBoundary: (characterIndex) => {
              if (
                mountedRef.current &&
                sequence === sequenceRef.current
              ) {
                const spokenText = segment.text
                  .slice(0, characterIndex)
                  .trim();
                const activeWordIndex = spokenText
                  ? spokenText.split(/\s+/).length - 1
                  : 0;
                updateTracking({ activeWordIndex });
              }
            },
            onVoiceSelected: setSelectedVoiceName,
            onError: handleError,
          });

          if (
            !mountedRef.current ||
            sequence !== sequenceRef.current
          ) {
            return;
          }

          updateTracking((current) => ({
            completedSentenceIds: current.completedSentenceIds.includes(
              segment.sentenceId
            )
              ? current.completedSentenceIds
              : [...current.completedSentenceIds, segment.sentenceId],
          }));

          if (
            nextSegment &&
            nextSegment.paragraphId !== segment.paragraphId
          ) {
            await wait(GUIDE_VOICE_TIMING.paragraphPauseMs);
          } else if (nextSegment) {
            await wait(GUIDE_VOICE_TIMING.sentencePauseMs);
          }
        }

        if (
          !mountedRef.current ||
          sequence !== sequenceRef.current
        ) {
          return;
        }

        updateTracking({ status: 'completed' });
        queueAction(() => {
          updateTracking({
            status: 'stopping',
            activeParagraphId: null,
            activeSentenceId: null,
            activeWordIndex: null,
          });
        }, COMPLETION_HOLD_DURATION);
        queueAction(
          () => resetTracking('idle'),
          COMPLETION_HOLD_DURATION + CHARACTER_EXIT_DURATION
        );
      } catch {
        // The service reports provider errors through handleError.
      }
    })();
  }, [
    clearTimers,
    handleError,
    language,
    leadInMs,
    queueAction,
    resetTracking,
    segments,
    updateTracking,
    volume,
  ]);

  const stop = useCallback(() => {
    const status = narrationStatusRef.current;

    if (status === 'idle' || status === 'error') {
      return;
    }

    sequenceRef.current += 1;
    narrationService.stop();
    clearTimers();
    resetTracking('stopping');
    queueAction(() => resetTracking('idle'), CHARACTER_EXIT_DURATION);
  }, [clearTimers, queueAction, resetTracking]);

  useEffect(
    () => subscribeToNarrationStopRequests(stop),
    [stop]
  );

  useEffect(() => {
    if (
      !contentKey ||
      autoStartContentRef.current === contentKey
    ) {
      return;
    }

    const autoStartTimer = window.setTimeout(() => {
      if (autoStartContentRef.current === contentKey) {
        return;
      }

      autoStartContentRef.current = contentKey;

      if (autoStart) {
        void start();
      }
    }, 0);

    return () => {
      window.clearTimeout(autoStartTimer);
    };
  }, [autoStart, contentKey, start]);

  const toggle = useCallback(() => {
    if (narrationStatusRef.current === 'idle') {
      void start();
      return;
    }

    if (
      narrationStatusRef.current === 'loading' ||
      narrationStatusRef.current === 'playing' ||
      narrationStatusRef.current === 'completed'
    ) {
      stop();
    }
  }, [start, stop]);

  const pause = useCallback(() => {
    if (narrationStatusRef.current !== 'playing') {
      return;
    }

    narrationService.pause();
    updateTracking({ status: 'paused' });
  }, [updateTracking]);

  const resume = useCallback(() => {
    if (narrationStatusRef.current !== 'paused') {
      return;
    }

    narrationService.resume();
    updateTracking({ status: 'playing' });
  }, [updateTracking]);

  const resumeAutoFollow = useCallback(() => {
    if (autoFollowTimerRef.current !== null) {
      window.clearTimeout(autoFollowTimerRef.current);
      autoFollowTimerRef.current = null;
    }

    updateTracking({ isAutoFollowEnabled: true });
  }, [updateTracking]);

  const pauseAutoFollow = useCallback(() => {
    if (
      narrationStatusRef.current !== 'loading' &&
      narrationStatusRef.current !== 'playing'
    ) {
      return;
    }

    updateTracking({ isAutoFollowEnabled: false });

    if (autoFollowTimerRef.current !== null) {
      window.clearTimeout(autoFollowTimerRef.current);
    }

    autoFollowTimerRef.current = window.setTimeout(() => {
      if (mountedRef.current) {
        updateTracking({ isAutoFollowEnabled: true });
      }
      autoFollowTimerRef.current = null;
    }, AUTO_FOLLOW_RESUME_DURATION);
  }, [updateTracking]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      sequenceRef.current += 1;
      clearTimers();
      narrationService.stop();
    };
  }, [clearTimers]);

  const isNarrationActive =
    tracking.status === 'loading' ||
    tracking.status === 'playing' ||
    tracking.status === 'paused' ||
    tracking.status === 'completed';
  const isCharacterVisible =
    tracking.status === 'loading' ||
    tracking.status === 'playing' ||
    tracking.status === 'stopping' ||
    tracking.status === 'completed';

  return {
    narrationStatus: tracking.status,
    isNarrationActive,
    isCharacterVisible,
    activeParagraphId: tracking.activeParagraphId,
    activeSentenceId: tracking.activeSentenceId,
    activeWordIndex: tracking.activeWordIndex,
    completedSentenceIds: tracking.completedSentenceIds,
    isAutoFollowEnabled: tracking.isAutoFollowEnabled,
    selectedVoiceName,
    errorMessage,
    start,
    stop,
    toggle,
    pause,
    resume,
    pauseAutoFollow,
    resumeAutoFollow,
  };
};

export default useNarration;
