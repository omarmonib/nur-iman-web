'use client';

import {  useState } from 'react';
import { useAzkar } from '@/hooks/useAzkar';
import { AzkarTabs } from '@/components/azkar/AzkarTabs';
import { AzkarCard } from '@/components/azkar/AzkarCard';

export default function AzkarList() {
  const { data, loading, error } = useAzkar();
  const keys = Object.keys(data);
  const [active, setActive] = useState<string>(''); // store user-selected key

  // derive the current active key for rendering without causing state updates in effects
  const current = (active || keys[0]) ?? '';

  const section = data[current] ?? { title: '', items: [] };

  return (
    <div className="container max-w-3xl py-6 space-y-6">
      <h1 className="text-2xl font-semibold">الأذكار</h1>

      <AzkarTabs
        active={current}
        onChange={setActive}
        sections={keys.map((k) => ({ key: k, title: data[k].title }))}
      />

      {loading && <div className="text-sm text-primary">جاري تحميل الأذكار...</div>}
      {error && <div className="text-sm text-destructive">{error}</div>}

      <div className="space-y-4">
        {section.items.map((item, i) => (
          <AzkarCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
