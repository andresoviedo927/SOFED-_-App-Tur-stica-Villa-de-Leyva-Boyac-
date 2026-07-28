import type { CSSProperties, Key } from 'react';
import type { MapDirectoryPoint } from '../mapDirectory.types';
import styles from './DirectoryMapPin.module.css';

interface DirectoryMapPinProps<
  TPoint extends MapDirectoryPoint,
> {
  key?: Key;
  point: TPoint;
  index: number;
  isSelected: boolean;
  visualWidth?: number;
  visualHeight?: number;
  onSelect: (pointId: TPoint['id']) => void;
}

export const DirectoryMapPin = <
  TPoint extends MapDirectoryPoint,
>({
  point,
  index,
  isSelected,
  visualWidth = 24,
  visualHeight = 30,
  onSelect,
}: DirectoryMapPinProps<TPoint>) => (
  <button
    type="button"
    className={styles.pin}
    data-selected={isSelected}
    aria-label={point.name}
    aria-pressed={isSelected}
    style={
      {
        left: `${point.mapPosition.xPercent}%`,
        top: `${point.mapPosition.yPercent}%`,
        animationDelay: `${Math.min(index * 20, 120)}ms`,
        '--pin-width': `${visualWidth}px`,
        '--pin-height': `${visualHeight}px`,
      } as CSSProperties
    }
    onPointerDown={(event) => event.stopPropagation()}
    onClick={() => onSelect(point.id)}
  >
    <img src={point.pinAsset} alt="" draggable={false} />
  </button>
);

export default DirectoryMapPin;
