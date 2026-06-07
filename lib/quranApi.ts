import type { AllSurahsResponse, SurahMeta } from '@/types/quran';

export type { AllSurahsResponse, SurahMeta };

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
  throw new Error(`Failed to fetch: ${String(lastErr)}`);
}

export const fetchAllSurahs = (): Promise<AllSurahsResponse> =>
  fetchWithRetry<AllSurahsResponse>(
    'https://api.alquran.cloud/v1/surah',
    { next: { revalidate: 86400 } },
    3
  );

export const fetchSurahMeta = async (
  surahNumber: number
): Promise<{ surah: SurahMeta; allSurahs: SurahMeta[] }> => {
  const all = await fetchAllSurahs();
  const surah = all.data.find((s) => s.number === surahNumber);
  if (!surah) throw new Error(`Surah ${surahNumber} not found`);
  return { surah, allSurahs: all.data };
};
