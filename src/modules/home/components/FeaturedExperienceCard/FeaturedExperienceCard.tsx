import React from 'react';
import Card from '@/components/ui/Card';
import { FeaturedExperienceCardProps } from './FeaturedExperienceCard.types';
import styles from './FeaturedExperienceCard.module.css';

export const FeaturedExperienceCard: React.FC<FeaturedExperienceCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  badge,
  onClick,
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <Card
        variant="featured"
        title={title}
        subtitle={subtitle}
        imageUrl={imageUrl}
        badge={badge}
        onClick={onClick}
      >
        {description && <p className="text-xs text-slate-300 mt-1">{description}</p>}
      </Card>
    </div>
  );
};

export default FeaturedExperienceCard;
