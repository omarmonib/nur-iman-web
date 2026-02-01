'use client';

import { useEffect, useRef, useState } from 'react';
import QuranAyah from './QuranAyah';

type AyahItem = { text: string; numberInSurah: number; audio?: string };

type Props = {
  ayahs: AyahItem[];
};

export default function QuranSurah({ ayahs }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();

    const audio = audioRef.current;

    const onTimeUpdate = () => {
      if (!audio) return;
      setProgress(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setPlaying(false);
      setTimeout(() => {
        setCurrentIndex((idx) => {
          const next = idx + 1;
          if (next < ayahs.length) {
            playIndex(next);
            return next;
          }
          return idx;
        });
      }, 100);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ayahs]);

  useEffect(() => {
    const node = ayahRefs.current[currentIndex];
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  const playIndex = async (index: number) => {
    const src = ayahs[index]?.audio;
    if (!src) return;
    if (!audioRef.current) audioRef.current = new Audio();
    try {
      audioRef.current.src = src;
      await audioRef.current.play();
      setPlaying(true);
      setCurrentIndex(index);
    } catch (e) {
      console.error('Audio play error', e);
      setPlaying(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      const src = ayahs[currentIndex]?.audio;
      if (!src) return;
      if (audio.src !== src) audio.src = src;
      try {
        await audio.play();
        setPlaying(true);
      } catch (e) {
        console.error('Audio play error', e);
      }
    }
  };

  const handlePrev = () => {
    const prev = Math.max(0, currentIndex - 1);
    playIndex(prev);
  };

  const handleNext = () => {
    const next = Math.min(ayahs.length - 1, currentIndex + 1);
    playIndex(next);
  };

  const onSeek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button aria-label="previous" onClick={handlePrev} className="px-3 py-1 bg-muted rounded">
          {'<<'}
        </button>
        <button onClick={togglePlay} className="px-4 py-2 text-primary border rounded-full">
          {playing ? 'إيقاف' : 'تشغيل'}
        </button>
        <button aria-label="next" onClick={handleNext} className="px-3 py-1 bg-muted rounded">
          {'>>'}
        </button>
        <div className="flex-1">
          <input
            aria-label="progress"
            type="range"
            min={0}
            max={Math.max(0, duration || 0)}
            value={progress}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {formatTime(progress)} / {formatTime(duration || 0)}
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
              isActive={idx === currentIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds <= 0) return '00:00';
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60);
  return `${pad(m)}:${pad(s)}`;
}
