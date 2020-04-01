import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState(() => {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      return JSON.parse(storedItem);
    }
    return defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
