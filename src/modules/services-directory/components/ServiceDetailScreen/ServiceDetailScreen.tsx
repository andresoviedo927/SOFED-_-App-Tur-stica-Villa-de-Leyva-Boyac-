import { useEffect } from 'react';
import IMAGES from '@/assets/images';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import TEXTS from '@/constants/texts';
import ServiceGallery from '../ServiceGallery';
import ServiceInformation from '../ServiceInformation';
import useServiceDetail from '../../hooks/useServiceDetail';
import {
  focusPersistedServicePoint,
} from '../../hooks/useServicesMap';
import { persistServiceCategory } from '../../hooks/useServiceCategoryFilter';
import type { ServiceCategoryId } from '../../types/services.types';
import styles from './ServiceDetailScreen.module.css';

interface ServiceDetailScreenProps {
  categoryId: string | null;
  serviceId: string | null;
  onBack: () => void;
  onOpenSettings: () => void;
}

export const ServiceDetailScreen = ({
  categoryId,
  serviceId,
  onBack,
  onOpenSettings,
}: ServiceDetailScreenProps) => {
  const { service, loading } = useServiceDetail(categoryId, serviceId);

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    if (service) {
      persistServiceCategory(service.categoryId as ServiceCategoryId);
    }
  }, [service]);

  const showOnMap = () => {
    if (!service) return;
    focusPersistedServicePoint(
      service.mapPointId,
      service.categoryId as ServiceCategoryId
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

        {service ? (
          <section className={styles.content} aria-label={service.name}>
            <ServiceInformation
              className={styles.information}
              service={service}
              contactDisplay="value"
              onShowOnMap={showOnMap}
            />
            <ServiceGallery
              className={styles.gallery}
              images={service.gallery}
              serviceName={service.name}
              transitionMode="horizontal"
            />
          </section>
        ) : (
          <section className={styles.notFound} role="status">
            <h2>
              {loading
                ? 'Cargando servicio…'
                : TEXTS.services.detail.notFoundTitle}
            </h2>
            <p>
              {loading
                ? 'Consultando la información del lugar.'
                : TEXTS.services.detail.notFoundMessage}
            </p>
          </section>
        )}
      </div>
    </main>
  );
};

export default ServiceDetailScreen;
