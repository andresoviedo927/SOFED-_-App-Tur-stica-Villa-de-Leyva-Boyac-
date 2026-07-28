import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonKind = 'solid' | 'transparent';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
  loading?: boolean;
}
