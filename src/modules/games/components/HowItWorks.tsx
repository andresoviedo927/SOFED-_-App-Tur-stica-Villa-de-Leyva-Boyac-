import type { IconName } from '@/assets/icons';
import GameStep from './GameStep';
import styles from './GameIntroductionScreen.module.css';

interface HowItWorksProps {
  title: string;
  steps: ReadonlyArray<{
    icon: IconName;
    title: string;
    description: string;
  }>;
}

export const HowItWorks = ({ title, steps }: HowItWorksProps) => (
  <section className={styles.informationSection}>
    <h3>{title}</h3>
    <ol className={styles.steps}>
      {steps.map((step, index) => (
        <GameStep
          key={step.title}
          order={index + 1}
          icon={step.icon}
          title={step.title}
          description={step.description}
        />
      ))}
    </ol>
  </section>
);

export default HowItWorks;
