import React from 'react';
import Card from '@/components/ui/Card';
import { EventCardProps } from './EventCard.types';
import styles from './EventCard.module.css';

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  category,
  imageUrl,
  onClick,
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <Card
        variant="interactive"
        title={title}
        subtitle={date ? `${date} • ${location || ''}` : location}
        badge={category}
        imageUrl={imageUrl}
        onClick={onClick}
      />
    </div>
  );
};

export default EventCard;
