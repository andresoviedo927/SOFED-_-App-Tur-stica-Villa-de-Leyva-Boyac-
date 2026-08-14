import React from 'react';
import PlaceExperienceScreen from './PlaceExperienceScreen';
import PLAZA_PRINCIPAL_PLACE from '../data/placeExperiences';

interface PlazaPrincipalSectionProps {
  onBack: () => void;
  onNavigate: (destination: string) => void;
  onOpenSettings?: () => void;
}

export const PlazaPrincipalSection: React.FC<
  PlazaPrincipalSectionProps
> = ({ onBack, onNavigate, onOpenSettings }) => (
  <PlaceExperienceScreen
    place={PLAZA_PRINCIPAL_PLACE}
    onBack={onBack}
    onNavigate={onNavigate}
    onOpenSettings={onOpenSettings}
  />
);

export default PlazaPrincipalSection;
