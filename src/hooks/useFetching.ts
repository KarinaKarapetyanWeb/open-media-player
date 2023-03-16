import { useState } from 'react';

export const useFetching = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async () => {
    try {
      setIsLoading(true);
      setError(false);
      await callback();
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
