import GallerySubmenuButton from '@/modules/interactive/components/GallerySubmenuButton';
import type { EventMediaActionButtonProps } from './EventMediaActionButton.types';

export const EventMediaActionButton = ({
  type,
  icon,
  label,
  disabled = false,
  unavailableMessage,
  onClick,
}: EventMediaActionButtonProps) => (
  <GallerySubmenuButton
    option={{
      icon,
      label,
      accessibilityLabel: label,
      position: type === 'photos' ? 'top' : 'bottom',
    }}
    disabled={disabled}
    unavailableMessage={unavailableMessage}
    onSelect={onClick}
  />
);

export default EventMediaActionButton;
