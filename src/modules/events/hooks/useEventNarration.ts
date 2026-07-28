import { useMemo } from 'react';
import { getSavedSettings } from '@/modules/settings/services/settingsService';
import useNarration from '@/modules/interactive/hooks/useNarration';
import type { EventNarrationParagraph } from '../types';

export const useEventNarration = (
  content: readonly EventNarrationParagraph[]
) => {
  const settings = useMemo(() => getSavedSettings(), []);

  const narration = useNarration({
    content,
    language: 'es-CO',
    volume: settings.narrationVolume / 100,
  });

  return {
    ...narration,
    isCharacterVisible:
      narration.isCharacterVisible ||
      narration.narrationStatus === 'paused',
  };
};

export default useEventNarration;
