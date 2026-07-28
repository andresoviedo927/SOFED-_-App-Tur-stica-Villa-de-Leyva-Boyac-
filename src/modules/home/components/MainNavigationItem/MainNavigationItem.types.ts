import { IconName } from '@/assets/icons';

export interface MainNavigationItemProps {
  id: string;
  label: string;
  icon: IconName;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}
