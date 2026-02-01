'use client';
import Link from 'next/link';

type Props = {
  prev?: number;
  next?: number;
};

export default function QuranNav({ prev, next }: Props) {
  return (
    <div className="flex justify-between mt-6">
      {prev ? (
        <Link href={`/quran/${prev}`} className="px-4 py-2 bg-muted rounded hover:bg-muted/70">
          السابق
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/quran/${next}`} className="px-4 py-2 bg-muted rounded hover:bg-muted/70">
          التالي
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
