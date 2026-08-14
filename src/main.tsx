import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ScreenTransition from './components/layout/ScreenTransition';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import FinalLoader from './components/feedback/FinalLoader';
import SplashScreen from './components/feedback/SplashScreen';
import './index.css';

const SPLASH_DURATION_MS = 4000;
const FINAL_LOADER_DURATION_MS = 1000;

type StartupStage =
  | 'splash'
  | 'onboarding'
  | 'finalLoader'
  | 'app';

const AppEntry = () => {
  const [stage, setStage] = useState<StartupStage>('splash');

  useEffect(() => {
    if (stage !== 'splash') return;

    const splashTimer = window.setTimeout(() => {
      setStage('onboarding');
    }, SPLASH_DURATION_MS);

    return () => window.clearTimeout(splashTimer);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'finalLoader') return;

    const loaderTimer = window.setTimeout(() => {
      setStage('app');
    }, FINAL_LOADER_DURATION_MS);

    return () => window.clearTimeout(loaderTimer);
  }, [stage]);

  if (stage === 'splash') {
    return (
      <ScreenTransition transitionKey={stage}>
        <SplashScreen />
      </ScreenTransition>
    );
  }
  if (stage === 'onboarding') {
    return (
      <ScreenTransition transitionKey={stage}>
        <OnboardingFlow
          onSkip={() => setStage('finalLoader')}
          onFinish={() => setStage('finalLoader')}
        />
      </ScreenTransition>
    );
  }
  if (stage === 'finalLoader') {
    return (
      <ScreenTransition transitionKey={stage}>
        <FinalLoader />
      </ScreenTransition>
    );
  }
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppEntry />
  </StrictMode>,
);
