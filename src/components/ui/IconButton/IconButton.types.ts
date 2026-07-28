import { ButtonHTMLAttributes } from 'react';
import { IconName } from '@/assets/icons';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  iconSize?: number;
  iconColor?: string;
  variant?: 'circle-orange' | 'transparent' | 'glass';
  ariaLabel: string;
  isDisabled?: boolean;
}
