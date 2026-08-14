import { SettingsState } from '../types';

const SETTINGS_STORAGE_KEY = 'villa_de_leyva_settings';
const SETTINGS_CHANGED_EVENT = 'villa-de-leyva-settings-changed';

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
  window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT));
};

export const subscribeToSettings = (
  listener: (settings: SettingsState) => void
) => {
  const notify = () => listener(getSavedSettings());
  const handleStorage = (event: StorageEvent) => {
    if (event.key === SETTINGS_STORAGE_KEY) {
      notify();
    }
  };

  window.addEventListener(SETTINGS_CHANGED_EVENT, notify);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(SETTINGS_CHANGED_EVENT, notify);
    window.removeEventListener('storage', handleStorage);
  };
};
