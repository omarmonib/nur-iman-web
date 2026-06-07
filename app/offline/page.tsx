import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-5xl">📵</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">أنت غير متصل بالإنترنت</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          يمكنك الاستمرار في قراءة الصفحات التي زرتها سابقاً. ستعود الميزات الكاملة عند اتصالك من
          جديد.
        </p>
      </div>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
