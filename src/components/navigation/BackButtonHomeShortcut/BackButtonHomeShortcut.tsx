import { useEffect, useRef } from 'react';
import TEXTS from '@/constants/texts';

const LONG_PRESS_DURATION_MS = 650;

interface BackButtonHomeShortcutProps {
  onGoHome: () => void;
}

interface LabelSnapshot {
  element: HTMLElement;
  text: string;
}

interface ActivePress {
  button: HTMLButtonElement;
  pointerId: number;
  originalAriaLabel: string;
  originalTitle: string | null;
  labels: LabelSnapshot[];
  activated: boolean;
}

const getBackButton = (
  target: EventTarget | null
): HTMLButtonElement | null => {
  if (!(target instanceof Element)) {
    return null;
  }

  const button = target.closest<HTMLButtonElement>('button');

  return button?.getAttribute('aria-label') === TEXTS.common.back
    ? button
    : null;
};

const getVisibleLabels = (
  button: HTMLButtonElement
): LabelSnapshot[] =>
  Array.from(button.querySelectorAll<HTMLElement>('span'))
    .filter(
      (element) =>
        element.children.length === 0 &&
        element.textContent?.trim() === TEXTS.common.back
    )
    .map((element) => ({
      element,
      text: element.textContent ?? TEXTS.common.back,
    }));

export const BackButtonHomeShortcut = ({
  onGoHome,
}: BackButtonHomeShortcutProps) => {
  const timerRef = useRef<number | null>(null);
  const activePressRef = useRef<ActivePress | null>(null);
  const suppressedClickRef = useRef<HTMLButtonElement | null>(
    null
  );

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const restoreButton = (press: ActivePress) => {
      delete press.button.dataset.longPressHome;
      press.button.setAttribute(
        'aria-label',
        press.originalAriaLabel
      );

      if (press.originalTitle === null) {
        press.button.removeAttribute('title');
      } else {
        press.button.setAttribute('title', press.originalTitle);
      }

      press.labels.forEach(({ element, text }) => {
        element.textContent = text;
      });
    };

    const cancelPress = () => {
      clearTimer();

      if (activePressRef.current) {
        restoreButton(activePressRef.current);
        activePressRef.current = null;
      }
    };

    const activateHomeShortcut = (press: ActivePress) => {
      if (activePressRef.current !== press) {
        return;
      }

      press.activated = true;
      press.button.dataset.longPressHome = 'true';
      press.button.setAttribute(
        'aria-label',
        TEXTS.common.goHomeLongPress
      );
      press.button.setAttribute(
        'title',
        TEXTS.common.goHomeLongPress
      );
      press.labels.forEach(({ element }) => {
        element.textContent = TEXTS.common.goHomeLongPress;
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      const button = getBackButton(event.target);

      if (!button || button.disabled) {
        return;
      }

      cancelPress();

      const press: ActivePress = {
        button,
        pointerId: event.pointerId,
        originalAriaLabel:
          button.getAttribute('aria-label') ?? TEXTS.common.back,
        originalTitle: button.getAttribute('title'),
        labels: getVisibleLabels(button),
        activated: false,
      };

      activePressRef.current = press;
      timerRef.current = window.setTimeout(() => {
        activateHomeShortcut(press);
      }, LONG_PRESS_DURATION_MS);
    };

    const handlePointerUp = (event: PointerEvent) => {
      const press = activePressRef.current;

      if (!press || press.pointerId !== event.pointerId) {
        return;
      }

      clearTimer();

      if (!press.activated) {
        activePressRef.current = null;
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      suppressedClickRef.current = press.button;
      restoreButton(press);
      activePressRef.current = null;
      onGoHome();

      window.setTimeout(() => {
        if (suppressedClickRef.current === press.button) {
          suppressedClickRef.current = null;
        }
      }, 0);
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (activePressRef.current?.pointerId === event.pointerId) {
        cancelPress();
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      const press = activePressRef.current;

      if (
        !press ||
        !(event.target instanceof Node) ||
        !press.button.contains(event.target)
      ) {
        return;
      }

      if (
        event.relatedTarget instanceof Node &&
        press.button.contains(event.relatedTarget)
      ) {
        return;
      }

      cancelPress();
    };

    const handleClick = (event: MouseEvent) => {
      const suppressedButton = suppressedClickRef.current;

      if (
        !suppressedButton ||
        !(event.target instanceof Node) ||
        !suppressedButton.contains(event.target)
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      suppressedClickRef.current = null;
    };

    const handleContextMenu = (event: MouseEvent) => {
      const press = activePressRef.current;

      if (
        press &&
        event.target instanceof Node &&
        press.button.contains(event.target)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('pointerup', handlePointerUp, true);
    document.addEventListener(
      'pointercancel',
      handlePointerCancel,
      true
    );
    document.addEventListener(
      'pointerleave',
      handlePointerLeave,
      true
    );
    document.addEventListener('click', handleClick, true);
    document.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      cancelPress();
      document.removeEventListener(
        'pointerdown',
        handlePointerDown,
        true
      );
      document.removeEventListener(
        'pointerup',
        handlePointerUp,
        true
      );
      document.removeEventListener(
        'pointercancel',
        handlePointerCancel,
        true
      );
      document.removeEventListener(
        'pointerleave',
        handlePointerLeave,
        true
      );
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener(
        'contextmenu',
        handleContextMenu,
        true
      );
    };
  }, [onGoHome]);

  return null;
};

export default BackButtonHomeShortcut;
