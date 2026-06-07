'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useIsMounted } from '@/hooks/useIsMounted';

export type LastRead = {
  number: number;
  name: string;
  englishName: string;
  ayah: number;
};

export default function LastReadSurah() {
  const isMounted = useIsMounted();
  const [lastRead] = useLocalStorage<LastRead | null>('last-read-surah', null);

  if (!isMounted || !lastRead) return null;

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col gap-3">
      <h2 className="text-lg font-bold text-primary">📖 أكمل القراءة</h2>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-base">{lastRead.name}</p>
          <p className="text-sm text-muted-foreground">
            {lastRead.englishName} — الآية {lastRead.ayah}
          </p>
        </div>

        <Link
          href={`/quran/${lastRead.number}`}
          className="shrink-0 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          استمر
        </Link>
      </div>
    </div>
  );
}
