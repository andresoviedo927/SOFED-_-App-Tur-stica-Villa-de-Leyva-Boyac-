import { HomeNavLink } from '../../types';

export interface CurvedNavigationPanelProps {
  title?: string;
  links: HomeNavLink[];
  onSelectLink: (route: string) => void;
  className?: string;
}
