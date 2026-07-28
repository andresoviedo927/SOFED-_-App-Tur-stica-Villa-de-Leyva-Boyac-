import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import GameIntroductionHeader from '@/modules/games/components/GameIntroductionHeader';
import RouteMapImage from '@/modules/games/components/RouteMapImage';
import {
  SECRET_ROUTE_POINTS,
  SECRET_ROUTE_TOTAL_POINTS,
} from '@/modules/games/data/secretRoutePoints';
import type { SecretRouteStatus } from '@/modules/games/types/game.types';
import styles from './JuegoSection.module.css';

interface JuegoSectionProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  startImmediately?: boolean;
}

type ExperienceView = 'route' | 'completion' | 'reward';

const COMPLETED_MAP_HOLD_MS = 1000;
const POINT_COMPLETED_HOLD_MS = 650;
const MIN_MAP_SCALE = 0.86;

export const JuegoSection = ({
  onBack,
  onOpenSettings,
}: JuegoSectionProps) => {
  const texts = TEXTS.games.secretPlazaRoute.routeExperience;
  const [routeStatus, setRouteStatus] =
    useState<SecretRouteStatus>('pointActive');
  const [completedPoints, setCompletedPoints] = useState(0);
  const [activePoint, setActivePoint] = useState(1);
  const [mapScale, setMapScale] = useState(1);
  const [view, setView] = useState<ExperienceView>('route');
  const [isPointCardOpen, setIsPointCardOpen] = useState(false);
  const [isReferenceMapOpen, setIsReferenceMapOpen] =
    useState(false);
  const [announcement, setAnnouncement] = useState(
    `${texts.currentPoint}: 1 de ${SECRET_ROUTE_TOTAL_POINTS}`
  );
  const [toastMessage, setToastMessage] = useState<string | null>(
    null
  );
  const transitioningRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const currentPoint = useMemo(
    () =>
      SECRET_ROUTE_POINTS.find((point) => point.id === activePoint) ??
      SECRET_ROUTE_POINTS[0],
    [activePoint]
  );
  const progressPercentage = Math.round(
    (completedPoints / SECRET_ROUTE_TOTAL_POINTS) * 100
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const queueAction = useCallback(
    (action: () => void, delay: number) => {
      const timer = window.setTimeout(action, delay);
      timersRef.current.push(timer);
    },
    []
  );

  const showToast = useCallback(
    (message: string) => {
      setToastMessage(message);
      queueAction(() => setToastMessage(null), 2400);
    },
    [queueAction]
  );

  useEffect(
    () => () => {
      clearTimers();
    },
    [clearTimers]
  );

  const handleVisitPoint = () => {
    if (
      transitioningRef.current ||
      routeStatus === 'paused' ||
      routeStatus === 'routeCompleted'
    ) {
      return;
    }

    setIsPointCardOpen(true);
    setAnnouncement(
      `${texts.pointCardTitle} ${activePoint}: ${currentPoint.name}`
    );
  };

  const handleCompletePoint = () => {
    if (transitioningRef.current) {
      return;
    }

    transitioningRef.current = true;
    setIsPointCardOpen(false);
    setCompletedPoints(currentPoint.id);
    setRouteStatus('pointCompleted');
    setAnnouncement(
      `${texts.pointCompleted} ${currentPoint.id}. ${texts.continueNext}`
    );

    if (currentPoint.id === SECRET_ROUTE_TOTAL_POINTS) {
      setRouteStatus('routeCompleted');
      setAnnouncement(texts.routeCompletedAnnouncement);
      queueAction(() => {
        transitioningRef.current = false;
        setView('completion');
      }, COMPLETED_MAP_HOLD_MS);
      return;
    }

    showToast(
      currentPoint.id === SECRET_ROUTE_TOTAL_POINTS - 1
        ? texts.lastStopUnlocked
        : `${texts.pointCompleted} ${currentPoint.id}. ${texts.continueNext}`
    );

    queueAction(() => {
      const nextPoint = currentPoint.id + 1;
      setActivePoint(nextPoint);
      setRouteStatus('pointActive');
      setAnnouncement(
        `${texts.currentPoint}: ${nextPoint} de ${SECRET_ROUTE_TOTAL_POINTS}`
      );
      transitioningRef.current = false;
    }, POINT_COMPLETED_HOLD_MS);
  };

  const handleOpenSettings = () => {
    setRouteStatus('paused');
    setAnnouncement(texts.resumeRoute);
    onOpenSettings?.();
  };

  const handleResume = () => {
    setRouteStatus('pointActive');
    setAnnouncement(
      `${texts.currentPoint}: ${activePoint} de ${SECRET_ROUTE_TOTAL_POINTS}`
    );
  };

  const handleResetMap = () => {
    setMapScale(1);
    setAnnouncement(texts.routeReset);
    showToast(texts.routeReset);
  };

  const mapAlt =
    routeStatus === 'routeCompleted'
      ? texts.completedMapAlt
      : texts.activeMapAlt;
  const statusMessage =
    routeStatus === 'pointCompleted'
      ? `${texts.pointCompleted} ${completedPoints}. ${texts.continueNext}`
      : null;

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
          onOpenSettings={handleOpenSettings}
        />

        {view === 'route' && (
          <section
            className={styles.mapArea}
            aria-label={texts.screenTitle}
          >
            <RouteMapImage
              status={routeStatus}
              completedPoints={completedPoints}
              activePoint={activePoint}
              alt={mapAlt}
              scale={mapScale}
            />

            <aside className={styles.progressPanel}>
              <div className={styles.progressHeading}>
                <span>
                  {texts.currentPoint}: {activePoint} de{' '}
                  {SECRET_ROUTE_TOTAL_POINTS}
                </span>
                <strong>{progressPercentage} %</strong>
              </div>

              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label={texts.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
              >
                <span
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <dl className={styles.progressDetails}>
                <div>
                  <dt>{texts.nextDestination}</dt>
                  <dd>{currentPoint.name}</dd>
                </div>
                <div>
                  <dt>{texts.experienceMode}</dt>
                  <dd>{texts.simulatedMode}</dd>
                </div>
              </dl>

              <Button
                kind="solid"
                size="small"
                className={styles.validateButton}
                disabled={
                  routeStatus === 'pointCompleted' ||
                  routeStatus === 'routeCompleted'
                }
                ariaLabel={`${texts.visitPoint} ${activePoint}: ${currentPoint.name}`}
                onClick={
                  routeStatus === 'paused'
                    ? handleResume
                    : handleVisitPoint
                }
              >
                {routeStatus === 'paused'
                  ? texts.resumeRoute
                  : `${texts.visitPoint} ${activePoint}`}
              </Button>
            </aside>

            <div className={styles.mapControls}>
              <button
                type="button"
                className={styles.locateButton}
                aria-label={texts.locate}
                title={texts.locate}
                onClick={handleResetMap}
              >
                <AppIcon
                  name="fi-rr-target"
                  size={16}
                  color="#1A212B"
                />
              </button>

              <div className={styles.zoomControls}>
                <button
                  type="button"
                  aria-label={texts.zoomIn}
                  title={texts.zoomIn}
                  disabled={mapScale >= 1}
                  onClick={() =>
                    setMapScale((current) =>
                      Math.min(1, current + 0.07)
                    )
                  }
                >
                  <AppIcon
                    name="fi-rr-plus-small"
                    size={16}
                    color="#1A212B"
                  />
                </button>
                <span aria-hidden="true" />
                <button
                  type="button"
                  aria-label={texts.zoomOut}
                  title={texts.zoomOut}
                  disabled={mapScale <= MIN_MAP_SCALE}
                  onClick={() =>
                    setMapScale((current) =>
                      Math.max(MIN_MAP_SCALE, current - 0.07)
                    )
                  }
                >
                  <AppIcon
                    name="fi-rr-minus-small"
                    size={16}
                    color="#1A212B"
                  />
                </button>
              </div>
            </div>

            {statusMessage && (
              <div className={styles.statusMessage} role="status">
                {statusMessage}
              </div>
            )}
          </section>
        )}

        {view === 'completion' && (
          <section className={styles.completionCard}>
            <div className={styles.successIcon} aria-hidden="true">
              <AppIcon
                name="fi-rr-check"
                size={30}
                color="#17BF33"
              />
            </div>
            <h2>{texts.completionTitle}</h2>
            <p>{texts.completionMessage}</p>
            <p>{texts.completionReward}</p>
            <Button
              kind="solid"
              size="small"
              rightIcon={
                <AppIcon
                  name="fi-rr-arrow-small-right"
                  size={22}
                  color="currentColor"
                />
              }
              onClick={() => setView('reward')}
            >
              {texts.viewReward}
            </Button>
          </section>
        )}

        {view === 'reward' && (
          <section className={styles.rewardCard}>
            <div className={styles.voucherVisual} aria-hidden="true">
              <span className={styles.qrPattern} />
              <small>{texts.digitalVoucher}</small>
            </div>

            <div className={styles.rewardCopy}>
              <h2>{texts.rewardTitle}</h2>
              <p>{texts.rewardPartnerPending}</p>
              <p>{texts.rewardInstructions}</p>
            </div>

            <footer className={styles.rewardActions}>
              <button
                type="button"
                className={styles.directionsButton}
                onClick={() => setIsReferenceMapOpen(true)}
              >
                <span>{texts.directions}</span>
                <AppIcon
                  name="fi-rr-arrow-small-right"
                  size={20}
                  color="currentColor"
                />
              </button>

              <Button
                kind="solid"
                size="small"
                onClick={() => showToast(texts.qrUnavailable)}
              >
                {texts.downloadQr}
              </Button>
            </footer>
          </section>
        )}
      </div>

      {isPointCardOpen && (
        <div
          className={styles.dialogBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setIsPointCardOpen(false);
            }
          }}
        >
          <section
            className={styles.pointDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="route-point-title"
          >
            <span className={styles.pointNumber} aria-hidden="true">
              {currentPoint.order}
            </span>
            <div>
              <p className={styles.dialogEyebrow}>
                {texts.pointCardTitle} {currentPoint.order}
              </p>
              <h2 id="route-point-title">{currentPoint.name}</h2>
              <p>{currentPoint.description}</p>
            </div>
            <div className={styles.dialogActions}>
              <Button
                kind="transparent"
                size="small"
                onClick={() => setIsPointCardOpen(false)}
              >
                {TEXTS.common.cancelLabel}
              </Button>
              <Button
                kind="solid"
                size="small"
                ariaLabel={`${texts.completePoint} ${currentPoint.order}: ${currentPoint.name}`}
                onClick={handleCompletePoint}
              >
                {texts.completePoint}
              </Button>
            </div>
          </section>
        </div>
      )}

      {isReferenceMapOpen && (
        <div className={styles.dialogBackdrop}>
          <section
            className={styles.referenceDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reference-map-title"
          >
            <div className={styles.referenceMapHeader}>
              <div>
                <p className={styles.dialogEyebrow}>
                  {texts.visualGuide}
                </p>
                <h2 id="reference-map-title">
                  {texts.referenceMapTitle}
                </h2>
              </div>
              <button
                type="button"
                aria-label={TEXTS.common.closeLabel}
                onClick={() => setIsReferenceMapOpen(false)}
              >
                <AppIcon
                  name="fi-rr-close"
                  size={20}
                  color="#1A212B"
                />
              </button>
            </div>
            <img
              src={IMAGES.games.secretRoute.activeMap}
              alt={texts.referenceMapAlt}
              draggable={false}
            />
            <p>{texts.referenceMapDescription}</p>
          </section>
        </div>
      )}

      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>

      {toastMessage && (
        <div className={styles.toast} role="alert">
          {toastMessage}
        </div>
      )}
    </main>
  );
};

export default JuegoSection;
