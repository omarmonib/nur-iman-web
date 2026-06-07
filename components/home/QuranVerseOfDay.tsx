'use client';

import { useEffect, useState } from 'react';

type Verse = {
  text: string;
  surahName: string;
  surahNumber: number;
  numberInSurah: number;
};

const TOTAL_AYAHS = 6236;

function getTodayAyahNumber(): number {
  const start = new Date('2024-01-01').getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((today.getTime() - start) / 86400000);
  return (dayIndex % TOTAL_AYAHS) + 1;
}

export default function QuranVerseOfDay() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ayahNumber = getTodayAyahNumber();

    fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.alafasy`)
      .then((r) => {
        if (!r.ok) throw new Error('فشل تحميل الآية');
        return r.json();
      })
      .then((json) => {
        const data = json.data;
        setVerse({
          text: data.text,
          surahName: data.surah.name,
          surahNumber: data.surah.number,
          numberInSurah: data.numberInSurah,
        });
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'حدث خطأ');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-primary">🌙 آية اليوم</h2>
        {verse && (
          <a
            href={`/quran/${verse.surahNumber}`}
            className="text-xs text-muted-foreground hover:text-primary transition"
          >
            اقرأ السورة ←
          </a>
        )}
      </div>

      {loading && (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-5 bg-muted rounded w-full" />
          <div className="h-5 bg-muted rounded w-4/5 mr-auto" />
          <div className="h-3 bg-muted rounded w-1/3 mr-auto mt-1" />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {verse && (
        <>
          <p
            className="text-xl leading-loose text-right font-scheherazade"
            style={{ fontFamily: 'var(--font-scheherazade), serif' }}
          >
            {verse.text}
          </p>
          <p className="text-sm text-muted-foreground text-right">
            ﴿ {verse.surahName} — الآية {verse.numberInSurah} ﴾
          </p>
        </>
      )}
    </div>
  );
}
