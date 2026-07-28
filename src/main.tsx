import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import FinalLoader from './components/feedback/FinalLoader';
import SplashScreen from './components/feedback/SplashScreen';
import './index.css';

const SPLASH_DURATION_MS = 8000;
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

  if (stage === 'splash') return <SplashScreen />;
  if (stage === 'onboarding') {
    return (
      <OnboardingFlow
        onSkip={() => setStage('finalLoader')}
        onFinish={() => setStage('finalLoader')}
      />
    );
  }
  if (stage === 'finalLoader') return <FinalLoader />;
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppEntry />
  </StrictMode>,
);
