import type { RoutePointPreview } from '../types/game.types';
import styles from './GameIntroductionScreen.module.css';

interface RoutePointsPreviewProps {
  title: string;
  points: readonly RoutePointPreview[];
  validationNote: string;
}

export const RoutePointsPreview = ({
  title,
  points,
  validationNote,
}: RoutePointsPreviewProps) => (
  <section className={styles.informationSection}>
    <h3>{title}</h3>
    <ol className={styles.routePoints}>
      {points.map((point) => (
        <li key={point.id}>
          <span>{point.order}</span>
          <div>
            <h4>{point.name}</h4>
            <p>{point.shortDescription}</p>
          </div>
        </li>
      ))}
    </ol>
    <p className={styles.validationNote}>{validationNote}</p>
  </section>
);

export default RoutePointsPreview;
