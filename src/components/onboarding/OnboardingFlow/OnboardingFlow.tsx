import { useState } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import AppIcon from '@/components/ui/AppIcon';
import styles from './OnboardingFlow.module.css';

interface OnboardingFlowProps {
  onSkip: () => void;
  onFinish: () => void;
}

const STEP_IMAGES = [
  IMAGES.onboarding.discover,
  IMAGES.onboarding.augmentedReality,
  IMAGES.onboarding.traditions,
] as const;

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
          {TEXTS.onboarding.steps.map((step, index) => (
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
                <h1>{step.title}</h1>
                <p>{step.description}</p>
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
                          indicatorIndex === currentStep || undefined
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
          ))}
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
        <button
          type="button"
          className={styles.primaryButton}
          data-final={isLastStep || undefined}
          aria-label={
            isLastStep
              ? TEXTS.onboarding.finish
              : TEXTS.onboarding.nextStep
          }
          onClick={handlePrimaryAction}
        >
          <span>
            {isLastStep
              ? TEXTS.onboarding.finish
              : TEXTS.onboarding.continue}
          </span>
          <AppIcon
            name="fi-rr-arrow-right"
            size={24}
            color="#FFFFFF"
          />
        </button>
      </footer>
    </main>
  );
};

export default OnboardingFlow;
