import type {
  MapCategoryState,
  MapDirectoryCategory,
} from '../mapDirectory.types';
import MapCategoryButton from '../MapCategoryButton';
import styles from './MapCategoryColumn.module.css';

interface MapCategoryColumnProps<
  TCategory extends MapDirectoryCategory,
> {
  categories: TCategory[];
  deactivateLabel: string;
  distribution?: 'center' | 'space-between';
  gap?: number;
  labelFontSize?: number;
  iconPadding?: number;
  getCategoryState: (categoryId: TCategory['id']) => MapCategoryState;
  onSelect: (category: TCategory) => void;
}

export const MapCategoryColumn = <
  TCategory extends MapDirectoryCategory,
>({
  categories,
  deactivateLabel,
  distribution = 'space-between',
  gap = 0,
  labelFontSize,
  iconPadding,
  getCategoryState,
  onSelect,
}: MapCategoryColumnProps<TCategory>) => (
  <div
    className={styles.column}
    data-distribution={distribution}
    style={{ gap }}
  >
    {categories.map((category) => (
      <MapCategoryButton
        key={category.id}
        category={category}
        state={getCategoryState(category.id)}
        deactivateLabel={deactivateLabel}
        labelFontSize={labelFontSize}
        iconPadding={iconPadding}
        onSelect={onSelect}
      />
    ))}
  </div>
);

export default MapCategoryColumn;
