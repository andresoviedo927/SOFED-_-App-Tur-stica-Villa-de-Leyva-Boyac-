import React from 'react';
import IMAGES from '@/assets/images';
import { HomeNavLink } from '../types';
import HomeNavigationItem from './HomeNavigationItem';
import styles from './HomeContainer.module.css';

interface HomeNavLinksProps {
  links: HomeNavLink[];
  onSelectLink: (route: string) => void;
}

const HOME_NAV_IMAGES: Record<string, string> = {
  interactive: IMAGES.home.navIcons.interactive,
  services: IMAGES.home.navIcons.services,
  lodging: IMAGES.home.navIcons.lodging,
  events: IMAGES.home.navIcons.events,
};

export const HomeNavLinks: React.FC<HomeNavLinksProps> = ({
  links,
  onSelectLink,
}) => {
  return (
    <nav className={styles.navigationContent} aria-label="Navegación principal">
      {links.map((link) => (
        <HomeNavigationItem
          key={link.id}
          label={link.label}
          icon={HOME_NAV_IMAGES[link.id]}
          to={link.route}
          onNavigate={onSelectLink}
        />
      ))}
    </nav>
  );
};

export default HomeNavLinks;
