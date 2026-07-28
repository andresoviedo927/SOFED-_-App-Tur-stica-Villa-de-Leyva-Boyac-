import ServiceCategoryButton from '../ServiceCategoryButton';
import type { ServiceCategoryColumnProps } from './ServiceCategoryColumn.types';
import styles from './ServiceCategoryColumn.module.css';

export const ServiceCategoryColumn = ({
  categories,
  getCategoryState,
  deactivateLabel,
  onSelect,
}: ServiceCategoryColumnProps) => (
  <div className={styles.column}>
    {categories.map((category) => (
      <ServiceCategoryButton
        key={category.id}
        category={category}
        state={getCategoryState(category.id)}
        deactivateLabel={deactivateLabel}
        onSelect={onSelect}
      />
    ))}
  </div>
);

export default ServiceCategoryColumn;
