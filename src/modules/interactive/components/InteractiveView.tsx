import React from 'react';
import InteractiveMapScreen from './InteractiveMapScreen';

interface InteractiveViewProps {
  onBack: () => void;
  onOpenSettings?: () => void;
  onOpenPlazaPrincipal?: () => void;
}

export const InteractiveView: React.FC<InteractiveViewProps> = (props) => (
  <InteractiveMapScreen {...props} />
);

export default InteractiveView;
