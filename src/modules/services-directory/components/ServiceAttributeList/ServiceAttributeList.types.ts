import type { ServiceAttribute } from '../../types/serviceDetail.types';

export interface ServiceAttributeListProps {
  attributes: ServiceAttribute[];
  serviceName: string;
  onShowOnMap: () => void;
}
