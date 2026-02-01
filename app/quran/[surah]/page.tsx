import QuranSurah from '@/components/quran/QuranSurah';
import QuranNav from '@/components/quran/QuranNav';
import SurahListDialog from '@/components/quran/SurahListDialog';
import { fetchSurah, fetchAllSurahs, AllSurahsResponse } from '@/lib/quranApi';
import { notFound } from 'next/navigation';

type Params = { surah: string };

export const dynamic = 'force-dynamic';

export default async function SurahPage({ params }: { params: Params | Promise<Params> }) {
  // `params` may be a Promise in some Next.js execution paths — resolve it first
  const resolvedParams = await params;
  const surahParam = resolvedParams.surah;

  type Ayah = { text: string; numberInSurah: number; audio?: string };
  type Surah = { number: number; name: string; englishName: string; ayahs: Ayah[] };
  type ApiResponse = { data: Surah };

  if (!/^[0-9]+$/.test(surahParam)) {
    return notFound();
  }

  let data: ApiResponse | null = null;
  try {
    data = await fetchSurah(parseInt(surahParam, 10));
  } catch (err: unknown) {
    console.error('fetchSurah error:', err);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">خطأ في جلب السورة</h1>
        <p className="text-center">تعذّر تحميل بيانات السورة. حاول إعادة التحميل لاحقًا.</p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {(err instanceof Error && err.message) || String(err)}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">خطأ في جلب السورة</h1>
        <p className="text-center">تعذّر تحميل بيانات السورة. حاول إعادة التحميل لاحقًا.</p>
      </div>
    );
  }

  const surah = data.data;
  const ayahs = surah.ayahs.map((a: Ayah) => ({
    text: a.text,
    numberInSurah: a.numberInSurah,
    audio: a.audio,
  }));

  // Fetch list of surahs to pass to client dialog
  let all: AllSurahsResponse | null = null;
  try {
    all = await fetchAllSurahs();
  } catch (e: unknown) {
    console.error('fetchAllSurahs error', e);
  }
  const surahList = all?.data ?? [];

  const prev = surah.number > 1 ? surah.number - 1 : undefined;
  const next = surah.number < 114 ? surah.number + 1 : undefined;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-center">
          {surah.englishName} - {surah.name}
        </h1>
        <div>
          <SurahListDialog surahs={surahList} />
        </div>
      </div>
      <QuranSurah ayahs={ayahs} />
      <QuranNav prev={prev} next={next} />
    </div>
  );
}
