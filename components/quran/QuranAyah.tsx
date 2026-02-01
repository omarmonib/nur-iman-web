'use client';

import { useState, useRef, useEffect } from 'react';

type Props = {
  text: string;
  numberInSurah: number;
  audio?: string;
  isActive?: boolean;
};

export default function QuranAyah({ text, numberInSurah, audio, isActive = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isActive && audioRef.current) {
      // pause any local playback when not active
      try {
        audioRef.current.pause();
      } catch {}
      // avoid synchronous state update inside effect to prevent cascading renders
      setTimeout(() => setPlaying(false), 0);
    }
  }, [isActive]);

  useEffect(() => {
    // cleanup on unmount
    const a = audioRef.current;
    return () => {
      try {
        if (a) {
          a.pause();
          a.src = '';
        }
      } catch {}
    };
  }, []);

  const toggleAudio = async () => {
    if (!audio) return;
    if (!audioRef.current) audioRef.current = new Audio(audio);

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
        audioRef.current.onended = () => setTimeout(() => setPlaying(false), 0);
      }
    } catch {}
  };

  return (
    <div className={`ayah ${isActive ? 'active' : ''}`} dir="rtl">
      <span className="text-2xl leading-relaxed">{text}</span>
      <span className="verse-number" aria-hidden>
        {numberInSurah}
      </span>
      {audio && (
        <div className="mt-2">
          <button onClick={toggleAudio} className="px-2 py-1 bg-accent/20 rounded text-sm">
            {playing ? 'إيقاف' : 'تشغيل'}
          </button>
        </div>
      )}
    </div>
  );
}
