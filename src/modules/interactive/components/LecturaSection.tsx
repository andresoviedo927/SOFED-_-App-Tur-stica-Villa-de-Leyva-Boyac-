import PlaceReadingScreen from './PlaceReadingScreen';

interface LecturaSectionProps {
  onBack: () => void;
}

export const LecturaSection = ({ onBack }: LecturaSectionProps) => (
  <PlaceReadingScreen onBack={onBack} />
);

export default LecturaSection;
