import {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react';
import styles from './ScreenTransition.module.css';

interface ScreenTransitionProps {
  children: ReactNode;
  transitionKey: string;
  enabled?: boolean;
  overlay?: boolean;
}

export const ScreenTransition = ({
  children,
  transitionKey,
  enabled = true,
  overlay = false,
}: ScreenTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.classList.remove(styles.screenEnter);

    if (!enabled) {
      return;
    }

    void container.offsetWidth;
    container.classList.add(styles.screenEnter);
  }, [enabled, transitionKey]);

  return (
    <div
      ref={containerRef}
      className={[
        styles.screenTransition,
        enabled ? styles.screenEnter : '',
        overlay ? styles.overlay : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};

export default ScreenTransition;
