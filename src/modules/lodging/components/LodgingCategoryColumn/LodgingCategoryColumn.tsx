import { MapCategoryButton } from '@/components/shared/map-directory';
import TEXTS from '@/constants/texts';
import type { LodgingCategoryColumnProps } from './LodgingCategoryColumn.types';
import styles from './LodgingCategoryColumn.module.css';

export const LodgingCategoryColumn = ({
  categories,
  getCategoryState,
  onSelect,
}: LodgingCategoryColumnProps) => (
  <div className={styles.column}>
    {categories.map((category) => (
      <MapCategoryButton
        key={category.id}
        category={category}
        state={getCategoryState(category.id)}
        deactivateLabel={TEXTS.lodging.map.deactivateFilter}
        labelFontSize={12}
        iconPadding={8}
        allowDisabledSelection
        visualVariant="services"
        onSelect={onSelect}
      />
    ))}
  </div>
);

export default LodgingCategoryColumn;
