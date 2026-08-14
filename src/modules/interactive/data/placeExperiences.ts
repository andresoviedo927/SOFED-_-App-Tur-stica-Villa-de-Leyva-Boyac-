import IMAGES from '@/assets/images';
import ROUTES from '@/constants/routes';
import TEXTS from '@/constants/texts';
import type { InteractivePlace } from '../types';

export const PLAZA_PRINCIPAL_PLACE: InteractivePlace = {
  id: 'plaza-principal',
  title: TEXTS.interactive.plazaPrincipal.title,
  backgroundImage: IMAGES.plazaPrincipal.background,
  centerIcon: IMAGES.plazaPrincipal.centerIcon,
  experiences: [
    {
      id: 'plaza-game',
      type: 'game',
      label:
        TEXTS.interactive.plazaPrincipal.experiences.game,
      icon: IMAGES.plazaPrincipal.puzzleIcon,
      destination: ROUTES.PLAZA_PRINCIPAL_GAME,
    },
    {
      id: 'plaza-reading',
      type: 'reading',
      label:
        TEXTS.interactive.plazaPrincipal.experiences.reading,
      icon: IMAGES.plazaPrincipal.readingIcon,
      destination: ROUTES.PLAZA_PRINCIPAL_READING,
    },
    {
      id: 'plaza-gallery',
      type: 'gallery',
      label:
        TEXTS.interactive.plazaPrincipal.experiences.gallery,
      icon: IMAGES.plazaPrincipal.galleryIcon,
      destination: ROUTES.PLAZA_PRINCIPAL_GALLERY,
    },
    {
      id: 'plaza-ar',
      type: 'augmentedReality',
      label:
        TEXTS.interactive.plazaPrincipal.experiences
          .augmentedReality,
      icon: IMAGES.plazaPrincipal.augmentedRealityIcon,
      destination: ROUTES.PLAZA_PRINCIPAL_AR,
    },
  ],
};

export default PLAZA_PRINCIPAL_PLACE;
