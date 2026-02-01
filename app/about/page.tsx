import React from 'react';

export const metadata = {
  title: 'من نحن | نور الإيمان',
  description:
    'تعرف على مشروع نور الإيمان، رؤيته، مصادره، والتقنيات المستخدمة في تقديم الأذكار والمصحف الرقمي.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">من نحن</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">نبذة عامة</h2>
        <p className="text-base leading-relaxed">
          نور الإيمان هو مشروع ويب تعليمي وديني يهدف إلى تقديم محتوى إسلامي موثوق، سهل الوصول،
          ومتوافق مع الأجهزة الحديثة. نركز على عرض الأذكار، مصحف رقمي منسق، ومحتوى صوتي عالي الجودة
          ليستفيد منه المستخدمون في القراءة والاستماع والتعلم.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">رؤيتنا ورسالتنا</h2>
        <p className="text-base leading-relaxed">
          رؤيتنا أن نسهّل الوصول إلى المصادر الإسلامية الموثوقة بتجربة مستخدم بسيطة وجذابة. رسالتنا
          تقديم أدوات رقمية تساعد على حفظ الأذكار، الاستماع للقرآن الكريم، والاطلاع على معاني النصوص
          بطريقة محترمة وسهلة الاستخدام.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">ما الذي يقدمه الموقع</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li>قوائم أذكار مُنظّمة مع إمكانيّة الاستماع والتكرار.</li>
          <li>مصحف رقمي منسق (نمط مصحف المدينة) مع أزرار تحكّم بالصوت للسورة والآية.</li>
          <li>تجربة استماع متكاملة (تشغيل السورة كاملة، تمييز الآية النشطة، تحكّم بالتنقّل).</li>
          <li>واجهة متوافقة مع الوضعين الفاتح والداكن، وتجربة سريعة على الهواتف والحواسب.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">المصادر والبيانات</h2>
        <p className="text-base leading-relaxed">
          نعتمد في الموقع على مزوّدات بيانات صوتية ونصية معروفة، من بينها واجهات برمجة التطبيقات
          العامة للمصحف وخدمات استضافة الصوت. أمثلة على المصادر:
        </p>
        <ul className="list-disc pr-6 space-y-2 mt-2">
          <li>
            واجهات عامة لكتابة نص القرآن (مثل: api.alquran.cloud) للحصول على نص وترتيب الآيات.
          </li>
          <li>مخازن وموزّعين صوتيين (CDN) مع تسجيلات قراء مرخّصة.</li>
          <li>ملفات بيانات محلية للمواد الخاصة بالموقع (مثال: `data/azkar.json`).</li>
          <li>
            لا يهدف الموقع إلى إعادة توزيع المحتوى خارج سياقه، وإنما تقديمه للاستخدام الشخصي غير
            التجاري.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground mt-2">
          ملاحظات: إذا احتوى أي مورد خارجي على قيود استخدام أو حقوق نشر، نحرص على احترامها ووضع
          الإحالات المناسبة داخل المحتوى أو ملفات المشروع.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">التقنيات المستخدمة</h2>
        <p className="text-base leading-relaxed">
          بني الموقع باستخدام تقنيات ويب حديثة لضمان أداء وتوسعة سهلة:
        </p>
        <ul className="list-disc pr-6 space-y-2 mt-2">
          <li>Next.js (App Router) + React</li>
          <li>TypeScript وTailwind CSS للتصميم السريع والمتجاوب</li>
          <li>مكتبات صغيرة لإدارة الحالة، واجهة المستخدم، وتشغيل الصوت</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">الخصوصية والبيانات</h2>
        <p className="text-base leading-relaxed">
          نُعطي أولوية لخصوصية المستخدمين: الموقع لا يجمع بيانات شخصية بشكل افتراضي، ولا يخزن سلوك
          المستخدمين إلا في حال تم إضافة وظائف تسمح بذلك (مثل حسابات أو تفضيلات) وبعد إعلام المستخدم
          والحصول على موافقته. إذا رغبت بآلية حفظ تفضيلات محلية، يمكننا اقتراح حلول قائمة على
          `localStorage` أو على حسابات مستخدمين مع سياسة خصوصية واضحة.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">الترخيص والحقوق</h2>
        <p className="text-base leading-relaxed">
          المحتوى النصي المستمد من مصادر عامة يخضع لحقوق تلك المصادر؛ أما البرمجيات والمكونات في
          المشروع فمرخّصة تحت رخص مفتوحة المصدر ما لم يُذكر خلاف ذلك في ملفات المشروع. المواد
          الصوتية قد تكون محفوظة الحقوق لصالح قرّاء أو موزّعين؛ نعرض التسجيلات فقط مع الالتزام بشروط
          موزّعيها.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">المساهمة والتواصل</h2>
        <p className="text-base leading-relaxed">
          نرحّب بالمساهمات التقنية والملاحظات. إذا رغبت بالمساهمة أو الإبلاغ عن خطأ أو اقتراح
          تحسينات، الرجاء فتح Issue أو إرسال بريد إلكتروني إلى جهة التطوير للمساهمين الفنيين: نوضح
          سياق المشروع داخل README ونتبع قواعد مساهمة مبسطة لتسهيل العمل الجماعي.
          <br />
          (mail: omar.monib91@gmail.com).
          <br />
          (Whatsapp: +201010094107).
          <br />
        </p>
      </section>
    </div>
  );
}
