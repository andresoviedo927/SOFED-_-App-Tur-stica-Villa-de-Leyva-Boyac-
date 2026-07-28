import { useMemo, useRef, useState } from 'react';
import { getSavedSettings, saveSettings } from '../services/settingsService';
import type { SettingsState } from '../types';

const MINIMUM_SAVING_TIME = 500;

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

const areSettingsEqual = (
  initialValues: SettingsState,
  currentValues: SettingsState
) => {
  const keys = Object.keys({
    ...initialValues,
    ...currentValues,
  }) as Array<keyof SettingsState>;

  return keys.every((key) => initialValues[key] === currentValues[key]);
};

export const useSettings = () => {
  const [initialValues, setInitialValues] = useState<SettingsState>(() =>
    getSavedSettings()
  );
  const [currentValues, setCurrentValues] = useState<SettingsState>(() => ({
    ...initialValues,
  }));
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const savingRef = useRef(false);

  const isDirty = useMemo(
    () => !areSettingsEqual(initialValues, currentValues),
    [currentValues, initialValues]
  );

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    if (savingRef.current || isSaveSuccessful) {
      return;
    }

    setCurrentValues((previousValues) => ({
      ...previousValues,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (!isDirty || savingRef.current || isSaveSuccessful) {
      return;
    }

    savingRef.current = true;
    setIsSaving(true);

    try {
      const valuesToSave = { ...currentValues };

      await Promise.all([
        saveSettings(valuesToSave),
        wait(MINIMUM_SAVING_TIME),
      ]);

      setInitialValues(valuesToSave);
      setCurrentValues(valuesToSave);
      setIsSaveSuccessful(true);
    } catch (error) {
      console.error('Failed to save settings', error);
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  return {
    initialValues,
    currentValues,
    isDirty,
    isSaving,
    isSaveSuccessful,
    updateSetting,
    handleSave,
  };
};

export default useSettings;
