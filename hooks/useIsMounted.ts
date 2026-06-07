'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot — always true after hydration
    () => false // server snapshot — always false
  );
}
