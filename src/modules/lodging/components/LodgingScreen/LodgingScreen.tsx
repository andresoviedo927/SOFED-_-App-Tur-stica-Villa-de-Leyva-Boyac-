import { useEffect, useMemo, useState } from 'react';
import IMAGES from '@/assets/images';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { lodgingCategories } from '../../data/lodgingCategories';
import useLodgingLocations from '../../hooks/useLodgingLocations';
import useLodgingMap, {
  focusPersistedLodgingPoint,
} from '../../hooks/useLodgingMap';
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
  onOpenLodgingDetail,
}: LodgingScreenProps) => {
  const map = useLodgingMap();
  const [focusedLodgingId] = useState(() =>
    map.consumePersistedLodgingId()
  );
  const directory = useLodgingLocations();
  const selectedCategory =
    lodgingCategories.find(
      (category) => category.id === map.selectedCategoryId
    ) ?? null;
  const visibleLocations = useMemo(
    () =>
      selectedCategory
        ? directory.locations.filter(
            (location) => location.categoryId === selectedCategory.id
          )
        : directory.locations,
    [directory.locations, selectedCategory]
  );
  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const selectCategory = (category: LodgingCategory) => {
    map.selectCategory(category.id, category.label);
  };

  const openLodgingDetail = (
    categoryId: string,
    lodgingId: string
  ) => {
    focusPersistedLodgingPoint(
      lodgingId,
      categoryId as LodgingCategory['id']
    );
    onOpenLodgingDetail(categoryId, lodgingId);
  };

  return (
    <main
      className={styles.screen}
      style={{ backgroundImage: `url(${IMAGES.settings.pageBackground})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.layout}>
        <header className={styles.header}>
          <Button
            kind="transparent"
            size="small"
            className={styles.backButton}
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
          <h1>{TEXTS.lodging.screenTitle}</h1>
          <span className={styles.headerSpacer} aria-hidden="true" />
        </header>

        <section className={styles.content} aria-label={TEXTS.lodging.screenTitle}>
          <LodgingCategoryColumn
            categories={lodgingCategories}
            getCategoryState={map.getCategoryState}
            onSelect={selectCategory}
          />
          <LodgingMap
            locations={visibleLocations}
            loading={directory.loading}
            error={directory.error}
            markersVisible={map.selectedCategoryId !== null}
            focusedLodgingId={focusedLodgingId}
            onOpenLodgingDetail={openLodgingDetail}
          />
        </section>

        <p className={styles.srOnly} aria-live="polite">
          {map.announcement}
        </p>
      </div>
    </main>
  );
};

export default LodgingScreen;
