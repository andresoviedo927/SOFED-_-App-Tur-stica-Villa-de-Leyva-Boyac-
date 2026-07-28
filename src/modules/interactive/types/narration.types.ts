export type NarrationStatus =
  | 'idle'
  | 'loading'
  | 'playing'
  | 'paused'
  | 'stopping'
  | 'completed'
  | 'error';

export type NarrationEngine =
  | 'browserSpeech'
  | 'recordedAudio'
  | 'textOnly';

export interface NarrationError {
  code:
    | 'unsupported'
    | 'voice-not-found'
    | 'synthesis-error'
    | 'empty-content'
    | 'cancelled';
  message: string;
  cause?: unknown;
}

export interface NarrationSentence {
  id: string;
  text: string;
}

export interface NarrationParagraph {
  id: string;
  sentences: readonly NarrationSentence[];
}

export interface NarrationTrackingState {
  status: NarrationStatus;
  activeParagraphId: string | null;
  activeSentenceId: string | null;
  activeWordIndex: number | null;
  completedSentenceIds: readonly string[];
  isAutoFollowEnabled: boolean;
}

export interface NarrationOptions {
  text: string;
  title?: string;
  paragraphs?: readonly string[];
  language: 'es-CO';
  volume: number;
  rate?: number;
  pitch?: number;
  leadInMs?: number;
  onStart?: () => void;
  onBoundary?: (characterIndex: number) => void;
  onEnd?: () => void;
  onVoiceSelected?: (voiceName: string) => void;
  onError?: (error: NarrationError) => void;
}

export interface NarrationService {
  speak(options: NarrationOptions): Promise<void>;
  stop(): void;
  pause(): void;
  resume(): void;
  isSupported(): boolean;
}

export interface ReadingScreenState {
  narrationStatus: NarrationStatus;
  isNarrationActive: boolean;
  isCharacterVisible: boolean;
  activeParagraphId: string | null;
  activeSentenceId: string | null;
  activeWordIndex: number | null;
  completedSentenceIds: readonly string[];
  isAutoFollowEnabled: boolean;
  selectedVoiceName: string | null;
  errorMessage: string | null;
}
