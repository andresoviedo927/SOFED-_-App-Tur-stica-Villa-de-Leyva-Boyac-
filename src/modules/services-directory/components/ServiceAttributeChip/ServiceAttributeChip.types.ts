import type { Key } from 'react';
import type { ServiceAttribute } from '../../types/serviceDetail.types';

export interface ServiceAttributeChipProps {
  key?: Key;
  attribute: ServiceAttribute;
  serviceName: string;
  onShowOnMap: () => void;
}
