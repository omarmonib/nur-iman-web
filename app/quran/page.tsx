import { fetchAllSurahs } from '@/lib/quranApi';
import Link from 'next/link';

type Surah = {
  number: number;
  englishName: string;
  name: string;
  numberOfAyahs: number;
};

export default async function QuranHome() {
  const data = await fetchAllSurahs();
  const surahs: Surah[] = data.data;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">المصحف الشريف</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {surahs.map((surah: Surah) => (
          <Link
            key={surah.number}
            href={`/quran/${surah.number}`}
            className="p-4 border rounded hover:bg-muted/20 text-center"
          >
            <p className="font-semibold">{surah.englishName}</p>
            <p className="text-sm text-muted-foreground">
              {surah.name} ({surah.numberOfAyahs} آيات)
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
