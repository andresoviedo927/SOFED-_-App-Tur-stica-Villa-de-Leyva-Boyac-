import type {
  ServiceCategory,
  ServiceCategoryId,
  ServiceCategoryState,
} from '../../types/services.types';

export interface ServiceCategoryColumnProps {
  categories: ServiceCategory[];
  getCategoryState: (
    categoryId: ServiceCategoryId
  ) => ServiceCategoryState;
  deactivateLabel: string;
  onSelect: (category: ServiceCategory) => void;
}
