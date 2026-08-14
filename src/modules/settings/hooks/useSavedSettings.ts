import { useEffect, useState } from 'react';
import {
  getSavedSettings,
  subscribeToSettings,
} from '../services/settingsService';

export const useSavedSettings = () => {
  const [settings, setSettings] = useState(getSavedSettings);

  useEffect(
    () => subscribeToSettings(setSettings),
    []
  );

  return settings;
};

export default useSavedSettings;
