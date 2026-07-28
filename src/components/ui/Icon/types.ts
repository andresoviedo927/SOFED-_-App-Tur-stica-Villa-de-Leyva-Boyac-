import React from 'react';
import { IconName } from '@/assets/icons';
import { IconSizeKey } from '@/constants/icons';

export type IconSize = number | IconSizeKey;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  color?: string;
  className?: string;
  ariaLabel?: string;
  isDecorative?: boolean;
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  iconSize?: IconSize;
  iconColor?: string;
  ariaLabel: string;
  variant?: 'primary' | 'secondary' | 'transparent' | 'glass' | 'floating';
  isDisabled?: boolean;
  tooltip?: string;
}

export interface FeatureIconProps {
  iconName: IconName;
  size?: number | 'sm' | 'md' | 'lg';
  label?: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export interface NavigationIconProps {
  type: 'back' | 'forward' | 'close' | 'home';
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export interface StatusIconProps {
  status: 'success' | 'warning' | 'info' | 'error' | 'location';
  size?: number;
  message?: string;
  className?: string;
}

export interface IllustratedIconProps {
  iconName: IconName;
  size?: number;
  glowColor?: string;
  className?: string;
  children?: React.ReactNode;
}
