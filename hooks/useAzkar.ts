'use client';

import { useEffect, useState } from 'react';
import localData from '@/data/azkar.json';
import { env } from '@/lib/env';
import type { AzkarSection } from '@/types/azkar';

export type AzkarData = AzkarSection[];

function normalizeLocalData(input: unknown): AzkarData {
  if (!Array.isArray(input)) return [];
  return (input as AzkarSection[]).map((s) => ({
    id: s.id,
    category: s.category,
    title: s.title,
    audio: s.audio,
    filename: s.filename,
    array: Array.isArray(s.array) ? s.array : [],
  }));
}

const initialData: AzkarData = normalizeLocalData(localData);

export function useAzkar() {
  const [data, setData] = useState<AzkarData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = env.NEXT_PUBLIC_AZKAR_API;
    if (!api) return;

    const controller = new AbortController();

    fetch(api, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`البحث فشل: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        setData(normalizeLocalData(json));
        setError(null);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'خطأ في جلب الأذكار');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
