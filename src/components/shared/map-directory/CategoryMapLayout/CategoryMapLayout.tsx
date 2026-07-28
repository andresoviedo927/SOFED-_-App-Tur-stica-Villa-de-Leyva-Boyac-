import type { ReactNode } from 'react';
import IMAGES from '@/assets/images';
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { SettingsButton } from '@/modules/home/components/SettingsButton';
import styles from './CategoryMapLayout.module.css';

interface CategoryMapLayoutProps {
  title: string;
  contentLabel: string;
  onBack: () => void;
  onOpenSettings: () => void;
  children: ReactNode;
}

export const CategoryMapLayout = ({
  title,
  contentLabel,
  onBack,
  onOpenSettings,
  children,
}: CategoryMapLayoutProps) => (
  <main
    className={styles.screen}
    style={{ backgroundImage: `url(${IMAGES.interactive.map})` }}
  >
    <div className={styles.overlay} />
    <div className={styles.layout}>
      <header className={styles.header}>
        <Button
          kind="transparent"
          size="small"
          className={styles.back}
          ariaLabel={TEXTS.common.back}
          leftIcon={
            <AppIcon
              name="fi-rr-angle-small-left"
              size={24}
              color="currentColor"
            />
          }
          onClick={onBack}
        >
          {TEXTS.common.back}
        </Button>
        <h1>{title}</h1>
        <SettingsButton
          className={styles.settings}
          onClick={onOpenSettings}
          ariaLabel={TEXTS.common.settingsLabel}
        />
      </header>
      <section className={styles.content} aria-label={contentLabel}>
        {children}
      </section>
    </div>
  </main>
);

export default CategoryMapLayout;
