import { MapCategoryColumn } from '@/components/shared/map-directory';
import TEXTS from '@/constants/texts';
import type { LodgingCategoryColumnProps } from './LodgingCategoryColumn.types';

export const LodgingCategoryColumn = (
  props: LodgingCategoryColumnProps
) => (
  <MapCategoryColumn
    {...props}
    deactivateLabel={TEXTS.lodging.map.deactivateFilter}
    distribution="center"
    gap={16}
    labelFontSize={12}
    iconPadding={0}
  />
);

export default LodgingCategoryColumn;
