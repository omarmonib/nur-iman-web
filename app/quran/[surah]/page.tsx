import { cookies } from 'next/headers';
import QuranSurahImages from '@/components/quran/QuranSurahImages';
import QuranNav from '@/components/quran/QuranNav';
import SurahListDialog from '@/components/quran/SurahListDialog';
import ReciterSelector from '@/components/quran/ReciterSelector';
import { fetchSurahMeta } from '@/lib/quranApi';
import { DEFAULT_RECITER } from '@/lib/constants/reciters';
import { getFirstAyahGlobalNumber } from '@/types/quran';
import { notFound } from 'next/navigation';

type Params = { surah: string };

export const dynamic = 'force-dynamic';

export default async function SurahPage({ params }: { params: Params | Promise<Params> }) {
  const resolvedParams = await params;
  const surahParam = resolvedParams.surah;

  if (!/^[0-9]+$/.test(surahParam)) return notFound();

  const surahNumber = parseInt(surahParam, 10);
  if (surahNumber < 1 || surahNumber > 114) return notFound();

  let reciter = DEFAULT_RECITER.key;
  try {
    const cookieStore = await cookies();
    reciter = cookieStore.get('reciter')?.value ?? DEFAULT_RECITER.key;
  } catch {
    // use default
  }

  let surah, allSurahs;
  try {
    ({ surah, allSurahs } = await fetchSurahMeta(surahNumber));
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

  const firstAyahGlobalNumber = getFirstAyahGlobalNumber(allSurahs, surahNumber);
  const prev = surah.number > 1 ? surah.number - 1 : undefined;
  const next = surah.number < 114 ? surah.number + 1 : undefined;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{surah.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {surah.englishName} — {surah.numberOfAyahs} آية
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ReciterSelector current={reciter} />
          <SurahListDialog surahs={allSurahs} />
        </div>
      </div>

      <QuranSurahImages
        surahNumber={surah.number}
        surahName={surah.name}
        surahEnglishName={surah.englishName}
        numberOfAyahs={surah.numberOfAyahs}
        firstAyahGlobalNumber={firstAyahGlobalNumber}
        reciter={reciter}
      />

      <QuranNav prev={prev} next={next} />
    </div>
  );
}
