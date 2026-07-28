import { useState } from 'react';
import { getARFossils } from '../services/arService';
import { ARFossil } from '../types';

export const useAR = () => {
  const [fossils] = useState<ARFossil[]>(getARFossils());
  return { fossils };
};

export default useAR;
