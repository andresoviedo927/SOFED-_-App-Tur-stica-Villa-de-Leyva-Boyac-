import { useEffect } from 'react';
import DirectoryDetailScreen from '@/components/shared/directory-detail';
import TEXTS from '@/constants/texts';
import useServiceDetail from '../../hooks/useServiceDetail';
import { focusPersistedServicePoint } from '../../hooks/useServicesMap';

interface ServiceDetailScreenProps {
  categoryId: string | null;
  serviceId: string | null;
  onBack: () => void;
  onOpenSettings: () => void;
}

export const ServiceDetailScreen = ({
  categoryId,
  serviceId,
  onBack,
  onOpenSettings,
}: ServiceDetailScreenProps) => {
  const { service } = useServiceDetail(categoryId, serviceId);

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const showOnMap = () => {
    if (!service) return;
    focusPersistedServicePoint(
      service.mapPointId,
      service.categoryId
    );
    onBack();
  };

  return (
    <DirectoryDetailScreen
      detail={service}
      notFoundTitle={TEXTS.services.detail.notFoundTitle}
      notFoundMessage={TEXTS.services.detail.notFoundMessage}
      onBack={onBack}
      onOpenSettings={onOpenSettings}
      onShowOnMap={showOnMap}
    />
  );
};

export default ServiceDetailScreen;
