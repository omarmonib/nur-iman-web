export interface DhikrItem {
  text: string;
  count: number;
}

export interface DhikrSection {
  title: string;
  items: DhikrItem[];
}

export type AdhkarData = Record<string, DhikrSection>;
