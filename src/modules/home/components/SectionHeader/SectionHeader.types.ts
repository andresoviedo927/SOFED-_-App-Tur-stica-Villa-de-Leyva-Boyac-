import { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  rightElement?: ReactNode;
  className?: string;
}
