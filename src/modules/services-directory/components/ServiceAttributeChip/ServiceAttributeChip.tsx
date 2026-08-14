import AppIcon from '@/components/ui/AppIcon';
import TEXTS from '@/constants/texts';
import type { ServiceAttributeChipProps } from './ServiceAttributeChip.types';
import styles from './ServiceAttributeChip.module.css';

const content = (
  attribute: ServiceAttributeChipProps['attribute']
) => (
  <>
    {attribute.icon && (
      attribute.id === 'location' ? (
        <AppIcon
          name="fi-rr-map-pin"
          size={14}
          color="currentColor"
        />
      ) : (
        <span aria-hidden="true">{attribute.icon}</span>
      )
    )}
    {attribute.label && <strong>{attribute.label}:</strong>}
    <span className={styles.value}>{attribute.value}</span>
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
        data-compact={attribute.label ? undefined : 'true'}
        title={attribute.fullValue}
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
    const isGoogleMapsLink = attribute.id === 'location';

    return (
      <a
        className={styles.chip}
        data-compact={attribute.label ? undefined : 'true'}
        data-location={isGoogleMapsLink ? 'true' : undefined}
        title={attribute.fullValue}
        href={attribute.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          isGoogleMapsLink
            ? `Abrir ${serviceName} en Google Maps`
            : undefined
        }
      >
        {content(attribute)}
        {isGoogleMapsLink && (
          <AppIcon
            name="fi-rr-arrow-small-right"
            size={18}
            color="currentColor"
          />
        )}
      </a>
    );
  }

  return (
    <span
      className={styles.chip}
      data-compact={attribute.label ? undefined : 'true'}
      title={attribute.fullValue}
    >
      {content(attribute)}
    </span>
  );
};

export default ServiceAttributeChip;
