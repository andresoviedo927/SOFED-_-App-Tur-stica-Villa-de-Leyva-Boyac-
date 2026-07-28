import { SettingsState } from '../types';

const SETTINGS_STORAGE_KEY = 'villa_de_leyva_settings';

export const DEFAULT_SETTINGS: SettingsState = {
  automaticNarration: false,
  augmentedReality: true,
  narrationVolume: 50,
  soundEffectsVolume: 50,
};

export const getSavedSettings = (): SettingsState => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error('Failed to parse saved settings', e);
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = async (settings: SettingsState): Promise<void> => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};
