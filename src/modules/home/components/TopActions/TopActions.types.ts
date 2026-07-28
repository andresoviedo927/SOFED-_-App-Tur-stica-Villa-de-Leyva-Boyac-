import { ReactNode } from 'react';

export interface TopActionsProps {
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  title?: string;
  className?: string;
}
