import type { SurahResponse, AllSurahsResponse } from '@/types/quran';

export type { SurahResponse, AllSurahsResponse };
export type { Ayah, Surah, SurahSummary } from '@/types/quran';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry<T>(url: string, opts: RequestInit = {}, attempts = 3): Promise<T> {
  let lastErr: unknown = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return (await res.json()) as T;
    } catch (err) {
      lastErr = err;
      await sleep(150 * Math.pow(2, i));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${String(lastErr)}`);
}

export const fetchSurah = (surahNumber: number, edition = 'ar.alafasy'): Promise<SurahResponse> =>
  fetchWithRetry<SurahResponse>(
    `https://api.alquran.cloud/v1/surah/${surahNumber}/${edition}`,
    { next: { revalidate: 3600 } },
    3
  );

export const fetchAllSurahs = (): Promise<AllSurahsResponse> =>
  fetchWithRetry<AllSurahsResponse>(
    'https://api.alquran.cloud/v1/surah',
    { next: { revalidate: 3600 } },
    3
  );
