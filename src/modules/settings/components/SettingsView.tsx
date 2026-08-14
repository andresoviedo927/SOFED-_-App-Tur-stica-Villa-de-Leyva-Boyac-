import React, { useEffect } from 'react';
import IMAGES from '@/assets/images';
import AppIcon from '@/components/ui/AppIcon';
import Button from '@/components/ui/Button';
import TEXTS from '@/constants/texts';
import { stopAllNarrations } from '@/modules/interactive/services/BrowserNarrationService';
import { previewSoundEffectsVolume } from '@/services/SoundEffectsService';
import useSettings from '../hooks/useSettings';
import styles from './SettingsView.module.css';

const SUCCESS_DISPLAY_TIME = 1200;

interface SettingsViewProps {
  onBack: () => void;
  onSavingChange?: (isSaving: boolean) => void;
}

interface SettingsSwitchProps {
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}

interface SettingsSliderProps {
  id: string;
  label: string;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

const SettingsSwitch: React.FC<SettingsSwitchProps> = ({
  label,
  checked,
  disabled,
  onChange,
}) => (
  <div className={styles.switchRow}>
    <span className={styles.switchLabel}>{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`${styles.switchControl} ${
        checked ? styles.switchControlActive : ''
      }`}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.switchThumb} />
    </button>
  </div>
);

const SettingsSlider: React.FC<SettingsSliderProps> = ({
  id,
  label,
  value,
  disabled,
  onChange,
}) => (
  <div className={styles.sliderControl}>
    <label htmlFor={id} className={styles.sliderLabel}>
      {label}
    </label>
    <div className={styles.sliderScale}>
      <span className={styles.sliderLimit}>0</span>
      <div
        className={styles.sliderTrackArea}
        style={{ '--slider-value': `${value}%` } as React.CSSProperties}
      >
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          disabled={disabled}
          aria-valuetext={`${value}`}
          className={styles.sliderInput}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <output htmlFor={id} className={styles.sliderValue}>
          {value}
        </output>
      </div>
      <span className={styles.sliderLimit}>100</span>
    </div>
  </div>
);

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBack,
  onSavingChange,
}) => {
  const {
    currentValues,
    isDirty,
    isSaving,
    isSaveSuccessful,
    updateSetting,
    handleSave,
  } = useSettings();

  const isInteractionLocked = isSaving || isSaveSuccessful;
  const isSaveDisabled = !isDirty || isInteractionLocked;

  useEffect(() => {
    onSavingChange?.(isSaving);
  }, [isSaving, onSavingChange]);

  useEffect(
    () => () => {
      onSavingChange?.(false);
    },
    [onSavingChange]
  );

  useEffect(() => {
    if (!isSaving) {
      return;
    }

    const preventUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', preventUnload);

    return () => {
      window.removeEventListener('beforeunload', preventUnload);
    };
  }, [isSaving]);

  useEffect(() => {
    if (!isSaveSuccessful) {
      return;
    }

    const returnTimer = window.setTimeout(onBack, SUCCESS_DISPLAY_TIME);

    return () => {
      window.clearTimeout(returnTimer);
    };
  }, [isSaveSuccessful, onBack]);

  return (
    <main
      className={styles.settingsPage}
      aria-busy={isSaving}
      style={{
        backgroundImage: `linear-gradient(rgba(26, 33, 43, 0.6), rgba(26, 33, 43, 0.6)), url(${IMAGES.settings.pageBackground})`,
      }}
    >
      <header className={styles.settingsHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          disabled={isInteractionLocked}
          aria-label={TEXTS.settings.backLabel}
        >
          <AppIcon
            name="fi-rr-angle-small-left"
            size={24}
            color="#FFFFFF"
          />
          <span>{TEXTS.settings.backLabel}</span>
        </button>

        <h1 className={styles.settingsTitle}>{TEXTS.settings.title}</h1>

        <span className={styles.headerBalance} aria-hidden="true" />
      </header>

      <div className={styles.settingsContent}>
        <div className={styles.settingsGrid}>
          <SettingsSwitch
            label={TEXTS.settings.automaticNarration}
            checked={currentValues.automaticNarration}
            disabled={isInteractionLocked}
            onChange={(checked) => {
              if (!checked) {
                stopAllNarrations();
              }
              updateSetting('automaticNarration', checked);
            }}
          />

          <SettingsSwitch
            label={TEXTS.settings.augmentedReality}
            checked={currentValues.augmentedReality}
            disabled={isInteractionLocked}
            onChange={(checked) =>
              updateSetting('augmentedReality', checked)
            }
          />

          <SettingsSlider
            id="narration-volume-slider"
            label={TEXTS.settings.narrationVolume}
            value={currentValues.narrationVolume}
            disabled={isInteractionLocked}
            onChange={(value) => {
              stopAllNarrations();
              updateSetting('narrationVolume', value);
            }}
          />

          <SettingsSlider
            id="sound-effects-slider"
            label={TEXTS.settings.soundEffectsVolume}
            value={currentValues.soundEffectsVolume}
            disabled={isInteractionLocked}
            onChange={(value) => {
              updateSetting('soundEffectsVolume', value);
              previewSoundEffectsVolume(value);
            }}
          />
        </div>

        <Button
          kind="solid"
          size="small"
          onClick={handleSave}
          disabled={isSaveDisabled}
          loading={isSaving}
          ariaLabel={
            isSaving
              ? TEXTS.settings.savingChanges
              : TEXTS.settings.saveChanges
          }
          rightIcon={
            <AppIcon
              name="fi-rr-arrow-right"
              size={24}
              color="currentColor"
            />
          }
        >
          {isSaving
            ? TEXTS.settings.savingChanges
            : TEXTS.settings.saveChanges}
        </Button>
      </div>

      {isInteractionLocked ? (
        <div
          className={styles.statusOverlay}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className={styles.statusCard}>
            {isSaving ? (
              <>
                <span className={styles.loadingIndicator} aria-hidden="true" />
                <p className={styles.statusTitle}>
                  {TEXTS.settings.savingChanges}
                </p>
              </>
            ) : (
              <>
                <span className={styles.successIcon} aria-hidden="true">
                  <AppIcon
                    name="fi-rr-check"
                    size={28}
                    color="currentColor"
                  />
                </span>
                <p className={styles.statusTitle}>
                  {TEXTS.settings.changesSavedTitle}
                </p>
                <p className={styles.statusMessage}>
                  {TEXTS.settings.changesSavedMessage}
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default SettingsView;
