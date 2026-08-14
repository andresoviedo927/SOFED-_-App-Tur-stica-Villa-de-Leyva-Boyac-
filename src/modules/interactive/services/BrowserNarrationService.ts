import {
  CHARACTER_VOICE_CONFIG,
  LATIN_AMERICAN_SPANISH_LOCALES,
  MALE_VOICE_HINTS,
} from '../constants/voice';
import type {
  NarrationError,
  NarrationOptions,
  NarrationService,
} from '../types/narration.types';

interface ActiveNarration {
  utterance: SpeechSynthesisUtterance;
  resolve: () => void;
  settled: boolean;
}

const createNarrationError = (
  code: NarrationError['code'],
  message: string,
  cause?: unknown
): NarrationError => ({ code, message, cause });

export const normalizeVoiceValue = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const normalizeLocale = (locale: string) =>
  locale.replace('_', '-').toLowerCase();

export const loadSpeechVoices = (
  timeoutMs = 3000
): Promise<SpeechSynthesisVoice[]> =>
  new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const initialVoices = synth.getVoices();

    if (initialVoices.length > 0) {
      resolve(initialVoices);
      return;
    }

    let settled = false;

    const finish = (voices: SpeechSynthesisVoice[]) => {
      if (settled) return;

      settled = true;
      synth.removeEventListener(
        'voiceschanged',
        handleVoicesChanged
      );
      window.clearTimeout(timeoutId);
      resolve(voices);
    };

    const handleVoicesChanged = () => {
      const voices = synth.getVoices();

      if (voices.length > 0) {
        finish(voices);
      }
    };

    const timeoutId = window.setTimeout(
      () => finish(synth.getVoices()),
      timeoutMs
    );

    synth.addEventListener('voiceschanged', handleVoicesChanged);
  });

export const selectLatinAmericanMaleVoice = (
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null => {
  const allowedLocales = new Set(
    LATIN_AMERICAN_SPANISH_LOCALES.map((locale) =>
      locale.toLowerCase()
    )
  );
  const blockedLocales = new Set(
    CHARACTER_VOICE_CONFIG.blockedLocales.map((locale) =>
      locale.toLowerCase()
    )
  );

  const scoredVoices = voices
    .filter((voice) => {
      const locale = normalizeLocale(voice.lang);
      return (
        allowedLocales.has(locale) &&
        !blockedLocales.has(locale)
      );
    })
    .map((voice) => {
      const name = normalizeVoiceValue(
        `${voice.name} ${voice.voiceURI}`
      );
      const locale = normalizeLocale(voice.lang);
      const localeIndex =
        LATIN_AMERICAN_SPANISH_LOCALES.findIndex(
          (candidate) => candidate.toLowerCase() === locale
        );
      const hasMaleHint = MALE_VOICE_HINTS.some((maleName) =>
        name.includes(normalizeVoiceValue(maleName))
      );
      let score =
        localeIndex === -1
          ? 0
          : (LATIN_AMERICAN_SPANISH_LOCALES.length -
              localeIndex) *
            5;

      if (locale === 'es-co') score += 100;
      if (locale === 'es-mx') score += 80;
      if (locale === 'es-us') score += 70;
      if (locale === 'es-ar') score += 60;
      if (locale === 'es-cl') score += 55;
      if (locale === 'es-pe') score += 50;
      if (hasMaleHint) score += 100;
      if (voice.localService) score += 5;
      if (voice.default) score += 2;

      return { voice, score, hasMaleHint };
    })
    .sort((first, second) => second.score - first.score);

  return (
    scoredVoices.find((candidate) => candidate.hasMaleHint)?.voice ??
    null
  );
};

export class BrowserNarrationService implements NarrationService {
  private currentNarration: ActiveNarration | null = null;
  private generation = 0;

  isSupported() {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window
    );
  }

  async speak(options: NarrationOptions): Promise<void> {
    this.stop();
    const generation = ++this.generation;
    const cleanText = options.text.trim();

    if (!this.isSupported()) {
      const error = createNarrationError(
        'unsupported',
        'No fue posible iniciar la narración en este dispositivo.'
      );
      options.onError?.(error);
      throw error;
    }

    if (!cleanText) {
      const error = createNarrationError(
        'empty-content',
        'No existe contenido para narrar.'
      );
      options.onError?.(error);
      throw error;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    const voices = await loadSpeechVoices();

    if (generation !== this.generation) {
      throw createNarrationError(
        'cancelled',
        'La narración fue cancelada.'
      );
    }

    const voice = selectLatinAmericanMaleVoice(voices);

    if (!voice) {
      const error = createNarrationError(
        'voice-not-found',
        'No encontramos una voz masculina latinoamericana en este dispositivo.'
      );
      options.onError?.(error);
      throw error;
    }

    options.onVoiceSelected?.(voice.name);

    if (options.leadInMs) {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, options.leadInMs);
      });
    }

    if (generation !== this.generation) {
      throw createNarrationError(
        'cancelled',
        'La narración fue cancelada.'
      );
    }

    return new Promise<void>((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const activeNarration: ActiveNarration = {
        utterance,
        resolve,
        settled: false,
      };

      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = Math.min(
        1,
        Math.max(0.7, options.rate ?? CHARACTER_VOICE_CONFIG.rate)
      );
      utterance.pitch = Math.min(
        1,
        Math.max(
          0.65,
          options.pitch ?? CHARACTER_VOICE_CONFIG.pitch
        )
      );
      utterance.volume = Math.min(
        1,
        Math.max(0, options.volume)
      );

      utterance.onstart = () => {
        if (this.currentNarration === activeNarration) {
          options.onStart?.();
        }
      };
      utterance.onboundary = (event) => {
        if (this.currentNarration === activeNarration) {
          options.onBoundary?.(event.charIndex);
        }
      };
      utterance.onend = () => {
        if (
          this.currentNarration !== activeNarration ||
          activeNarration.settled
        ) {
          return;
        }

        activeNarration.settled = true;
        this.currentNarration = null;
        options.onEnd?.();
        resolve();
      };
      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        if (
          this.currentNarration !== activeNarration ||
          activeNarration.settled
        ) {
          return;
        }

        activeNarration.settled = true;
        this.currentNarration = null;

        if (event.error === 'canceled') {
          resolve();
          return;
        }

        const error = createNarrationError(
          'synthesis-error',
          `No fue posible reproducir la narración: ${event.error}`,
          event
        );
        options.onError?.(error);
        reject(error);
      };

      this.currentNarration = activeNarration;
      window.setTimeout(() => {
        if (
          generation === this.generation &&
          this.currentNarration === activeNarration
        ) {
          synth.speak(utterance);
        }
      }, 50);
    });
  }

  stop(): void {
    this.generation += 1;
    const narration = this.currentNarration;

    if (narration && !narration.settled) {
      narration.settled = true;
      narration.utterance.onstart = null;
      narration.utterance.onboundary = null;
      narration.utterance.onend = null;
      narration.utterance.onerror = null;
      narration.resolve();
      this.currentNarration = null;
    }

    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  pause(): void {
    if (this.isSupported() && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  resume(): void {
    if (this.isSupported() && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
}

export const browserNarrationService =
  new BrowserNarrationService();

type NarrationStopListener = () => void;

const narrationStopListeners = new Set<NarrationStopListener>();

export const subscribeToNarrationStopRequests = (
  listener: NarrationStopListener
) => {
  narrationStopListeners.add(listener);

  return () => {
    narrationStopListeners.delete(listener);
  };
};

export const stopAllNarrations = () => {
  narrationStopListeners.forEach((listener) => listener());
  browserNarrationService.stop();
};

export default browserNarrationService;
