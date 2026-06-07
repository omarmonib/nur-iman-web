'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useAudioManager } from '@/context/AudioManager';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getAyahImageUrl, getAyahAudioUrl } from '@/types/quran';
import type { LastRead } from '@/components/home/LastReadSurah';

type Props = {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  numberOfAyahs: number;
  firstAyahGlobalNumber: number;
  reciter: string;
};

export default function QuranSurahImages({
  surahNumber,
  surahName,
  surahEnglishName,
  numberOfAyahs,
  firstAyahGlobalNumber,
  reciter,
}: Props) {
  const { toggle, isPlaying, stop } = useAudioManager();
  const [, setLastRead] = useLocalStorage<LastRead | null>('last-read-surah', null);
  const [activeAyah, setActiveAyah] = useState<number | null>(null);
  const [highRes, setHighRes] = useState(false);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(
    () => () => {
      stop();
    },
    [stop]
  );

  const handleAyahClick = useCallback(
    (ayah: number) => {
      const globalNumber = firstAyahGlobalNumber + ayah - 1;
      const audioUrl = getAyahAudioUrl(globalNumber, reciter, 64);

      setActiveAyah(ayah);
      setLastRead({
        number: surahNumber,
        name: surahName,
        englishName: surahEnglishName,
        ayah,
      });
      toggle(audioUrl);
    },
    [firstAyahGlobalNumber, surahNumber, surahName, surahEnglishName, reciter, toggle, setLastRead]
  );

  const ayahs = Array.from({ length: numberOfAyahs }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-border">
        <p className="text-sm text-muted-foreground">اضغط على أي آية للاستماع إليها</p>
        <button
          onClick={() => setHighRes((v) => !v)}
          className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition"
        >
          {highRes ? 'جودة عادية' : 'جودة عالية'}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {ayahs.map((ayah) => {
          const globalNumber = firstAyahGlobalNumber + ayah - 1;
          const audioUrl = getAyahAudioUrl(globalNumber, reciter, 64);
          const playing = isPlaying(audioUrl);

          return (
            <div
              key={ayah}
              ref={(el) => {
                ayahRefs.current[ayah] = el;
              }}
              onClick={() => handleAyahClick(ayah)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                playing
                  ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : activeAyah === ayah
                    ? 'border-emerald-300/50'
                    : 'border-transparent hover:border-muted'
              }`}
            >
              <Image
                src={getAyahImageUrl(surahNumber, ayah, highRes)}
                alt={`آية ${ayah}`}
                width={1280}
                height={200}
                className={`w-full h-auto transition-opacity ${
                  playing ? 'opacity-90' : 'opacity-100'
                }`}
                loading={ayah <= 5 ? 'eager' : 'lazy'}
                unoptimized
              />

              {playing && (
                <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  يُشغَّل
                </div>
              )}

              <div className="absolute bottom-2 left-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
                {ayah}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
