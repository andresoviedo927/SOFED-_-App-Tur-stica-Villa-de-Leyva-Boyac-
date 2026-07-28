import { HomeNavLink } from '../../types';

export interface MainNavigationProps {
  items: HomeNavLink[];
  activeId?: string;
  onSelectItem: (route: string) => void;
  className?: string;
}
