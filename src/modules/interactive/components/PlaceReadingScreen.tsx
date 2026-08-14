import { useEffect, useRef, useState } from 'react';
import IMAGES from '@/assets/images';
import VIDEOS from '@/assets/videos';
import TEXTS from '@/constants/texts';
import useSavedSettings from '@/modules/settings/hooks/useSavedSettings';
import { PLAZA_PRINCIPAL_NARRATION } from '../data/plazaPrincipalNarration';
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
  const settings = useSavedSettings();
  const characterVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(
    () => !settings.automaticNarration
  );

  useEffect(() => {
    setIsMuted(!settings.automaticNarration);
  }, [settings.automaticNarration]);

  useEffect(() => {
    const video = characterVideoRef.current;
    if (!video) {
      return;
    }

    video.volume = Math.min(
      1,
      Math.max(0, settings.narrationVolume / 100)
    );
    video.muted = isMuted;
  }, [isMuted, settings.narrationVolume]);

  useEffect(() => {
    const video = characterVideoRef.current;
    if (!video) {
      return undefined;
    }

    let disposed = false;

    const detachAutoplayRetry = () => {
      window.removeEventListener('pointerdown', attemptPlayback, true);
      window.removeEventListener('keydown', attemptPlayback, true);
    };

    const attemptPlayback = () => {
      if (disposed || video.ended) {
        detachAutoplayRetry();
        return;
      }

      void video
        .play()
        .then(detachAutoplayRetry)
        .catch(() => {
          // A user gesture will retry playback if audible autoplay is blocked.
        });
    };

    window.addEventListener('pointerdown', attemptPlayback, true);
    window.addEventListener('keydown', attemptPlayback, true);
    attemptPlayback();

    return () => {
      disposed = true;
      detachAutoplayRetry();
      video.pause();
    };
  }, []);

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `linear-gradient(rgba(26, 33, 43, 0.6), rgba(26, 33, 43, 0.6)), url("${IMAGES.interactive.reading.background}")`,
      }}
    >
      <ReadingHeader
        backLabel={TEXTS.common.back}
        screenTitle={readingTexts.screenTitle}
        isMuted={isMuted}
        muteLabel={TEXTS.interactive.plazaPrincipal.audioOn}
        unmuteLabel={TEXTS.interactive.plazaPrincipal.audioOff}
        onBack={onBack}
        onToggleAudio={() => setIsMuted((current) => !current)}
      />

      <ReadingCard
        articleTitle={readingTexts.articleTitle}
        content={PLAZA_PRINCIPAL_NARRATION}
        characterVideo={VIDEOS.plazaPrincipal.readingCharacter}
        characterLabel={readingTexts.characterAlt}
        isMuted={isMuted}
        characterVideoRef={characterVideoRef}
      />
    </main>
  );
};

export default PlaceReadingScreen;
