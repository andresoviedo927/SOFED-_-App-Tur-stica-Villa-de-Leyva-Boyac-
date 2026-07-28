import React from 'react';
import Card from '@/components/ui/Card';
import StatusIcon from '@/components/ui/Icon/StatusIcon';
import { NearbyPlaceCardProps } from './NearbyPlaceCard.types';
import styles from './NearbyPlaceCard.module.css';

export const NearbyPlaceCard: React.FC<NearbyPlaceCardProps> = ({
  name,
  category,
  distance,
  imageUrl,
  onClick,
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <Card
        variant="compact"
        title={name}
        subtitle={category}
        imageUrl={imageUrl}
        onClick={onClick}
      >
        {distance && (
          <div className="mt-2">
            <StatusIcon status="location" message={distance} size={14} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default NearbyPlaceCard;
