import { DirectoryMapTooltip } from '@/components/shared/map-directory';
import TEXTS from '@/constants/texts';
import type { LodgingMapTooltipProps } from './LodgingMapTooltip.types';
import styles from './LodgingMapTooltip.module.css';

export const LodgingMapTooltip = ({
  point,
  category,
  onClose,
  onViewDetails,
}: LodgingMapTooltipProps) => (
  <DirectoryMapTooltip
    title={point.name}
    typeLabel={category.label}
    description={point.shortDescription}
    demoLabel={TEXTS.lodging.map.demoInformation}
    closeLabel={TEXTS.lodging.map.closeDetails}
    detailsLabel={TEXTS.lodging.map.viewDetails}
    onClose={onClose}
    onViewDetails={onViewDetails}
    extraContent={
      <div className={styles.extra}>
        {point.address && (
          <span>
            <strong>{TEXTS.lodging.map.address}:</strong>{' '}
            {point.address}
          </span>
        )}
        {point.priceRange && (
          <span>
            <strong>{TEXTS.lodging.map.priceRange}:</strong>{' '}
            {point.priceRange}
          </span>
        )}
        {point.highlight && (
          <span>
            <strong>{TEXTS.lodging.map.highlight}:</strong>{' '}
            {point.highlight}
          </span>
        )}
      </div>
    }
  />
);

export default LodgingMapTooltip;
