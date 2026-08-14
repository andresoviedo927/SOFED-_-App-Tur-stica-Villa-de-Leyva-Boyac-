import useSavedSettings from '@/modules/settings/hooks/useSavedSettings';
import useNarration from '@/modules/interactive/hooks/useNarration';
import type { EventNarrationParagraph } from '../types';

export const useEventNarration = (
  content: readonly EventNarrationParagraph[]
) => {
  const settings = useSavedSettings();

  const narration = useNarration({
    content,
    language: 'es-CO',
    volume: settings.narrationVolume / 100,
    autoStart: settings.automaticNarration,
  });

  return {
    ...narration,
    isCharacterVisible:
      narration.isCharacterVisible ||
      narration.narrationStatus === 'paused',
  };
};

export default useEventNarration;
