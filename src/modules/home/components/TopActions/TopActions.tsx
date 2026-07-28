import React from 'react';
import { TopActionsProps } from './TopActions.types';
import styles from './TopActions.module.css';

export const TopActions: React.FC<TopActionsProps> = ({
  leftAction,
  rightAction,
  title,
  className = '',
}) => {
  return (
    <div className={`${styles.topActions} ${className}`}>
      <div>{leftAction}</div>
      {title && <div className={styles.title}>{title}</div>}
      <div>{rightAction}</div>
    </div>
  );
};

export default TopActions;
