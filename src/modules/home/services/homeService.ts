import TEXTS from '@/constants/texts';
import ROUTES from '@/constants/routes';
import { HomeNavLink } from '../types';

export const getHomeNavLinks = (): HomeNavLink[] => [
  {
    id: 'interactive',
    label: TEXTS.home.navLinks.interactive,
    icon: 'fi-rr-touch',
    route: ROUTES.INTERACTIVE,
  },
  {
    id: 'services',
    label: TEXTS.home.navLinks.services,
    icon: 'fi-rr-services',
    route: ROUTES.SERVICES,
  },
  {
    id: 'lodging',
    label: TEXTS.home.navLinks.lodging,
    icon: 'fi-rr-lodging',
    route: ROUTES.LODGING,
  },
  {
    id: 'events',
    label: TEXTS.home.navLinks.events,
    icon: 'fi-rr-events',
    route: ROUTES.EVENTS,
  },
];
