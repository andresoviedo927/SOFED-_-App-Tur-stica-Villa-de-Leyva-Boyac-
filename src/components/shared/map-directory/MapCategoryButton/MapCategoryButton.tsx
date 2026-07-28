import type { CSSProperties, Key } from 'react';
import type {
  MapCategoryState,
  MapDirectoryCategory,
} from '../mapDirectory.types';
import styles from './MapCategoryButton.module.css';

interface MapCategoryButtonProps<
  TCategory extends MapDirectoryCategory,
> {
  key?: Key;
  category: TCategory;
  state: MapCategoryState;
  deactivateLabel: string;
  labelFontSize?: number;
  iconPadding?: number;
  onSelect: (category: TCategory) => void;
}

export const MapCategoryButton = <
  TCategory extends MapDirectoryCategory,
>({
  category,
  state,
  deactivateLabel,
  labelFontSize = 10,
  iconPadding = 8,
  onSelect,
}: MapCategoryButtonProps<TCategory>) => {
  const isSelected = state === 'selected';
  const isDisabled = state === 'disabled';
  const ariaLabel = isSelected
    ? deactivateLabel.replace('{category}', category.label)
    : category.accessibilityLabel;

  return (
    <button
      type="button"
      className={styles.button}
      data-state={state}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      title={category.label}
      style={
        {
          '--category-label-size': `${labelFontSize}px`,
          '--category-icon-padding': `${iconPadding}px`,
        } as CSSProperties
      }
      onClick={() => onSelect(category)}
    >
      <img src={category.icon} alt="" draggable={false} />
      <span>{category.shortLabel ?? category.label}</span>
    </button>
  );
};

export default MapCategoryButton;
