import { useEffect } from 'react';
import { CategoryMapLayout } from '@/components/shared/map-directory';
import TEXTS from '@/constants/texts';
import { lodgingCategories } from '../../data/lodgingCategories';
import useLodgingMap from '../../hooks/useLodgingMap';
import type { LodgingCategory } from '../../types/lodging.types';
import LodgingCategoryColumn from '../LodgingCategoryColumn';
import LodgingMap from '../LodgingMap';
import styles from './LodgingScreen.module.css';

interface LodgingScreenProps {
  onBack: () => void;
  onOpenSettings: () => void;
  onOpenLodgingDetail: (
    categoryId: string,
    lodgingId: string
  ) => void;
}

export const LodgingScreen = ({
  onBack,
  onOpenSettings,
  onOpenLodgingDetail,
}: LodgingScreenProps) => {
  const map = useLodgingMap();
  const selectedCategory =
    lodgingCategories.find(
      (category) => category.id === map.selectedCategoryId
    ) ?? null;

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const selectCategory = (category: LodgingCategory) => {
    map.selectCategory(category.id, category.label);
  };

  return (
    <CategoryMapLayout
      title={TEXTS.lodging.screenTitle}
      contentLabel={TEXTS.lodging.screenTitle}
      onBack={onBack}
      onOpenSettings={onOpenSettings}
    >
      <div className={styles.content}>
        <LodgingCategoryColumn
          categories={lodgingCategories}
          getCategoryState={map.getCategoryState}
          onSelect={selectCategory}
        />
        <LodgingMap
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
          onClosePoint={map.closePoint}
          onOpenDetails={(point) =>
            onOpenLodgingDetail(point.categoryId, point.id)
          }
          onReset={map.resetView}
          onZoomIn={map.zoomIn}
          onZoomOut={map.zoomOut}
          onPanBy={map.panBy}
        />
      </div>
      <p className={styles.srOnly} aria-live="polite">
        {map.announcement}
      </p>
    </CategoryMapLayout>
  );
};

export default LodgingScreen;
