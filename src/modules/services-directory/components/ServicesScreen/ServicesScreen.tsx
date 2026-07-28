import { useEffect, useMemo } from 'react';
import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import { serviceCategories } from '../../data/serviceCategories';
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
  const leftCategories = useMemo(
    () => serviceCategories.filter((category) => category.column === 'left'),
    []
  );
  const rightCategories = useMemo(
    () => serviceCategories.filter((category) => category.column === 'right'),
    []
  );
  const selectedCategory =
    serviceCategories.find(
      (category) => category.id === map.selectedCategoryId
    ) ?? null;

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const selectCategory = (category: ServiceCategory) => {
    map.selectCategory(category.id, category.label);
  };

  return (
    <main
      className={styles.screen}
      style={{ backgroundImage: `url(${IMAGES.interactive.map})` }}
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
            selectedCategory={selectedCategory}
            points={map.visiblePoints}
            selectedPoint={map.selectedPoint}
            zoom={map.zoom}
            offset={map.mapOffset}
            isAtMinZoom={map.isAtMinZoom}
            isAtMaxZoom={map.isAtMaxZoom}
            onRemoveFilter={() => {
              if (selectedCategory) selectCategory(selectedCategory);
            }}
            onSelectPoint={map.selectPoint}
            onClosePoint={map.closePointDetails}
            onOpenDetails={(point) =>
              onOpenServiceDetail(point.categoryId, point.id)
            }
            onReset={map.resetView}
            onZoomIn={map.zoomIn}
            onZoomOut={map.zoomOut}
            onPanBy={map.panBy}
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
