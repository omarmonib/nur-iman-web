'use client';

import { useCallback, useEffect, useState } from 'react';

function readFromStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : initialValue;
  } catch (err) {
    console.warn(`[useLocalStorage] Failed to read key "${key}":`, err);
    return initialValue;
  }
}

function writeToStorage<T>(key: string, value: T): void {
  try {
    if (value === undefined || value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`[useLocalStorage] Failed to write key "${key}":`, err);
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => readFromStorage(key, initialValue));

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to remove key "${key}":`, err);
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      setStoredValue(e.newValue !== null ? (JSON.parse(e.newValue) as T) : initialValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}
