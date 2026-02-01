'use client';

import { useState } from 'react';
import rawData from '@/data/azkar.json';
import { AzkarTabs } from '@/components/azkar/AzkarTabs';
import { AzkarCard } from '@/components/azkar/AzkarCard';

type AzkarItem = {
  id: number;
  text: string;
  count?: number;
  audio?: string;
  filename?: string;
  description?: string;
};

type AzkarSection = {
  id: number;
  category: string;
  title?: string;
  array: AzkarItem[];
  audio?: string;
};

const data = rawData as unknown as AzkarSection[];

export default function AzkarPage() {
  const [active, setActive] = useState<string>(data[0].category);

  const section = data.find((s) => s.category === active) ?? data[0];
  const items = section.array ?? [];

  return (
    <div className="container py-6 text-center flex flex-col items-center">
      <div className="mb-6 max-w-3xl border rounded-lg p-6 border-muted-foreground/10 bg-muted/50 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">بالذكر تطمئن القلوب</h1>

        <p className="text-muted-foreground text-lg sm:text-xl mb-4 leading-relaxed">
          فالذكر حياةٌ للقلب إذا ضاق، ونورٌ للنفس إذا تعبت، وبه تهدأ الروح، ويقوى اليقين، ويجد
          الإنسان سكينته مهما اشتدت الأيام.
        </p>

        <p className="text-sm sm:text-base italic text-muted-foreground">
          - قال تعالى: &quot;ألا بذكر الله تطمئن القلوب&quot; [الرعد: 28]
        </p>
      <hr className="border-t border-muted-foreground/20 my-4 w-50 mx-auto" />
      </div>

      <p className="text-xl text-accent-foreground shadow-sm p-2 font-semibold m-6">
        أضغط على الرقم تحت كل ذكر لأكتمال التكرار
      </p>
      <AzkarTabs
        active={active}
        onChange={setActive}
        sections={data.map((s) => ({ key: s.category, title: s.title ?? s.category }))}
      />

      <div className="mt-6 w-full max-w-3xl">
        {items.map((item) => (
          <div key={item.id} className="mt-6 w-full max-w-3xl flex flex-col gap-4">
            <AzkarCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
