'use client';

import { useEffect, useState } from 'react';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import NameGreeting from './NameGreeting';

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { text: 'صباح النور', emoji: '🌅' };
  if (hour >= 12 && hour < 17) return { text: 'نهارك مبارك', emoji: '☀️' };
  if (hour >= 17 && hour < 20) return { text: 'مساء الخير', emoji: '🌇' };
  return { text: 'ليلة مباركة', emoji: '🌙' };
}

export default function HeroSection() {
  const [greeting, setGreeting] = useState(getGreeting());
  const { hijriDate } = usePrayerTimes();

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-center py-12 flex flex-col items-center gap-3">
      <p
        className="text-xl font-semibold text-emerald-600"
        style={{ fontFamily: 'var(--font-amiri), serif' }}
      >
        السلام عليكم ورحمة الله وبركاته
      </p>

      <p className="text-4xl">{greeting.emoji}</p>

      <h1 className="text-3xl md:text-5xl font-bold text-foreground">
        {greeting.text} — <span className="text-emerald-600">نور الايمان</span>
      </h1>

      <NameGreeting />

      {hijriDate && <p className="text-muted-foreground text-sm mt-1">{hijriDate} هـ</p>}

      <p className="text-muted-foreground text-base max-w-md mt-2 leading-relaxed">
        ﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ﴾
      </p>
    </section>
  );
}
