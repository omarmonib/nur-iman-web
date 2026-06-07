export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation?: string;
  numberOfAyahs: number;
  revelationType?: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

export type AllSurahsResponse = ApiResponse<SurahMeta[]>;

export function getAyahImageUrl(surah: number, ayah: number, highRes = false): string {
  const base = 'https://cdn.islamic.network/quran/images';
  return highRes ? `${base}/high-resolution/${surah}_${ayah}.png` : `${base}/${surah}_${ayah}.png`;
}

export function getAyahAudioUrl(
  ayahNumber: number,
  edition = 'ar.alafasy',
  bitrate: 64 | 128 = 64
): string {
  return `https://cdn.islamic.network/quran/audio/${bitrate}/${edition}/${ayahNumber}.mp3`;
}

// Returns the global ayah number (1-6236) of the first ayah in a surah
// Computed from the numberOfAyahs of all preceding surahs
export function getFirstAyahGlobalNumber(surahs: SurahMeta[], surahNumber: number): number {
  return surahs.filter((s) => s.number < surahNumber).reduce((acc, s) => acc + s.numberOfAyahs, 1);
}
