import type { CSSProperties } from 'react';
import GreenParticleEffect from '../GreenParticleEffect';
import styles from './SurfacePlacementGuide.module.css';

interface SurfacePlacementGuideProps {
  progress: number;
  isFading: boolean;
}

export const SurfacePlacementGuide = ({
  progress,
  isFading,
}: SurfacePlacementGuideProps) => (
  <div
    className={styles.guide}
    data-fading={isFading || undefined}
    style={{ '--scan-progress': progress } as CSSProperties}
    aria-hidden="true"
  >
    <div className={styles.glow} />
    <div className={styles.grid} />
    <GreenParticleEffect />
  </div>
);

export default SurfacePlacementGuide;
