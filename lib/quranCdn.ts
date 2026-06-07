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

export function getSurahAudioUrl(
  surahNumber: number,
  edition = 'ar.alafasy',
  bitrate: 64 | 128 = 128
): string {
  return `https://cdn.islamic.network/quran/audio-surah/${bitrate}/${edition}/${surahNumber}.mp3`;
}

export function getFirstAyahGlobalNumber(
  surahs: { number: number; numberOfAyahs: number }[],
  surahNumber: number
): number {
  return surahs.filter((s) => s.number < surahNumber).reduce((acc, s) => acc + s.numberOfAyahs, 1);
}
