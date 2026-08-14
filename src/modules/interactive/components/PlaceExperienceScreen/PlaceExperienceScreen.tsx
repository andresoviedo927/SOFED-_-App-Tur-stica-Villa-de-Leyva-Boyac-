import React, { useEffect, useState } from 'react';
import VIDEOS from '@/assets/videos';
import type { ActiveExperienceSubmenu } from '../../types';
import type { GalleryOption } from '../../data/plazaPrincipalGallery';
import CharacterGuide from '../CharacterGuide';
import ExperienceWheel from '../ExperienceWheel';
import GallerySubmenu from '../GallerySubmenu';
import PlaceExperienceHeader from '../PlaceExperienceHeader';
import type { PlaceExperienceScreenProps } from './PlaceExperienceScreen.types';
import styles from './PlaceExperienceScreen.module.css';

let restoreGallerySubmenuOnMount = false;

export const PlaceExperienceScreen: React.FC<
  PlaceExperienceScreenProps
> = ({ place, onBack, onNavigate, onOpenSettings }) => {
  const [activeSubmenu, setActiveSubmenu] =
    useState<ActiveExperienceSubmenu>(() => {
      const initialSubmenu = restoreGallerySubmenuOnMount
        ? 'gallery'
        : null;
      restoreGallerySubmenuOnMount = false;
      return initialSubmenu;
    });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveSubmenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBack = () => {
    setActiveSubmenu(null);
    onBack();
  };

  const handleGallerySelect = (option: GalleryOption) => {
    setActiveSubmenu(null);
    restoreGallerySubmenuOnMount = true;
    onNavigate(option.destination);
  };

  return (
    <section
      className={styles.screen}
      style={{ backgroundImage: `url("${place.backgroundImage}")` }}
    >
      <div className={styles.content}>
        <PlaceExperienceHeader
          title={place.title}
          onBack={handleBack}
          hideAudio
          onOpenSettings={onOpenSettings}
        />

        <main className={styles.main}>
          <ExperienceWheel
            experiences={place.experiences}
            centerIcon={place.centerIcon}
            placeLabel={place.title}
            activeSubmenu={activeSubmenu}
            onToggleGallery={() =>
              setActiveSubmenu((current) =>
                current === 'gallery' ? null : 'gallery'
              )
            }
            onCloseSubmenu={() => setActiveSubmenu(null)}
            onNavigate={onNavigate}
          />
          {activeSubmenu === 'gallery' && (
            <GallerySubmenu onSelect={handleGallerySelect} />
          )}
          <CharacterGuide
            video={VIDEOS.plazaPrincipal.welcomeCharacter}
            name="Don José, guía de Villa de Leyva"
          />
        </main>
      </div>
    </section>
  );
};

export default PlaceExperienceScreen;
