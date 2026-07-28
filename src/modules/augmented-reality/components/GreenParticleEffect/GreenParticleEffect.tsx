import type { CSSProperties } from 'react';
import { GREEN_PARTICLES } from '../../constants/augmentedReality';
import styles from './GreenParticleEffect.module.css';

export const GreenParticleEffect = () => (
  <div className={styles.particles} aria-hidden="true">
    {GREEN_PARTICLES.map((particle) => (
      <span
        key={particle.id}
        style={
          {
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            '--particle-scale': particle.scale,
            '--particle-duration': `${particle.duration}ms`,
            '--particle-delay': `${particle.delay}ms`,
          } as CSSProperties
        }
      />
    ))}
  </div>
);

export default GreenParticleEffect;
