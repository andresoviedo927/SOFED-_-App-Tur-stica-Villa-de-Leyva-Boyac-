import IMAGES from '@/assets/images';
import styles from './GameIntroductionScreen.module.css';

interface GameIdentityProps {
  title: string;
  subtitle: string;
}

export const GameIdentity = ({
  title,
  subtitle,
}: GameIdentityProps) => (
  <section className={styles.identity}>
    <img
      className={styles.gameIcon}
      src={IMAGES.games.secretPlazaRouteIcon}
      alt=""
      aria-hidden="true"
    />
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  </section>
);

export default GameIdentity;
