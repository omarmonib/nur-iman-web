export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation?: string;
  numberOfAyahs: number;
  revelationType?: string;
  ayahs: Ayah[];
}

export interface SurahSummary {
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

export type SurahResponse = ApiResponse<Surah>;
export type AllSurahsResponse = ApiResponse<SurahSummary[]>;
