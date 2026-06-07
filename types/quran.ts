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
