import TEXTS from '@/constants/texts';
import {
  plazaPrincipalGalleryOptions,
  type GalleryOption,
} from '../data/plazaPrincipalGallery';
import GallerySubmenuButton from './GallerySubmenuButton';
import styles from './GallerySubmenu.module.css';

interface GallerySubmenuProps {
  onSelect: (option: GalleryOption) => void;
}

export const GallerySubmenu = ({
  onSelect,
}: GallerySubmenuProps) => (
  <nav
    id="plaza-gallery-submenu"
    className={styles.submenu}
    aria-label={
      TEXTS.interactive.plazaPrincipal.gallery.submenuLabel
    }
  >
    {plazaPrincipalGalleryOptions.map((option) => (
      <GallerySubmenuButton
        key={option.id}
        option={option}
        onSelect={onSelect}
      />
    ))}
  </nav>
);

export default GallerySubmenu;
