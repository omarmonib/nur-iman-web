import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-6xl">🔍</p>

      <div className="space-y-2">
        <h1
          className="text-5xl font-bold text-emerald-600"
          style={{ fontFamily: 'var(--font-amiri), serif' }}
        >
          ٤٠٤
        </h1>
        <h2 className="text-2xl font-bold">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          يبدو أن هذه الصفحة لا وجود لها. ربما تم نقلها أو حذفها.
        </p>
      </div>

      <p className="text-emerald-600 text-base" style={{ fontFamily: 'var(--font-amiri), serif' }}>
        ﴿ وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ﴾
      </p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          الرئيسية
        </Link>
        <Link
          href="/quran"
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition"
        >
          القرآن الكريم
        </Link>
        <Link
          href="/azkar"
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition"
        >
          الأذكار
        </Link>
      </div>
    </div>
  );
}
