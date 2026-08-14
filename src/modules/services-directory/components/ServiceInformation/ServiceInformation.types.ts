import type { ServiceDetail } from '../../types/serviceDetail.types';

export interface ServiceInformationProps {
  service: ServiceDetail;
  onShowOnMap: () => void;
  className?: string;
  contactDisplay?: 'label' | 'value';
}
