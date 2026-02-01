'use client';

import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type SurahItem = {
  number: number;
  englishName: string;
  name: string;
  numberOfAyahs: number;
};

export default function SurahListDialog({ surahs }: { surahs: SurahItem[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">قائمة السور</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>قائمة السور</DialogTitle>
        <DialogDescription>اختر سورة للانتقال إليها</DialogDescription>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-auto">
          {surahs.map((s) => (
            <Link
              key={s.number}
              href={`/quran/${s.number}`}
              className="p-2 rounded hover:bg-muted/10 text-center block"
            >
              <div className="font-semibold">{s.englishName}</div>
              <div className="text-sm text-muted-foreground">
                {s.name} · {s.numberOfAyahs} آيات
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
