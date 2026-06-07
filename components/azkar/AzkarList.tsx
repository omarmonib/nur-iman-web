'use client';

import { useState } from 'react';
import { useAzkar } from '@/hooks/useAzkar';
import { AzkarTabs } from '@/components/azkar/AzkarTabs';
import AzkarCard from '@/components/azkar/AzkarCard';

export default function AzkarList() {
  const { data, loading, error } = useAzkar();
  const [active, setActive] = useState<string>('');

  const current = active || data[0]?.category || '';
  const section = data.find((s) => s.category === current) ?? data[0];

  return (
    <div className="container max-w-3xl py-6 space-y-6">
      <h1 className="text-2xl font-semibold">الأذكار</h1>

      <AzkarTabs
        active={current}
        onChange={setActive}
        sections={data.map((s) => ({ key: s.category, title: s.title ?? s.category }))}
      />

      {loading && <div className="text-sm text-primary">جاري تحميل الأذكار...</div>}
      {error && <div className="text-sm text-destructive">{error}</div>}

      <div className="space-y-4">
        {section?.array.map((item) => (
          <AzkarCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
