import { useEffect } from 'react';
import {
  playSoundEffect,
  preloadSoundEffects,
  type SoundEffectName,
} from '@/services/SoundEffectsService';

const AVAILABLE_EFFECTS = new Set<SoundEffectName>([
  'click',
  'select',
  'unselect',
  'pin',
  'open',
  'back',
  'swipe',
  'success',
]);

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const interactionDescription = (button: HTMLElement) =>
  normalize(
    [
      button.getAttribute('aria-label'),
      button.getAttribute('title'),
      button.textContent,
    ]
      .filter(Boolean)
      .join(' ')
  );

const isCategoryButton = (button: HTMLElement) =>
  button.hasAttribute('aria-pressed') ||
  button.hasAttribute('data-state');

const effectForButton = (
  button: HTMLElement,
  wasSelected?: boolean
): SoundEffectName | null => {
  const explicitEffect = button.dataset.soundEffect;
  if (explicitEffect === 'none') {
    return null;
  }
  if (
    explicitEffect &&
    AVAILABLE_EFFECTS.has(explicitEffect as SoundEffectName)
  ) {
    return explicitEffect as SoundEffectName;
  }

  const description = interactionDescription(button);

  if (/\b(volver|regresar|atras|cerrar|cancelar|salir)\b/.test(description)) {
    return 'back';
  }
  if (isCategoryButton(button)) {
    if (wasSelected !== undefined) {
      return wasSelected ? 'unselect' : 'select';
    }

    const isSelectedNow =
      button.getAttribute('aria-pressed') === 'true' ||
      button.dataset.state === 'selected';
    return isSelectedNow ? 'select' : 'unselect';
  }
  if (
    /\b(completar|finalizar|confirmar|validar|guardar|desbloquear|recompensa)\b/.test(
      description
    )
  ) {
    return 'success';
  }
  if (
    /\b(abrir|iniciar|explorar|detalle|galeria|lectura|dron|ajustes|configuracion)\b/.test(
      description
    )
  ) {
    return 'open';
  }

  return 'click';
};

export const SoundEffectsController = () => {
  useEffect(() => {
    const selectedBeforeClick = new WeakMap<HTMLElement, boolean>();

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const button = event.target.closest<HTMLElement>(
        'button, [role="button"]'
      );
      if (!button || !isCategoryButton(button)) {
        return;
      }

      selectedBeforeClick.set(
        button,
        button.getAttribute('aria-pressed') === 'true' ||
          button.dataset.state === 'selected'
      );
    };

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const button = event.target.closest<HTMLElement>(
        'button, [role="button"]'
      );

      if (button) {
        if (
          button instanceof HTMLButtonElement &&
          (button.disabled || button.getAttribute('aria-disabled') === 'true')
        ) {
          return;
        }

        const effect = effectForButton(
          button,
          selectedBeforeClick.get(button)
        );
        selectedBeforeClick.delete(button);
        if (effect) {
          playSoundEffect(effect);
        }
        return;
      }

      const backdrop = event.target.closest<HTMLElement>(
        '.app-modal-overlay, .app-sidebar-overlay, [class*="dialogBackdrop"]'
      );
      if (backdrop && backdrop === event.target) {
        playSoundEffect('back');
      }
    };

    preloadSoundEffects();
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default SoundEffectsController;
