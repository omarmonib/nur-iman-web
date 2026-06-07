'use client';

import { useRouter } from 'next/navigation';
import { RECITERS } from '@/lib/constants/reciters';

type Props = {
  current: string;
};

export default function ReciterSelector({ current }: Props) {
  const router = useRouter();

  const handleChange = (key: string) => {
    document.cookie = `reciter=${key}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="reciter-select" className="text-sm text-muted-foreground whitespace-nowrap">
        القارئ:
      </label>
      <select
        id="reciter-select"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-md border border-border bg-card text-foreground px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="اختر القارئ"
      >
        {RECITERS.map((r) => (
          <option key={r.key} value={r.key}>
            {r.arabicName}
          </option>
        ))}
      </select>
    </div>
  );
}
