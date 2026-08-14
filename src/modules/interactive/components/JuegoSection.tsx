import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { playSoundEffect } from '@/services/SoundEffectsService';
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
  onGoHome?: () => void;
  onOpenSettings?: () => void;
  startImmediately?: boolean;
}

type ExperienceView = 'route' | 'completion' | 'reward';

const COMPLETION_DELAY_MS = 920;
const PAPER_TEXTURE_BACKGROUND = `linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url("${IMAGES.interactive.reading.paperTexture}")`;
const REWARD_ESTABLISHMENT_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Amora Café y Canela, centro histórico, Villa de Leyva, Boyacá')}`;

export const JuegoSection = ({
  onBack,
  onGoHome,
  onOpenSettings,
}: JuegoSectionProps) => {
  const texts = TEXTS.games.secretPlazaRoute.routeExperience;
  const [routeStatus, setRouteStatus] =
    useState<SecretRouteStatus>('pointActive');
  const [completedPoints, setCompletedPoints] = useState(1);
  const [activePoint, setActivePoint] = useState(2);
  const [view, setView] = useState<ExperienceView>('route');
  const [announcement, setAnnouncement] = useState(
    `${texts.currentPoint}: 2 de ${SECRET_ROUTE_TOTAL_POINTS}`
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);

  const currentPoint = useMemo(
    () =>
      SECRET_ROUTE_POINTS.find((point) => point.id === activePoint) ??
      SECRET_ROUTE_POINTS[SECRET_ROUTE_TOTAL_POINTS - 1],
    [activePoint]
  );
  const progressPercentage = Math.round(
    (completedPoints / SECRET_ROUTE_TOTAL_POINTS) * 100
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const queueAction = useCallback((action: () => void, delay: number) => {
    const timer = window.setTimeout(action, delay);
    timersRef.current.push(timer);
  }, []);

  const showToast = useCallback(
    (message: string) => {
      setToastMessage(message);
      queueAction(() => setToastMessage(null), 2200);
    },
    [queueAction]
  );

  const handleDownloadVoucher = useCallback(() => {
    playSoundEffect('success');
    const downloadLink = document.createElement('a');
    downloadLink.href = IMAGES.games.secretRoute.voucherQr;
    downloadLink.download = 'bono-ruta-secreta.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    showToast('Bono descargado.');
  }, [showToast]);

  const handleOpenEstablishment = useCallback(() => {
    playSoundEffect('open');
    window.open(
      REWARD_ESTABLISHMENT_MAP_URL,
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const handlePointSelect = (pointId: number) => {
    if (routeStatus === 'routeCompleted') {
      return;
    }

    if (pointId !== activePoint) {
      playSoundEffect('unselect');
      showToast(
        pointId <= completedPoints
          ? `El punto ${pointId} ya está completado. Continúa con el punto ${activePoint}.`
          : `Sigue el orden: selecciona primero el punto ${activePoint}.`
      );
      setAnnouncement(`El punto ${pointId} aún no está disponible.`);
      return;
    }

    const isLastPoint = pointId === SECRET_ROUTE_TOTAL_POINTS;
    playSoundEffect(isLastPoint ? 'success' : 'select');
    setCompletedPoints(pointId);

    if (isLastPoint) {
      setRouteStatus('pointCompleted');
      setAnnouncement(texts.routeCompletedAnnouncement);
      queueAction(() => {
        setRouteStatus('routeCompleted');
        setView('completion');
      }, COMPLETION_DELAY_MS);
      return;
    }

    const nextPoint = pointId + 1;
    setActivePoint(nextPoint);
    setAnnouncement(
      `${texts.pointCompleted} ${pointId}. ${texts.currentPoint}: ${nextPoint}.`
    );
    showToast(
      `${texts.pointCompleted} ${pointId}. Ahora selecciona el punto ${nextPoint}.`
    );
  };

  const mapAlt =
    routeStatus === 'routeCompleted'
      ? texts.completedMapAlt
      : texts.activeMapAlt;
  const characterPoint =
    routeStatus === 'pointCompleted'
      ? completedPoints
      : Math.max(1, activePoint - 1);

  return (
    <main
      className={styles.screen}
      data-view={view}
      style={{
        backgroundImage: `url("${
          view === 'reward'
            ? IMAGES.plazaPrincipal.background
            : IMAGES.games.introductionBackground
        }")`,
      }}
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.layout}>
        <GameIntroductionHeader
          backLabel={TEXTS.common.back}
          screenTitle={texts.screenTitle}
          settingsLabel={texts.settingsLabel}
          onBack={onBack}
          onOpenSettings={() => onOpenSettings?.()}
        />

        {view !== 'reward' && (
          <section className={styles.mapArea} aria-label={texts.screenTitle}>
            <RouteMapImage
              status={routeStatus}
              completedPoints={completedPoints}
              activePoint={activePoint}
              characterPoint={characterPoint}
              alt={mapAlt}
              onPointSelect={handlePointSelect}
            />

            <aside className={styles.progressPanel}>
              <div className={styles.progressHeading}>
                <span>
                  {routeStatus === 'routeCompleted'
                    ? texts.completedPoints
                    : `${texts.currentPoint}: ${activePoint} de ${SECRET_ROUTE_TOTAL_POINTS}`}
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
                <span style={{ width: `${progressPercentage}%` }} />
              </div>

              <dl className={styles.progressDetails}>
                <div>
                  <dt>{texts.nextDestination}</dt>
                  <dd>
                    {routeStatus === 'routeCompleted'
                      ? texts.routeCompletedAnnouncement
                      : currentPoint.name}
                  </dd>
                </div>
              </dl>

              <p className={styles.progressInstruction}>
                {routeStatus === 'routeCompleted'
                  ? 'Recorrido completado.'
                  : `Toca el punto ${activePoint} en el mapa.`}
              </p>
            </aside>
          </section>
        )}

        {view === 'reward' && (
          <section
            className={styles.rewardCard}
            style={{ backgroundImage: PAPER_TEXTURE_BACKGROUND }}
            role="dialog"
            aria-labelledby="route-reward-title"
          >
            <div className={styles.rewardTop}>
              <div className={styles.rewardQrColumn}>
                <div className={styles.voucherVisual}>
                  <img
                    className={styles.voucherQr}
                    src={IMAGES.games.secretRoute.voucherQr}
                    alt="Código QR de ejemplo del bono de La Ruta Secreta"
                    draggable={false}
                  />
                </div>

                <button
                  type="button"
                  className={styles.qrDownloadButton}
                  onClick={handleDownloadVoucher}
                >
                  <span>{texts.downloadShort}</span>
                  <AppIcon
                    name="fi-rr-download"
                    size={16}
                    color="currentColor"
                  />
                </button>
              </div>

              <div className={styles.rewardCopy}>
                <h2 id="route-reward-title">{texts.rewardTitle}</h2>
                <p>{texts.rewardPartnerPending}</p>
                <p>{texts.rewardInstructions}</p>
              </div>
            </div>

            <footer className={styles.rewardActions}>
              <Button
                kind="transparent"
                size="small"
                className={styles.directionsButton}
                onClick={handleOpenEstablishment}
                rightIcon={
                  <AppIcon
                    name="fi-rr-arrow-small-right"
                    size={20}
                    color="currentColor"
                  />
                }
              >
                {texts.directions}
              </Button>

              <Button
                kind="solid"
                size="small"
                className={styles.homeButton}
                onClick={() => onGoHome?.()}
              >
                {texts.goHome}
              </Button>
            </footer>
          </section>
        )}
      </div>

      {view === 'completion' && (
        <div className={styles.dialogBackdrop}>
          <section
            className={styles.completionCard}
            style={{ backgroundImage: PAPER_TEXTURE_BACKGROUND }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="route-completion-title"
          >
            <div className={styles.successIcon} aria-hidden="true">
              <AppIcon name="fi-rr-check" size={40} color="#17BF33" />
            </div>
            <h2 id="route-completion-title">{texts.completionTitle}</h2>
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
