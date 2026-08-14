import ServiceAttributeChip from '../ServiceAttributeChip';
import type { ServiceAttributeListProps } from './ServiceAttributeList.types';
import styles from './ServiceAttributeList.module.css';

export const ServiceAttributeList = ({
  attributes,
  serviceName,
  onShowOnMap,
}: ServiceAttributeListProps) => (
  <div className={styles.attributes}>
    {attributes
      .filter((attribute) => attribute.value)
      .map((attribute) => (
        <ServiceAttributeChip
          key={attribute.id}
          attribute={attribute}
          serviceName={serviceName}
          onShowOnMap={onShowOnMap}
        />
      ))}
  </div>
);

export default ServiceAttributeList;
