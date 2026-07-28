import { useEffect } from 'react';
import DirectoryDetailScreen from '@/components/shared/directory-detail';
import TEXTS from '@/constants/texts';
import useLodgingDetail from '../../hooks/useLodgingDetail';
import { focusPersistedLodgingPoint } from '../../hooks/useLodgingMap';
import type { LodgingCategoryId } from '../../types/lodging.types';

interface LodgingDetailScreenProps {
  categoryId: string | null;
  lodgingId: string | null;
  onBack: () => void;
  onOpenSettings: () => void;
}

export const LodgingDetailScreen = ({
  categoryId,
  lodgingId,
  onBack,
  onOpenSettings,
}: LodgingDetailScreenProps) => {
  const { lodging } = useLodgingDetail(categoryId, lodgingId);

  useEffect(() => {
    window.speechSynthesis?.cancel();
  }, []);

  const showOnMap = () => {
    if (!lodging) return;

    focusPersistedLodgingPoint(
      lodging.mapPointId,
      lodging.categoryId as LodgingCategoryId
    );
    onBack();
  };

  return (
    <DirectoryDetailScreen
      detail={lodging}
      notFoundTitle={TEXTS.lodging.detail.notFoundTitle}
      notFoundMessage={TEXTS.lodging.detail.notFoundMessage}
      onBack={onBack}
      onOpenSettings={onOpenSettings}
      onShowOnMap={showOnMap}
    />
  );
};

export default LodgingDetailScreen;
