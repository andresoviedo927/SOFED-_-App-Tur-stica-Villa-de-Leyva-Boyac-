import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import Button from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import IllustratedMap from './IllustratedMap';
import MapBackground from './MapBackground';
import MapBanner from './MapBanner';
import MapControls from './MapControls';
import useInteractive from '../hooks/useInteractive';
import styles from './InteractiveMapScreen.module.css';

interface InteractiveMapScreenProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenPlazaPrincipal?: () => void;
}

export const InteractiveMapScreen: React.FC<
  InteractiveMapScreenProps
> = ({ onBack, onOpenSettings, onOpenPlazaPrincipal }) => {
  const {
    pins,
    zoomScale,
    panOffset,
    isDragging,
    handleZoomIn,
    handleZoomOut,
    handleResetMap,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useInteractive();

  return (
    <section className={styles.screen}>
      <MapBackground />

      <header className={styles.header}>
        <Button
          kind="transparent"
          size="small"
          className={styles.backButton}
          ariaLabel={TEXTS.common.backLabel}
          leftIcon={
            <AppIcon
              name="fi-rr-angle-small-left"
              size={22}
              color="#FFFFFF"
            />
          }
          onClick={onBack}
        >
          {TEXTS.common.backLabel}
        </Button>

        <MapBanner />

        {onOpenSettings ? (
          <SettingsButton
            onClick={onOpenSettings}
            className={styles.settingsButton}
          />
        ) : (
          <span className={styles.settingsPlaceholder} />
        )}
      </header>

      <IllustratedMap
        pins={pins}
        zoomScale={zoomScale}
        panOffset={panOffset}
        isDragging={isDragging}
        onOpenPlazaPrincipal={onOpenPlazaPrincipal}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      <MapControls
        zoomScale={zoomScale}
        onLocate={handleResetMap}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </section>
  );
};

export default InteractiveMapScreen;
