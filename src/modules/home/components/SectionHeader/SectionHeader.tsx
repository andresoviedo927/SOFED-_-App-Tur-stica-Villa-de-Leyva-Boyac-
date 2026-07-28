import React from 'react';
import Heading from '@/components/ui/Typography/Heading';
import BodyText from '@/components/ui/Typography/BodyText';
import { SectionHeaderProps } from './SectionHeader.types';
import styles from './SectionHeader.module.css';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionClick,
  rightElement,
  className = '',
}) => {
  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <div className={styles.titleGroup}>
        <Heading level={2} size="medium" className="text-white">
          {title}
        </Heading>
        {subtitle && (
          <BodyText size="small" className="text-slate-400">
            {subtitle}
          </BodyText>
        )}
      </div>
      <div>
        {rightElement ||
          (actionText && onActionClick && (
            <button
              type="button"
              onClick={onActionClick}
              className={styles.actionButton}
            >
              {actionText}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SectionHeader;
