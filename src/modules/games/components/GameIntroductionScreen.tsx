import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import secretPlazaRouteMock from '../data/secretPlazaRoute.mock';
import GameIdentity from './GameIdentity';
import GameIntroductionHeader from './GameIntroductionHeader';
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

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `linear-gradient(rgba(26, 33, 43, 0.6), rgba(26, 33, 43, 0.6)), url("${IMAGES.settings.pageBackground}")`,
      }}
    >
      <GameIntroductionHeader
        backLabel={TEXTS.common.back}
        screenTitle={texts.screenTitle}
        settingsLabel={texts.settingsLabel}
        onBack={onBack}
        onOpenSettings={onOpenSettings}
        showSettings={false}
      />

      <section
        className={styles.gameContent}
        aria-label={texts.contentAreaLabel}
      >
        <GameIdentity
          title={secretPlazaRouteMock.title}
          subtitle={secretPlazaRouteMock.subtitle}
        />

        <div
          className={styles.routeStepper}
          aria-label={texts.stepperLabel}
        >
          <p className={styles.stepperPrompt}>{texts.stepperPrompt}</p>
          <ol className={styles.stepperList}>
            {texts.stepperPoints.map((point, index) => (
              <li className={styles.stepperItem} key={point}>
                <span className={styles.stepperNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.stepperLabel}>{point}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.rewardMessage}>{texts.rewardMessage}</p>

        <StartRouteButton
          label={texts.startButton}
          onClick={onStartRoute}
        />
      </section>
    </main>
  );
};

export default GameIntroductionScreen;
