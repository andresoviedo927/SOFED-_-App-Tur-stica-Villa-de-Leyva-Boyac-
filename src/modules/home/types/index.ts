import { IconName } from '@/assets/icons';

export interface HomeNavLink {
  id: string;
  label: string;
  icon: IconName;
  route: string;
}

export interface HomeState {
  activeSection: string | null;
  isSettingsOpen: boolean;
}
