import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { IconName } from '@/assets/icons';

export type InputVariant = 'text' | 'search' | 'date' | 'time' | 'select';

export interface SelectOption {
  value: string;
  label: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  options?: SelectOption[];
}

