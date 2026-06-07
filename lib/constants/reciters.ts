export type Reciter = {
  key: string;
  arabicName: string;
};

export const RECITERS: Reciter[] = [
  { key: 'ar.alafasy', arabicName: 'مشاري العفاسي' },
  { key: 'ar.abdurrahmaansudais', arabicName: 'عبدالرحمن السديس' },
  { key: 'ar.husary', arabicName: 'محمود خليل الحصري' },
  { key: 'ar.minshawi', arabicName: 'محمد صديق المنشاوي' },
  { key: 'ar.muhammadayyoub', arabicName: 'محمد أيوب' },
  { key: 'ar.ibrahimakhbar', arabicName: 'إبراهيم الأخضر' },
];

export const DEFAULT_RECITER = RECITERS[0];
