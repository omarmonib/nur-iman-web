'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error('[app/error]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-5xl">⚠️</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">حدث خطأ غير متوقع</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          تعذّر تحميل الصفحة. يمكنك المحاولة مجدداً أو العودة للرئيسية.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          إعادة المحاولة
        </button>
        <Link href="/" legacyBehavior>
          <a className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition">الرئيسية</a>
        </Link>
      </div>
      {error.digest && <p className="text-xs text-muted-foreground">رمز الخطأ: {error.digest}</p>}
    </div>
  );
}
