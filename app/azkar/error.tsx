'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AzkarError({ error, reset }: Props) {
  useEffect(() => {
    console.error('[azkar/error]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-5xl">🤲</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">تعذّر تحميل الأذكار</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          حدث خطأ أثناء تحميل صفحة الأذكار. حاول إعادة التحميل.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          إعادة المحاولة
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition"
        >
          الرئيسية
        </Link>
      </div>
      {error.digest && <p className="text-xs text-muted-foreground">رمز الخطأ: {error.digest}</p>}
    </div>
  );
}
