'use client';

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { PRAYERS_ORDER, PrayerName } from '@/lib/prayers';
export type PrayerTimes = Record<PrayerName, string>;

interface NextPrayer {
  name: PrayerName;
  remainingSeconds: number;
}

export function usePrayerTimes(city = 'Cairo') {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerName | null>(null);
  const [hijriDate, setHijriDate] = useState<string | null>(null);
  const [timezone, setTimezone] = useState('Africa/Cairo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchTimes() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`
        );
        const json = await res.json();

        if (!mounted) return;

        const clean = (t: string) => t.match(/\d{1,2}:\d{2}/)?.[0] ?? '--:--';

        setTimes({
          fajr: clean(json.data.timings.Fajr),
          dhuhr: clean(json.data.timings.Dhuhr),
          asr: clean(json.data.timings.Asr),
          maghrib: clean(json.data.timings.Maghrib),
          isha: clean(json.data.timings.Isha),
        });

        const hijri = json.data.date.hijri;
        setHijriDate(`${hijri.day} ${hijri.month.ar} ${hijri.year}`);
        setTimezone(json.data.meta.timezone);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchTimes();
    return () => {
      mounted = false;
    };
  }, [city]);

  useEffect(() => {
    if (!times) return;

    const tick = () => {
      const now = DateTime.now().setZone(timezone);

      const prayers = PRAYERS_ORDER.map((name) => {
        const [h, m] = times[name].split(':').map(Number);
        return {
          name,
          date: now.set({ hour: h, minute: m, second: 0 }).toJSDate(),
        };
      });

      let current: PrayerName | null = null;
      const nowDate = now.toJSDate();
      for (let i = prayers.length - 1; i >= 0; i--) {
        if (nowDate >= prayers[i].date) {
          current = prayers[i].name;
          break;
        }
      }

      setCurrentPrayer(current ?? 'isha');

      let upcoming = prayers.find((p) => p.date > nowDate);

      if (!upcoming) {
        const [h, m] = times.fajr.split(':').map(Number);
        upcoming = {
          name: 'fajr',
          date: now.plus({ days: 1 }).set({ hour: h, minute: m, second: 0 }).toJSDate(),
        };
      }

      setNextPrayer({
        name: upcoming.name,
        remainingSeconds: Math.max(0, Math.floor((upcoming.date.getTime() - Date.now()) / 1000)),
      });
    };

    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [times, timezone]);

  return { times, loading, nextPrayer, currentPrayer, hijriDate };
}
