'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudioManager } from '@/context/AudioManager';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { LastRead } from '@/components/home/LastReadSurah';
import QuranAyah from './QuranAyah';

type AyahItem = { text: string; numberInSurah: number; audio?: string };

type Props = {
  ayahs: AyahItem[];
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
};

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds <= 0) return '00:00';
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  return `${pad(m)}:${pad(s)}`;
}

export default function QuranSurah({ ayahs, surahNumber, surahName, surahEnglishName }: Props) {
  const { play, pause, seek, isPlaying, progress, duration, src } = useAudioManager();
  const [, setLastRead] = useLocalStorage<LastRead | null>('last-read-surah', null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const ayahRefs = useRef<Array<HTMLDivElement | null>>([]);

  const ayahsRef = useRef(ayahs);
  useEffect(() => {
    ayahsRef.current = ayahs;
  }, [ayahs]);

  const playIndex = useCallback(
    async (index: number) => {
      const ayah = ayahsRef.current[index];
      if (!ayah?.audio) return;
      setCurrentIndex(index);
      await play(ayah.audio);
    },
    [play]
  );

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Save reading progress whenever the active ayah changes
  useEffect(() => {
    const ayah = ayahs[currentIndex];
    if (!ayah) return;
    setLastRead({
      number: surahNumber,
      name: surahName,
      englishName: surahEnglishName,
      ayah: ayah.numberInSurah,
    });
  }, [currentIndex, ayahs, surahNumber, surahName, surahEnglishName, setLastRead]);

  const currentSrc = ayahs[currentIndex]?.audio;
  const isCurrentPlaying = currentSrc ? isPlaying(currentSrc) : false;

  useEffect(() => {
    if (src !== currentSrc) return;
    if (isCurrentPlaying) return;
    if (progress === 0 && duration === 0) return;
    const next = currentIndexRef.current + 1;
    if (next < ayahsRef.current.length) {
      playIndex(next);
    }
  }, [isCurrentPlaying, src, currentSrc, progress, duration, playIndex]);

  useEffect(() => {
    const node = ayahRefs.current[currentIndex];
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  const handleToggle = async () => {
    if (isCurrentPlaying) {
      pause();
    } else {
      await playIndex(currentIndex);
    }
  };

  const handlePrev = () => playIndex(Math.max(0, currentIndex - 1));
  const handleNext = () => playIndex(Math.min(ayahs.length - 1, currentIndex + 1));

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button aria-label="previous" onClick={handlePrev} className="px-3 py-1 bg-muted rounded">
          {'<<'}
        </button>
        <button onClick={handleToggle} className="px-4 py-2 text-primary border rounded-full">
          {isCurrentPlaying ? 'إيقاف' : 'تشغيل'}
        </button>
        <button aria-label="next" onClick={handleNext} className="px-3 py-1 bg-muted rounded">
          {'>>'}
        </button>
        <div className="flex-1">
          <input
            aria-label="progress"
            type="range"
            min={0}
            max={Math.max(0, duration)}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <div className="mushaf">
        {ayahs.map((ayah, idx) => (
          <div
            ref={(el) => {
              ayahRefs.current[idx] = el;
            }}
            key={ayah.numberInSurah}
          >
            <QuranAyah
              text={ayah.text}
              numberInSurah={ayah.numberInSurah}
              audio={ayah.audio}
              isActive={idx === currentIndex && isCurrentPlaying}
              onPlay={() => playIndex(idx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
