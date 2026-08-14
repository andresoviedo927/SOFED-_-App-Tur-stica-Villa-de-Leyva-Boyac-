import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import styles from './SplashScreen.module.css';

const SplashScreen = () => (
  <main className={styles.screen}>
    <div className={styles.glow} aria-hidden="true" />
    <div className={styles.content}>
      <h1 className={styles.title}>{TEXTS.splash.title}</h1>
      <img
        className={styles.logo}
        src={IMAGES.splash.logo}
        alt={TEXTS.splash.logoAlt}
        width="140"
        height="140"
        draggable={false}
      />
      <p
        className={styles.loading}
        role="status"
        aria-label={`${TEXTS.splash.loading}...`}
      >
        <span>{TEXTS.splash.loading}</span>
        <span className={styles.dots} aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  </main>
);

export default SplashScreen;
