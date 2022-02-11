import { useState } from 'react';

export function useLoadings() {
  const [isLoading, setIsloading] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return {
    isLoading,
    setIsloading,
    isError,
    setIsError,
    isLoaded,
    setIsloaded,
  };
}
