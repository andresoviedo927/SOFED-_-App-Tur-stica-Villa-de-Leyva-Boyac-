import { IconName } from '@/assets/icons';

export interface AppIconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  state?: 'normal' | 'active' | 'pressed' | 'disabled';
  ariaLabel?: string;
}
