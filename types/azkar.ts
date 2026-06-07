export interface AzkarItem {
  id: number;
  text: string;
  count?: number;
  audio?: string;
  filename?: string;
  description?: string;
}

export interface AzkarSection {
  id: number;
  category: string;
  title?: string;
  audio?: string;
  filename?: string;
  array: AzkarItem[];
}

export type AzkarData = AzkarSection[];
