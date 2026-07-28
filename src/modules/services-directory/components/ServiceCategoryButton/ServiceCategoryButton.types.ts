import type { Key } from 'react';
import type {
  ServiceCategory,
  ServiceCategoryState,
} from '../../types/services.types';

export interface ServiceCategoryButtonProps {
  key?: Key;
  category: ServiceCategory;
  state: ServiceCategoryState;
  deactivateLabel: string;
  onSelect: (category: ServiceCategory) => void;
}
