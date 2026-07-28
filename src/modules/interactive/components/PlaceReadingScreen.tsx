import { useEffect, useMemo, useRef, useState } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { getSavedSettings } from '@/modules/settings/services/settingsService';
import { PLAZA_PRINCIPAL_NARRATION } from '../data/plazaPrincipalNarration';
import useNarration from '../hooks/useNarration';
import ReadingCard from './ReadingCard';
import ReadingHeader from './ReadingHeader';
import styles from './PlaceReadingScreen.module.css';

interface PlaceReadingScreenProps {
  onBack: () => void;
}

export const PlaceReadingScreen = ({
  onBack,
}: PlaceReadingScreenProps) => {
  const readingTexts = TEXTS.interactive.plazaPrincipal.reading;
  const settings = useMemo(() => getSavedSettings(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [narrationErrorMessage, setNarrationErrorMessage] =
    useState<string | null>(null);

  const {
    narrationStatus,
    isNarrationActive,
    isCharacterVisible,
    activeParagraphId,
    activeSentenceId,
    completedSentenceIds,
    isAutoFollowEnabled,
    toggle,
    pauseAutoFollow,
    resumeAutoFollow,
  } = useNarration({
    content: PLAZA_PRINCIPAL_NARRATION,
    language: 'es-CO',
    volume: settings.narrationVolume / 100,
    onError: (error) =>
      setNarrationErrorMessage(
        error.code === 'voice-not-found'
          ? readingTexts.incompatibleVoice
          : error.code === 'unsupported'
            ? readingTexts.narrationUnavailable
          : readingTexts.narrationError
      ),
  });

  useEffect(() => {
    if (narrationStatus !== 'error') {
      setNarrationErrorMessage(null);
    }
  }, [narrationStatus]);

  const liveMessage =
    narrationStatus === 'playing'
      ? activeParagraphId
        ? `${readingTexts.currentReadingPosition}: ${
            PLAZA_PRINCIPAL_NARRATION.findIndex(
              (paragraph) => paragraph.id === activeParagraphId
            ) + 1
          } de ${PLAZA_PRINCIPAL_NARRATION.length}`
        : readingTexts.narrationStarted
      : narrationStatus === 'stopping' ||
          narrationStatus === 'completed'
        ? readingTexts.narrationStopped
        : '';

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `url("${IMAGES.interactive.reading.background}")`,
      }}
    >
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <ReadingHeader
          backLabel={TEXTS.common.back}
          screenTitle={readingTexts.screenTitle}
          narrationStatus={narrationStatus}
          isNarrationActive={isNarrationActive}
          startNarrationLabel={readingTexts.startNarration}
          loadingNarrationLabel={readingTexts.preparingNarration}
          stopNarrationLabel={readingTexts.stopNarration}
          onBack={onBack}
          onToggleNarration={toggle}
        />

        <ReadingCard
          articleTitle={readingTexts.articleTitle}
          content={PLAZA_PRINCIPAL_NARRATION}
          activeParagraphId={activeParagraphId}
          activeSentenceId={activeSentenceId}
          completedSentenceIds={completedSentenceIds}
          isNarrationActive={isNarrationActive}
          isAutoFollowEnabled={isAutoFollowEnabled}
          scrollAreaLabel={readingTexts.scrollAreaLabel}
          characterAlt={readingTexts.characterAlt}
          narrationStatus={narrationStatus}
          isCharacterVisible={isCharacterVisible}
          scrollRef={scrollRef}
          onManualScroll={pauseAutoFollow}
          onResumeAutoFollow={resumeAutoFollow}
        />
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {liveMessage}
      </p>

      {narrationErrorMessage && (
        <div className={styles.errorToast} role="alert">
          {narrationErrorMessage}
        </div>
      )}
    </main>
  );
};

export default PlaceReadingScreen;
