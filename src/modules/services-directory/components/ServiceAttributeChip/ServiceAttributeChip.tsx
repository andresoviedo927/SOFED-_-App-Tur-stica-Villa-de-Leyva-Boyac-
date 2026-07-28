import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import type { ServiceAttributeChipProps } from './ServiceAttributeChip.types';
import styles from './ServiceAttributeChip.module.css';

const content = (
  attribute: ServiceAttributeChipProps['attribute']
) => (
  <>
    {attribute.icon && (
      <span aria-hidden="true">{attribute.icon}</span>
    )}
    <strong>{attribute.label}:</strong>
    <span>{attribute.value}</span>
  </>
);

export const ServiceAttributeChip = ({
  attribute,
  serviceName,
  onShowOnMap,
}: ServiceAttributeChipProps) => {
  if (attribute.action === 'showOnMap') {
    return (
      <button
        type="button"
        className={styles.chip}
        aria-label={TEXTS.services.detail.showServiceOnMap.replace(
          '{service}',
          serviceName
        )}
        onClick={onShowOnMap}
      >
        {content(attribute)}
        <AppIcon
          name="fi-rr-arrow-small-right"
          size={18}
          color="currentColor"
        />
      </button>
    );
  }

  if (attribute.action === 'openLink' && attribute.url) {
    return (
      <a
        className={styles.chip}
        href={attribute.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content(attribute)}
      </a>
    );
  }

  return <span className={styles.chip}>{content(attribute)}</span>;
};

export default ServiceAttributeChip;
