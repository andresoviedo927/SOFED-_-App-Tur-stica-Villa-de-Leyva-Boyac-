import uiBack from '@/assets/audio/ui-back.wav';
import uiClick from '@/assets/audio/ui-click.wav';
import uiOpen from '@/assets/audio/ui-open.wav';
import uiPin from '@/assets/audio/ui-pin.wav';
import uiSelect from '@/assets/audio/ui-select.wav';
import uiSuccess from '@/assets/audio/ui-success.wav';
import uiSwipe from '@/assets/audio/ui-swipe.wav';
import uiUnselect from '@/assets/audio/ui-unselect.wav';
import { getSavedSettings } from '@/modules/settings/services/settingsService';

export type SoundEffectName =
  | 'click'
  | 'select'
  | 'unselect'
  | 'pin'
  | 'open'
  | 'back'
  | 'swipe'
  | 'success';

interface SoundConfig {
  source: string;
  baseGain: number;
  minimumInterval: number;
  poolSize?: number;
}

interface SoundPool {
  sounds: HTMLAudioElement[];
  cursor: number;
}

const SOUND_CONFIGS: Record<SoundEffectName, SoundConfig> = {
  click: {
    source: uiClick,
    baseGain: 0.52,
    minimumInterval: 28,
  },
  select: {
    source: uiSelect,
    baseGain: 0.56,
    minimumInterval: 38,
  },
  unselect: {
    source: uiUnselect,
    baseGain: 0.46,
    minimumInterval: 38,
  },
  pin: {
    source: uiPin,
    baseGain: 0.52,
    minimumInterval: 45,
  },
  open: {
    source: uiOpen,
    baseGain: 0.54,
    minimumInterval: 45,
  },
  back: {
    source: uiBack,
    baseGain: 0.5,
    minimumInterval: 45,
  },
  swipe: {
    source: uiSwipe,
    baseGain: 0.46,
    minimumInterval: 60,
  },
  success: {
    source: uiSuccess,
    baseGain: 0.58,
    minimumInterval: 120,
    poolSize: 2,
  },
};

const soundPools = new Map<SoundEffectName, SoundPool>();
const lastPlayedAt = new Map<SoundEffectName, number>();
let lastPreviewAt = 0;

const clampVolume = (volume: number) =>
  Math.min(100, Math.max(0, volume));

const createSound = (source: string) => {
  const sound = new Audio(source);
  sound.preload = 'auto';
  sound.load();
  return sound;
};

const getSoundPool = (effect: SoundEffectName) => {
  const existingPool = soundPools.get(effect);
  if (existingPool) {
    return existingPool;
  }

  const config = SOUND_CONFIGS[effect];
  const pool: SoundPool = {
    sounds: Array.from(
      { length: config.poolSize ?? 4 },
      () => createSound(config.source)
    ),
    cursor: 0,
  };

  soundPools.set(effect, pool);
  return pool;
};

export const preloadSoundEffects = () => {
  if (typeof window === 'undefined') {
    return;
  }

  (Object.keys(SOUND_CONFIGS) as SoundEffectName[]).forEach(
    getSoundPool
  );
};

export const playSoundEffect = (
  effect: SoundEffectName,
  volumeOverride?: number
) => {
  if (typeof window === 'undefined') {
    return;
  }

  const config = SOUND_CONFIGS[effect];
  const now = performance.now();
  const lastPlayed = lastPlayedAt.get(effect) ?? 0;

  if (now - lastPlayed < config.minimumInterval) {
    return;
  }

  const volume = clampVolume(
    volumeOverride ?? getSavedSettings().soundEffectsVolume
  );
  if (volume === 0) {
    return;
  }

  const pool = getSoundPool(effect);
  const availableSound = pool.sounds.find(
    (sound) => sound.paused || sound.ended
  );
  const sound = availableSound ?? pool.sounds[pool.cursor];

  pool.cursor = (pool.cursor + 1) % pool.sounds.length;
  sound.pause();
  sound.currentTime = 0;
  sound.volume = Math.min(1, config.baseGain * (volume / 100));
  lastPlayedAt.set(effect, now);

  void sound.play().catch(() => {
    // Some browsers keep audio locked until the next direct user gesture.
  });
};

export const previewSoundEffectsVolume = (volume: number) => {
  const now = performance.now();
  if (now - lastPreviewAt < 85) {
    return;
  }

  lastPreviewAt = now;
  playSoundEffect('click', volume);
};
