import type {
  LodgingCategory,
  LodgingCategoryId,
  LodgingCategoryState,
} from '../../types/lodging.types';

export interface LodgingCategoryColumnProps {
  categories: LodgingCategory[];
  getCategoryState: (
    categoryId: LodgingCategoryId
  ) => LodgingCategoryState;
  onSelect: (category: LodgingCategory) => void;
}
