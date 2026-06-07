'use client';

import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { PRAYER_LABELS } from '@/lib/constants/prayers';

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function PrayerBar() {
  const { nextPrayer, currentPrayer, times } = usePrayerTimes();

  if (!nextPrayer || !times) return null;

  return (
    <div className="fixed top-16 inset-x-0 z-40 bg-emerald-700/90 dark:bg-emerald-900/90 backdrop-blur-sm text-white text-sm">
      <div className="container mx-auto px-4 h-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="opacity-75">الصلاة القادمة:</span>
          <span className="font-bold">{PRAYER_LABELS[nextPrayer.name]}</span>
          <span className="font-mono tracking-wider">
            {formatCountdown(nextPrayer.remainingSeconds)}
          </span>
        </div>

        {currentPrayer && (
          <div className="hidden sm:flex items-center gap-2 opacity-75">
            <span>الصلاة الحالية:</span>
            <span className="font-semibold">{PRAYER_LABELS[currentPrayer]}</span>
            <span>{times[currentPrayer]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
