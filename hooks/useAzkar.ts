'use client';

import { useEffect, useState } from 'react';
import localData from '@/data/azkar.json';

type AzkarItem = { text: string; count?: number; description?: string };
type AzkarSection = { title: string; items: AzkarItem[] };
export type AzkarData = Record<string, AzkarSection>;

function isValidData(obj: unknown): obj is AzkarData {
  if (!obj || typeof obj !== 'object') return false;
  const asRecord = obj as Record<string, unknown>;
  for (const key of Object.keys(asRecord)) {
    const sec = asRecord[key];
    if (!sec || typeof sec !== 'object') return false;
    const title = (sec as { title?: unknown }).title;
    if (typeof title !== 'string') return false;
    const items = (sec as { items?: unknown }).items;
    if (!Array.isArray(items)) return false;
    for (const it of items) {
      if (!it || typeof it !== 'object') return false;
      const text = (it as { text?: unknown }).text;
      if (typeof text !== 'string') return false;
    }
  }
  return true;
}

export function useAzkar() {
  function normalizeLocalData(input: unknown): AzkarData {
    if (!Array.isArray(input)) return {};
    const arr = input as Array<{
      id: number;
      category: string;
      audio?: string;
      filename?: string;
      array?: Array<{
        id: number;
        text: string;
        count?: number;
        audio?: string;
        filename?: string;
      }>;
    }>;
    const out: AzkarData = {};
    for (const s of arr) {
      const title = s.category ?? String(s.id);
      const items =
        Array.isArray(s.array) && s.array.length > 0
          ? s.array.map((it) => ({ text: it.text, count: it.count }))
          : [];
      out[title] = { title, items };
    }
    return out;
  }

  const [data, setData] = useState<AzkarData>(() => {
    try {
      return isValidData(localData) ? localData : normalizeLocalData(localData);
    } catch {
      return {} as AzkarData;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_AZKAR_API;
    if (!api) return;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(api, { signal });
        if (!res.ok) throw new Error(`البحث فشل: ${res.status} ${res.statusText}`);
        const json = await res.json();
        if (!isValidData(json)) throw new Error('شكل البيانات من الـ API غير متوقع');
        setData(json);
        setError(null);
      } catch (e: unknown) {
        if (typeof DOMException !== 'undefined' && e instanceof DOMException && e.name === 'AbortError') return;
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e) || 'خطأ في جلب الأذكار');
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
