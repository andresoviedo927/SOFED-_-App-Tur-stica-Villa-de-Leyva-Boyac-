import { useState, useEffect } from 'react';

export const useExample = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    setData('Example custom hook ready');
  }, []);

  return { data };
};

export default useExample;
