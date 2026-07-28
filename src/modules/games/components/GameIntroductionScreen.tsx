import { useMemo } from 'react';
import type { IconName } from '@/assets/icons';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import secretPlazaRouteMock from '../data/secretPlazaRoute.mock';
import GameIdentity from './GameIdentity';
import GameIntroductionHeader from './GameIntroductionHeader';
import GameSummary from './GameSummary';
import HowItWorks from './HowItWorks';
import RewardPreview from './RewardPreview';
import RoutePointsPreview from './RoutePointsPreview';
import SafetyNotice from './SafetyNotice';
import StartRouteButton from './StartRouteButton';
import styles from './GameIntroductionScreen.module.css';

interface GameIntroductionScreenProps {
  onBack: () => void;
  onOpenSettings: () => void;
  onStartRoute: () => void;
}

export const GameIntroductionScreen = ({
  onBack,
  onOpenSettings,
  onStartRoute,
}: GameIntroductionScreenProps) => {
  const texts = TEXTS.games.secretPlazaRoute;

  const summaryItems = useMemo<
    ReadonlyArray<{ icon: IconName; label: string }>
  >(
    () => [
      { icon: 'fi-rr-map-pin', label: texts.summary.points },
      { icon: 'fi-rr-clock', label: texts.summary.duration },
      { icon: 'fi-rr-touch', label: texts.summary.mode },
      { icon: 'fi-rr-gauge', label: texts.summary.difficulty },
      { icon: 'fi-rr-map-pin', label: texts.summary.requirement },
    ],
    [texts.summary]
  );

  const steps = useMemo<
    ReadonlyArray<{
      icon: IconName;
      title: string;
      description: string;
    }>
  >(
    () => [
      { icon: 'fi-rr-map-pin', ...texts.steps.location },
      { icon: 'fi-rr-touch', ...texts.steps.visit },
      { icon: 'fi-rr-trophy', ...texts.steps.reward },
    ],
    [texts.steps]
  );

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `url("${IMAGES.games.introductionBackground}")`,
      }}
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.layout}>
        <GameIntroductionHeader
          backLabel={TEXTS.common.back}
          screenTitle={texts.screenTitle}
          settingsLabel={texts.settingsLabel}
          onBack={onBack}
          onOpenSettings={onOpenSettings}
        />

        <div
          className={styles.contentScroller}
          tabIndex={0}
          role="region"
          aria-label={texts.contentAreaLabel}
        >
          <GameIdentity
            title={secretPlazaRouteMock.title}
            subtitle={secretPlazaRouteMock.subtitle}
          />

          <GameSummary
            items={summaryItems}
            ariaLabel={texts.summaryAriaLabel}
          />

          <section className={styles.introduction}>
            {texts.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <HowItWorks title={texts.howItWorksTitle} steps={steps} />

          <div className={styles.previewGrid}>
            <RoutePointsPreview
              title={texts.pointsTitle}
              points={secretPlazaRouteMock.points}
              validationNote={texts.pointsValidationNote}
            />
            <div className={styles.secondaryColumn}>
              <RewardPreview
                title={texts.rewardTitle}
                description={texts.rewardDescription}
                disclaimer={texts.rewardDisclaimer}
              />
              <SafetyNotice message={texts.safetyMessage} />
            </div>
          </div>
        </div>

        <footer className={styles.ctaFooter}>
          <StartRouteButton
            label={texts.startButton}
            onClick={onStartRoute}
          />
        </footer>
      </div>
    </main>
  );
};

export default GameIntroductionScreen;
