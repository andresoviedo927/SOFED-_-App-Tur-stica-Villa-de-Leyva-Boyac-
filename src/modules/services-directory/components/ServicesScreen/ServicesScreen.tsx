import { useEffect, useMemo, useState } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { serviceCategories } from '../../data/serviceCategories';
import useServiceLocations from '../../hooks/useServiceLocations';
import useServicesMap from '../../hooks/useServicesMap';
import type { ServiceCategory } from '../../types/services.types';
import { ServiceCategoryColumn } from '../ServiceCategoryColumn';
import { ServicesHeader } from '../ServicesHeader';
import { ServicesMap } from '../ServicesMap';
import styles from './ServicesScreen.module.css';

interface ServicesScreenProps {
  onBack: () => void;
  onOpenSettings: () => void;
  onOpenServiceDetail: (
    categoryId: string,
    serviceId: string
  ) => void;
}

export const ServicesScreen = ({
  onBack,
  onOpenSettings,
  onOpenServiceDetail,
}: ServicesScreenProps) => {
  const map = useServicesMap();
  const [focusedServiceId] = useState(() =>
    map.consumePersistedServiceId()
  );
  const { locations, loading, error } = useServiceLocations();
  const leftCategories = useMemo(
    () => serviceCategories.filter((category) => category.column === 'left'),
    []
  );
  const rightCategories = useMemo(
    () => serviceCategories.filter((category) => category.column === 'right'),
    []
  );
  const visibleLocations = useMemo(
    () =>
      map.selectedService
        ? locations.filter(
            (location) => location.categoryId === map.selectedService
          )
        : locations,
    [locations, map.selectedService]
  );

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const selectCategory = (category: ServiceCategory) => {
    map.selectCategory(category.id, category.label);
  };

  return (
    <main
      className={styles.screen}
      style={{ backgroundImage: `url(${IMAGES.settings.pageBackground})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.layout}>
        <ServicesHeader
          onBack={onBack}
          onOpenSettings={onOpenSettings}
        />
        <section className={styles.content} aria-label={TEXTS.services.screenTitle}>
          <ServiceCategoryColumn
            categories={leftCategories}
            getCategoryState={map.getCategoryState}
            deactivateLabel={TEXTS.services.map.deactivateFilter}
            onSelect={selectCategory}
          />
          <ServicesMap
            locations={visibleLocations}
            loading={loading}
            error={error}
            markersVisible={map.selectedService !== null}
            focusedServiceId={focusedServiceId}
            onOpenServiceDetail={onOpenServiceDetail}
          />
          <ServiceCategoryColumn
            categories={rightCategories}
            getCategoryState={map.getCategoryState}
            deactivateLabel={TEXTS.services.map.deactivateFilter}
            onSelect={selectCategory}
          />
        </section>
        <p className={styles.srOnly} aria-live="polite">
          {map.announcement}
        </p>
      </div>
    </main>
  );
};

export default ServicesScreen;
