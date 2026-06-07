'use client';

import { useEffect, useState } from 'react';

type Hadith = {
  arab: string;
  id: number;
};

const COLLECTIONS = [
  { key: 'bukhari', name: 'صحيح البخاري', total: 7563 },
  { key: 'muslim', name: 'صحيح مسلم', total: 5362 },
  { key: 'abudawud', name: 'سنن أبي داود', total: 5274 },
  { key: 'tirmidzi', name: 'جامع الترمذي', total: 3956 },
];

function getTodayHadith(): { collection: (typeof COLLECTIONS)[number]; number: number } {
  const start = new Date('2024-01-01').getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((today.getTime() - start) / 86400000);
  const collection = COLLECTIONS[dayIndex % COLLECTIONS.length];
  const number = (dayIndex % collection.total) + 1;
  return { collection, number };
}

// Derived once at render — never changes within a day
const { collection: todayCollection, number: todayNumber } = getTodayHadith();

export default function HadithOfDay() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.hadith.gading.dev/books/${todayCollection.key}/${todayNumber}`)
      .then((r) => {
        if (!r.ok) throw new Error('فشل تحميل الحديث');
        return r.json();
      })
      .then((json) => {
        setHadith({ arab: json.data.contents.arab, id: todayNumber });
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
        <h2 className="text-lg font-bold text-primary">📜 حديث اليوم</h2>
        <span className="text-xs text-muted-foreground">{todayCollection.name}</span>
      </div>

      {loading && (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6 mr-auto" />
          <div className="h-4 bg-muted rounded w-4/6 mr-auto" />
          <div className="h-3 bg-muted rounded w-1/4 mr-auto mt-1" />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {hadith && (
        <>
          <p className="text-base leading-relaxed text-right">{hadith.arab}</p>
          <p className="text-xs text-muted-foreground text-right">
            {todayCollection.name} — حديث رقم {hadith.id}
          </p>
        </>
      )}
    </div>
  );
}
