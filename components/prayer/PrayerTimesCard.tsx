'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import Countdown from '@/components/ui/Countdown';
import  CitySelector  from './CitySelector';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { Spinner } from '../ui/spinner';
import { PRAYERS_ORDER, PRAYER_LABELS } from '@/lib/prayers';

export default function PrayerTimesCard() {
  const [city, setCity] = useState('Cairo');
  const { times, loading, nextPrayer, currentPrayer, hijriDate } = usePrayerTimes(city);

  if (loading) {
    return (
      <Card className="p-6 flex justify-center">
        <Spinner />
      </Card>
    );
  }

  if (!times || !nextPrayer) return null;

  const [day, ...rest] = hijriDate?.split(' ') ?? [];

  return (
    <Card className="relative overflow-hidden rounded-xl border border-border p-4 space-y-4 bg-card">
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <Countdown seconds={nextPrayer.remainingSeconds} />
            <p className="text-sm text-muted-foreground/80 mt-1 font-bold">
              يتبقى على {PRAYER_LABELS[nextPrayer.name]}
            </p>
          </div>

          <div className="text-center text-foreground">
            <p className="text-3xl font-bold">{day}</p>
            <p className="text-sm opacity-80">{rest.join(' ')}</p>
          </div>
        </div>

        {/* Prayer times */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          {PRAYERS_ORDER.map((p) => (
            <div
              key={p}
              className={`rounded-md py-3 backdrop-blur-sm transition-transform duration-150 ease-out ${
                currentPrayer === p
                  ? 'bg-accent text-accent-foreground scale-105'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <div className="text-sm">{PRAYER_LABELS[p]}</div>
              <div className="font-semibold">{times[p]}</div>
            </div>
          ))}
        </div>

        {/* City */}
        <div className="flex justify-end">
          <CitySelector value={city} onChange={setCity} />
        </div>
      </div>
    </Card>
  );
}
