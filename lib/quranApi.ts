const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type AyahApi = {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
};

export type SurahApi = {
  number: number;
  name: string;
  englishName: string;
  ayahs: AyahApi[];
};

export type SurahResponse = {
  code: number;
  status: string;
  data: SurahApi;
};

export type SurahSummary = {
  number: number;
  englishName: string;
  name: string;
  numberOfAyahs: number;
};

export type AllSurahsResponse = {
  code: number;
  status: string;
  data: SurahSummary[];
};

async function fetchWithRetry<T>(url: string, opts: RequestInit = {}, attempts = 3): Promise<T> {
  let lastErr: unknown = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return (await res.json()) as T;
    } catch (err) {
      lastErr = err;
      // exponential backoff
      await sleep(150 * Math.pow(2, i));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${String(lastErr)}`);
}

export const fetchSurah = async (surahNumber: number): Promise<SurahResponse> => {
  const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`;
  return fetchWithRetry<SurahResponse>(url, { next: { revalidate: 60 } }, 3);
};

export const fetchAllSurahs = async (): Promise<AllSurahsResponse> => {
  const url = 'https://api.alquran.cloud/v1/surah';
  return fetchWithRetry<AllSurahsResponse>(url, { next: { revalidate: 60 } }, 3);
};
