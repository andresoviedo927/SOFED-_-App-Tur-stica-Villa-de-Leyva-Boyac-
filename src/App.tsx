import { useCallback, useEffect, useRef, useState } from 'react';
import ROUTES, {
  createLodgingDetailRoute,
  createServiceDetailRoute,
  isEventDetailRoute,
  isEventDroneRoute,
  isEventPhotosRoute,
  isLodgingDetailRoute,
  isServiceDetailRoute,
  parseEventDetailRoute,
  parseEventDroneRoute,
  parseEventPhotosRoute,
  parseLodgingDetailRoute,
  parseServiceDetailRoute,
} from '@/constants/routes';
import TEXTS from '@/constants/texts';
import LandscapeLayout from '@/components/layout/LandscapeLayout';
import ScreenTransition from '@/components/layout/ScreenTransition';
import HomeContainer from '@/modules/home/components/HomeContainer';
import InteractiveView from '@/modules/interactive/components/InteractiveView';
import PlazaPrincipalSection from '@/modules/interactive/components/PlazaPrincipalSection';
import JuegoSection from '@/modules/interactive/components/JuegoSection';
import LecturaSection from '@/modules/interactive/components/LecturaSection';
import ExperiencePlaceholderScreen from '@/modules/interactive/components/ExperiencePlaceholderScreen';
import PhotoGalleryScreen from '@/modules/interactive/components/PhotoGalleryScreen';
import PanoramaScreen from '@/modules/interactive/components/PanoramaScreen';
import DroneVideoScreen from '@/modules/interactive/components/DroneVideoScreen';
import ServicesScreen from '@/modules/services-directory/components/ServicesScreen';
import ServiceDetailScreen from '@/modules/services-directory/components/ServiceDetailScreen';
import LodgingScreen from '@/modules/lodging/components/LodgingScreen';
import LodgingDetailScreen from '@/modules/lodging/components/LodgingDetailScreen';
import EventsScreen from '@/modules/events/components/EventsScreen';
import EventDetailScreen from '@/modules/events/components/EventDetailScreen';
import EventPhotoGalleryScreen from '@/modules/events/components/EventPhotoGalleryScreen';
import EventDroneVideoScreen from '@/modules/events/components/EventDroneVideoScreen';
import eventRoutes from '@/modules/events/constants/eventRoutes';
import SettingsView from '@/modules/settings/components/SettingsView';
import GamesView from '@/modules/games/components/GamesView';
import GameIntroductionScreen from '@/modules/games/components/GameIntroductionScreen';
import ARView from '@/modules/augmented-reality/components/ARView';
import AugmentedRealityCameraScreen from '@/modules/augmented-reality/components/AugmentedRealityCameraScreen';
import Sidebar from '@/components/layout/Sidebar';
import BackButtonHomeShortcut from '@/components/navigation/BackButtonHomeShortcut/BackButtonHomeShortcut';
import SoundEffectsController from '@/components/system/SoundEffectsController';

interface AppHistoryState {
  villaDeLeyvaApp: true;
  route: string;
  settingsOpen: boolean;
  canGoBack: boolean;
}

const createHistoryState = (
  route: string,
  settingsOpen: boolean,
  canGoBack = false
): AppHistoryState => ({
  villaDeLeyvaApp: true,
  route,
  settingsOpen,
  canGoBack,
});

const isAppHistoryState = (
  state: unknown
): state is AppHistoryState => {
  if (!state || typeof state !== 'object') {
    return false;
  }

  const candidate = state as Partial<AppHistoryState>;

  return (
    candidate.villaDeLeyvaApp === true &&
    typeof candidate.route === 'string' &&
    typeof candidate.settingsOpen === 'boolean' &&
    typeof candidate.canGoBack === 'boolean'
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(ROUTES.HOME);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSettingsSavingRef = useRef(false);

  useEffect(() => {
    const existingState: unknown = window.history.state;

    if (isAppHistoryState(existingState)) {
      setCurrentRoute(existingState.route);
      setIsSettingsOpen(existingState.settingsOpen);
    } else {
      const requestedPath = window.location.pathname;
      const knownRoutes = Object.values(ROUTES) as string[];
      const isSettingsPath = requestedPath === ROUTES.SETTINGS;
      const initialRoute =
        (knownRoutes.includes(requestedPath) ||
          isServiceDetailRoute(requestedPath) ||
          isLodgingDetailRoute(requestedPath) ||
          isEventDetailRoute(requestedPath) ||
          isEventPhotosRoute(requestedPath) ||
          isEventDroneRoute(requestedPath)) &&
        !isSettingsPath
          ? requestedPath
          : ROUTES.HOME;

      window.history.replaceState(
        createHistoryState(initialRoute, isSettingsPath),
        '',
        isSettingsPath ? ROUTES.SETTINGS : initialRoute
      );
      setCurrentRoute(initialRoute);
      setIsSettingsOpen(isSettingsPath);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (isSettingsSavingRef.current) {
        window.history.forward();
        return;
      }

      const nextState: unknown = event.state;

      if (isAppHistoryState(nextState)) {
        setCurrentRoute(nextState.route);
        setIsSettingsOpen(nextState.settingsOpen);
        return;
      }

      setCurrentRoute(ROUTES.HOME);
      setIsSettingsOpen(false);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = useCallback(
    (route: string) => {
      if (route === ROUTES.SETTINGS) {
        if (!isSettingsOpen) {
          window.history.pushState(
            createHistoryState(currentRoute, true, true),
            '',
            ROUTES.SETTINGS
          );
          setIsSettingsOpen(true);
        }

        return;
      }

      window.history.pushState(
        createHistoryState(route, false, true),
        '',
        route
      );
      setCurrentRoute(route);
      setIsSettingsOpen(false);
    },
    [currentRoute, isSettingsOpen]
  );

  const handleOpenSettings = useCallback(() => {
    handleNavigate(ROUTES.SETTINGS);
  }, [handleNavigate]);

  const handleSettingsBack = useCallback(() => {
    if (isSettingsSavingRef.current) {
      return;
    }

    const historyState: unknown = window.history.state;

    if (
      isAppHistoryState(historyState) &&
      historyState.settingsOpen
    ) {
      window.history.back();
      return;
    }

    setIsSettingsOpen(false);
  }, []);

  const handleSettingsSavingChange = useCallback(
    (isSaving: boolean) => {
      isSettingsSavingRef.current = isSaving;
    },
    []
  );

  const handleBackToHome = useCallback(() => {
    handleNavigate(ROUTES.HOME);
  }, [handleNavigate]);

  const handleBackToServices = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.SERVICES);
  }, [handleNavigate]);

  const handleBackToLodging = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.LODGING);
  }, [handleNavigate]);

  const handleBackToEvents = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.EVENTS);
  }, [handleNavigate]);

  const handleBackToEventDetail = useCallback(
    (eventSlug: string) => {
      const historyState: unknown = window.history.state;

      if (
        isAppHistoryState(historyState) &&
        historyState.canGoBack
      ) {
        window.history.back();
        return;
      }

      handleNavigate(eventRoutes.detail(eventSlug));
    },
    [handleNavigate]
  );

  const handleHistoryBack = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.HOME);
  }, [handleNavigate]);

  const handleBackToInteractive = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.INTERACTIVE);
  }, [handleNavigate]);

  const handleBackToPlazaPrincipal = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.PLAZA_PRINCIPAL);
  }, [handleNavigate]);

  const handleBackToGameIntroduction = useCallback(() => {
    const historyState: unknown = window.history.state;

    if (isAppHistoryState(historyState) && historyState.canGoBack) {
      window.history.back();
      return;
    }

    handleNavigate(ROUTES.PLAZA_PRINCIPAL_GAME);
  }, [handleNavigate]);

  const isInteractiveFlow = currentRoute.startsWith(
    ROUTES.INTERACTIVE
  );
  const serviceDetailParams =
    parseServiceDetailRoute(currentRoute);
  const lodgingDetailParams =
    parseLodgingDetailRoute(currentRoute);
  const eventDetailParams = parseEventDetailRoute(currentRoute);
  const eventPhotosParams = parseEventPhotosRoute(currentRoute);
  const eventDroneParams = parseEventDroneRoute(currentRoute);

  return (
    <LandscapeLayout>
      <SoundEffectsController />
      <BackButtonHomeShortcut onGoHome={handleBackToHome} />

      <ScreenTransition
        transitionKey={currentRoute}
        enabled={!isSettingsOpen}
      >
      {currentRoute === ROUTES.HOME && (
        <HomeContainer
          onNavigate={handleNavigate}
          onOpenSettings={handleOpenSettings}
        />
      )}

      {isInteractiveFlow && (
        <div
          style={{
            display:
              currentRoute === ROUTES.INTERACTIVE
                ? 'contents'
                : 'none',
          }}
        >
          <InteractiveView
            onBack={handleHistoryBack}
            onOpenSettings={handleOpenSettings}
            onOpenPlazaPrincipal={() =>
              handleNavigate(ROUTES.PLAZA_PRINCIPAL)
            }
          />
        </div>
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL && (
        <PlazaPrincipalSection
          onBack={handleBackToInteractive}
          onNavigate={handleNavigate}
          onOpenSettings={handleOpenSettings}
        />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_GAME && (
        <GameIntroductionScreen
          onBack={handleBackToPlazaPrincipal}
          onOpenSettings={handleOpenSettings}
          onStartRoute={() =>
            handleNavigate(ROUTES.PLAZA_PRINCIPAL_GAME_ROUTE)
          }
        />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_GAME_ROUTE && (
        <JuegoSection
          onBack={handleBackToGameIntroduction}
          onGoHome={handleBackToHome}
          onOpenSettings={handleOpenSettings}
          startImmediately
        />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_READING && (
        <LecturaSection onBack={handleBackToPlazaPrincipal} />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_GALLERY && (
        <ExperiencePlaceholderScreen
          title={
            TEXTS.interactive.plazaPrincipal.experiences.gallery
          }
          onBack={handleBackToPlazaPrincipal}
        />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_GALLERY_PHOTOS && (
        <PhotoGalleryScreen onBack={handleBackToPlazaPrincipal} />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_GALLERY_PANORAMA && (
        <PanoramaScreen onBack={handleBackToPlazaPrincipal} />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_GALLERY_DRONE && (
        <DroneVideoScreen onBack={handleBackToPlazaPrincipal} />
      )}

      {currentRoute === ROUTES.PLAZA_PRINCIPAL_AR && (
        <AugmentedRealityCameraScreen
          onBack={handleBackToPlazaPrincipal}
        />
      )}

      {currentRoute === ROUTES.SERVICES && (
        <ServicesScreen
          onBack={handleBackToHome}
          onOpenSettings={handleOpenSettings}
          onOpenServiceDetail={(categoryId, serviceId) =>
            handleNavigate(
              createServiceDetailRoute(categoryId, serviceId)
            )
          }
        />
      )}

      {serviceDetailParams && (
        <ServiceDetailScreen
          categoryId={serviceDetailParams.categoryId}
          serviceId={serviceDetailParams.serviceId}
          onBack={handleBackToServices}
          onOpenSettings={handleOpenSettings}
        />
      )}

      {currentRoute === ROUTES.LODGING && (
        <LodgingScreen
          onBack={handleBackToHome}
          onOpenSettings={handleOpenSettings}
          onOpenLodgingDetail={(categoryId, lodgingId) =>
            handleNavigate(
              createLodgingDetailRoute(categoryId, lodgingId)
            )
          }
        />
      )}

      {lodgingDetailParams && (
        <LodgingDetailScreen
          categoryId={lodgingDetailParams.categoryId}
          lodgingId={lodgingDetailParams.lodgingId}
          onBack={handleBackToLodging}
          onOpenSettings={handleOpenSettings}
        />
      )}

      {currentRoute === ROUTES.EVENTS && (
        <EventsScreen
          onBack={handleBackToHome}
          onOpenSettings={handleOpenSettings}
          onOpenEventDetail={(eventSlug) =>
            handleNavigate(eventRoutes.detail(eventSlug))
          }
        />
      )}

      {eventDetailParams && (
        <EventDetailScreen
          eventSlug={eventDetailParams.eventSlug}
          onBack={handleBackToEvents}
          onNavigate={handleNavigate}
        />
      )}

      {eventPhotosParams && (
        <EventPhotoGalleryScreen
          eventSlug={eventPhotosParams.eventSlug}
          onNavigate={handleNavigate}
          onBackToDetail={() =>
            handleBackToEventDetail(eventPhotosParams.eventSlug)
          }
          onBackToEvents={handleBackToEvents}
        />
      )}

      {eventDroneParams && (
        <EventDroneVideoScreen
          eventSlug={eventDroneParams.eventSlug}
          onNavigate={handleNavigate}
          onBackToDetail={() =>
            handleBackToEventDetail(eventDroneParams.eventSlug)
          }
          onBackToEvents={handleBackToEvents}
        />
      )}

      {currentRoute === ROUTES.GAMES && (
        <GamesView onBack={handleBackToHome} />
      )}

      {currentRoute === ROUTES.AUGMENTED_REALITY && (
        <ARView onBack={handleBackToHome} />
      )}
      </ScreenTransition>

      {isSettingsOpen && (
        <ScreenTransition transitionKey={ROUTES.SETTINGS} overlay>
          <SettingsView
            onBack={handleSettingsBack}
            onSavingChange={handleSettingsSavingChange}
          />
        </ScreenTransition>
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
      />
    </LandscapeLayout>
  );
}
