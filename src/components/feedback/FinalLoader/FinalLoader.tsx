import IMAGES from '@/assets/images';
import TEXTS from '@/constants/texts';
import styles from './FinalLoader.module.css';

const FinalLoader = () => (
  <main
    className={styles.screen}
    style={{
      backgroundImage: `url(${IMAGES.onboarding.background})`,
    }}
    aria-busy="true"
  >
    <div className={styles.content}>
      <span className={styles.loader} aria-hidden="true" />
      <p role="status">{TEXTS.onboarding.finalLoading}</p>
    </div>
  </main>
);

export default FinalLoader;
