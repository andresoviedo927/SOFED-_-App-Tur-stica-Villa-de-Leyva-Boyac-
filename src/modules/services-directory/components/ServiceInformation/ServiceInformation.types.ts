import type { ServiceDetail } from '../../types/serviceDetail.types';

export interface ServiceInformationProps {
  service: ServiceDetail;
  onShowOnMap: () => void;
}
