# نور الإيمان — واجهة ويب

مشروع ويب عربي مبني على Next.js (App Router) لعرض القرآن، الأذكار، والأدعية مع مشغّل صوتي ومكونات واجهة مُحسّنة للهواتف.

## ملّخص الميزات

- عرض سور القرآن مع نص الآيات وتتابع صوتي على مستوى السورة.
- مكتبة أذكار مع ملفات صوتية محلية في `public/audio/azkar/`.
- قائمة السور داخل حوار (Dialog) للتنقل السريع.
- Navbar ثابت مع تحسينات للعرض على الموبايل (زر القائمة على اليمين، الشعار على اليسار في وضع الموبايل).
- ثيم داكن/فاتح عبر `next-themes`.

## التقنيات الأساسية

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Radix UI primitives (Dialog / Sheet / Select)

## تشغيل المشروع محليًا

1. تثبيت الحزم:

```bash
pnpm install
```

2. تشغيل سيرفر التطوير:

```bash
pnpm dev
```

افتح http://localhost:3000

## أوامر شائعة

- `pnpm dev` — تشغيل بيئة التطوير
- `pnpm build` — بناء المشروع للإنتاج
- `pnpm start` — تشغيل نسخة الإنتاج محليًا
- `pnpm run lint` — تشغيل ESLint
- `pnpm exec tsc --noEmit` — فحص الأنواع

## بنية المشروع (مختصر)

- `app/` — صفحات التطبيق (App Router)
- `components/` — مكونات واجهة قابلة لإعادة الاستخدام (quran, azkar, layout, ui)
- `lib/` — مساعدة استدعاءات API (مثل `quranApi.ts`)
- `data/` — بيانات محلية (`azkar.json`)
- `public/audio/azkar/` — ملفات صوتية

## ملاحظات للمطورين

- تم تحسين استدعاء API في `lib/quranApi.ts` مع retry/backoff وأنواع TypeScript واضحة (`SurahApi`, `AyahApi`).
- في صفحات `app/quran/[surah]/page.tsx` قمنا بمعالجة `params` التي قد تكون Promise وأيضًا التعامل الآمن مع الأخطاء (`unknown`).
- تمت إضافة تنسيق وقت (mm:ss) لمشغل السورة في `components/quran/QuranSurah.tsx` وتحسينات تنقية عنصر الصوت في `QuranAyah.tsx`.

## مشاكل معروفة وحلول سريعة

- إذا ظهر أن الـNavbar "يختفي" خلف عناصر أخرى: هذا غالبًا بسبب تعارض `z-index` أو عناصر تطبّق `transform` (تخلق stacking context). الحلّ السريع: اجعل `Navbar` قيمة `z` أعلى أو عدّل زّ قيم الـoverlays (`sheet/dialog`) بحيث لا تتساوى.
- إذا واجهت خطأ قفل `.next/dev/lock` عند `pnpm dev`، تأكد أن لا توجد نسخة أخرى من `next dev` تعمل، أو احذف الملف ثم أعد التشغيل.

## المساهمة

- افتح فرعًا جديدًا لتغييراتك، اكتب PR واضحًا مع وصف التغيير وما الذي اختبرته.

## خطوات مقترحة لاحقة

- إضافة اختبارات وظيفية (Playwright) للتدفق الصوتي وواجهة المصحف.
- إضافة سكربت CI للفحص التلقائي (lint + typecheck).

---

إذا تريد README بالإنجليزية أو إضافة أقسام مفصّلة (Contributing, Roadmap، أو Templates)، أخبرني وسأضيفها.
