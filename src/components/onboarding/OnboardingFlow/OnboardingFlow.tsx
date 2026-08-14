import { useState } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import AppIcon from '@/components/ui/AppIcon';
import Button from '@/components/ui/Button';
import styles from './OnboardingFlow.module.css';

interface OnboardingFlowProps {
  onSkip: () => void;
  onFinish: () => void;
}

interface AnimatedTextProps {
  as: 'h1' | 'p';
  text: string;
  startDelayMs: number;
}

const ICON_ENTRY_DURATION_MS = 850;
const TEXT_START_DELAY_MS = ICON_ENTRY_DURATION_MS + 120;
const CHARACTER_STAGGER_MS = 28;
const LINE_STAGGER_MS = 160;

const STEP_IMAGES = [
  IMAGES.onboarding.discover,
  IMAGES.onboarding.augmentedReality,
  IMAGES.onboarding.traditions,
] as const;

const AnimatedText = ({
  as: Component,
  text,
  startDelayMs,
}: AnimatedTextProps) => (
  <Component>
    <span className={styles.accessibleText}>{text}</span>
    <span className={styles.typedText} aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={styles.character}
          style={{
            animationDelay: `${
              startDelayMs + index * CHARACTER_STAGGER_MS
            }ms`,
          }}
        >
          {character}
        </span>
      ))}
    </span>
  </Component>
);

const OnboardingFlow = ({
  onSkip,
  onFinish,
}: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep =
    currentStep === TEXTS.onboarding.steps.length - 1;

  const handlePrimaryAction = () => {
    if (isLastStep) {
      onFinish();
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `url(${IMAGES.onboarding.background})`,
      }}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.sliderViewport}>
        <div
          className={styles.track}
          style={{
            transform: `translate3d(-${currentStep * 100}%, 0, 0)`,
          }}
        >
          {TEXTS.onboarding.steps.map((step, index) => {
            const descriptionStartDelay =
              TEXT_START_DELAY_MS +
              Array.from(step.title).length *
                CHARACTER_STAGGER_MS +
              LINE_STAGGER_MS;

            return (
              <section
                key={step.title}
                className={styles.slide}
                data-current={index === currentStep || undefined}
                aria-hidden={index !== currentStep}
              >
                <img
                  className={styles.illustration}
                  src={STEP_IMAGES[index]}
                  alt={step.imageAlt}
                  width="240"
                  height="240"
                  draggable={false}
                />
                <div className={styles.copy}>
                  <AnimatedText
                    as="h1"
                    text={step.title}
                    startDelayMs={TEXT_START_DELAY_MS}
                  />
                  <AnimatedText
                    as="p"
                    text={step.description}
                    startDelayMs={descriptionStartDelay}
                  />
                  <div
                    className={styles.indicators}
                    aria-label={TEXTS.onboarding.indicatorsLabel}
                  >
                    {TEXTS.onboarding.steps.map(
                      (indicatorStep, indicatorIndex) => (
                        <span
                          key={indicatorStep.title}
                          className={styles.indicator}
                          data-active={
                            indicatorIndex === currentStep ||
                            undefined
                          }
                          aria-current={
                            indicatorIndex === currentStep
                              ? 'step'
                              : undefined
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <footer className={styles.actions}>
        <button
          type="button"
          className={styles.skipButton}
          data-hidden={isLastStep || undefined}
          aria-hidden={isLastStep}
          tabIndex={isLastStep ? -1 : 0}
          onClick={onSkip}
        >
          {TEXTS.onboarding.skip}
        </button>
        <Button
          kind="solid"
          size="small"
          className={styles.primaryButton}
          ariaLabel={
            isLastStep
              ? TEXTS.onboarding.finish
              : TEXTS.onboarding.nextStep
          }
          onClick={handlePrimaryAction}
          rightIcon={
            <AppIcon
              name="fi-rr-arrow-right"
              size={24}
              color="currentColor"
            />
          }
        >
          {isLastStep
            ? TEXTS.onboarding.finish
            : TEXTS.onboarding.continue}
        </Button>
      </footer>
    </main>
  );
};

export default OnboardingFlow;
