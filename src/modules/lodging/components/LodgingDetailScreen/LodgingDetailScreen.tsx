import { useEffect } from 'react';
import IMAGES from '@/assets/images';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import ServiceGallery from '@/modules/services-directory/components/ServiceGallery';
import ServiceInformation from '@/modules/services-directory/components/ServiceInformation';
import styles from '@/modules/services-directory/components/ServiceDetailScreen/ServiceDetailScreen.module.css';
import useLodgingDetail from '../../hooks/useLodgingDetail';
import { persistLodgingCategory } from '../../hooks/useLodgingCategoryFilter';
import { focusPersistedLodgingPoint } from '../../hooks/useLodgingMap';
import type { LodgingCategoryId } from '../../types/lodging.types';

interface LodgingDetailScreenProps {
  categoryId: string | null;
  lodgingId: string | null;
  onBack: () => void;
  onOpenSettings: () => void;
}

export const LodgingDetailScreen = ({
  categoryId,
  lodgingId,
  onBack,
  onOpenSettings,
}: LodgingDetailScreenProps) => {
  const { lodging, loading } = useLodgingDetail(categoryId, lodgingId);

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    if (lodging) {
      persistLodgingCategory(lodging.categoryId as LodgingCategoryId);
    }
  }, [lodging]);

  const showOnMap = () => {
    if (!lodging) return;
    focusPersistedLodgingPoint(
      lodging.mapPointId,
      lodging.categoryId as LodgingCategoryId
    );
    onBack();
  };

  return (
    <main
      className={styles.screen}
      style={{
        backgroundImage: `url(${IMAGES.settings.pageBackground})`,
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.layout}>
        <header className={styles.header}>
          <Button
            kind="transparent"
            size="small"
            className={styles.back}
            ariaLabel={TEXTS.common.back}
            leftIcon={
              <AppIcon
                name="fi-rr-angle-small-left"
                size={24}
                color="currentColor"
              />
            }
            onClick={onBack}
          >
            {TEXTS.common.back}
          </Button>
          <h1>{TEXTS.services.detail.screenTitle}</h1>
          <SettingsButton
            className={styles.settings}
            onClick={onOpenSettings}
            ariaLabel={TEXTS.common.settingsLabel}
          />
        </header>

        {lodging ? (
          <section className={styles.content} aria-label={lodging.name}>
            <ServiceInformation
              className={styles.information}
              service={lodging}
              contactDisplay="value"
              onShowOnMap={showOnMap}
            />
            <ServiceGallery
              className={styles.gallery}
              images={lodging.gallery}
              serviceName={lodging.name}
              transitionMode="horizontal"
            />
          </section>
        ) : (
          <section className={styles.notFound} role="status">
            <h2>
              {loading
                ? 'Cargando alojamiento…'
                : TEXTS.lodging.detail.notFoundTitle}
            </h2>
            <p>
              {loading
                ? 'Consultando la información del alojamiento.'
                : TEXTS.lodging.detail.notFoundMessage}
            </p>
          </section>
        )}
      </div>
    </main>
  );
};

export default LodgingDetailScreen;
