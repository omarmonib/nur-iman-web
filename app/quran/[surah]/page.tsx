import QuranSurah from '@/components/quran/QuranSurah';
import QuranNav from '@/components/quran/QuranNav';
import SurahListDialog from '@/components/quran/SurahListDialog';
import { fetchSurah, fetchAllSurahs } from '@/lib/quranApi';
import type { SurahSummary } from '@/types/quran';
import { notFound } from 'next/navigation';

type Params = { surah: string };

export const dynamic = 'force-dynamic';

export default async function SurahPage({ params }: { params: Params | Promise<Params> }) {
  const resolvedParams = await params;
  const surahParam = resolvedParams.surah;

  if (!/^[0-9]+$/.test(surahParam)) return notFound();

  let data;
  try {
    data = await fetchSurah(parseInt(surahParam, 10));
  } catch (err) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">خطأ في جلب السورة</h1>
        <p className="text-center">تعذّر تحميل بيانات السورة. حاول إعادة التحميل لاحقًا.</p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {err instanceof Error ? err.message : String(err)}
        </p>
      </div>
    );
  }

  const surah = data.data;
  const ayahs = surah.ayahs.map((a) => ({
    text: a.text,
    numberInSurah: a.numberInSurah,
    audio: a.audio,
  }));

  let surahList: SurahSummary[] = [];
  try {
    const all = await fetchAllSurahs();
    surahList = all.data;
  } catch {
    // non-critical — dialog will render empty
  }

  const prev = surah.number > 1 ? surah.number - 1 : undefined;
  const next = surah.number < 114 ? surah.number + 1 : undefined;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-center">
          {surah.englishName} - {surah.name}
        </h1>
        <SurahListDialog surahs={surahList} />
      </div>
      <QuranSurah ayahs={ayahs} />
      <QuranNav prev={prev} next={next} />
    </div>
  );
}
