export const PRAYERS_ORDER = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

export type PrayerName = (typeof PRAYERS_ORDER)[number];

export const PRAYER_LABELS: Record<PrayerName, string> = {
  fajr: 'الفجر',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء',
};
