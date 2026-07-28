import type { CSSProperties, ReactNode } from 'react';
import styles from './DirectoryMapCard.module.css';

interface DirectoryMapCardProps {
  width: number;
  height?: number;
  children: ReactNode;
}

export const DirectoryMapCard = ({
  width,
  height = 290,
  children,
}: DirectoryMapCardProps) => (
  <div
    className={styles.frame}
    style={
      {
        '--directory-card-width': `${width}px`,
        '--directory-card-height': `${height}px`,
      } as CSSProperties
    }
  >
    {children}
  </div>
);

export default DirectoryMapCard;
