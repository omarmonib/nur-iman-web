'use client';

import { useEffect, useRef, useState } from 'react';
import { RADIO_STREAM_URL } from '@/lib/radio';

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlaying = () => {
      setPlaying(true);
      setLoading(false);
      setError(null);
    };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onError = () => {
      setLoading(false);
      setPlaying(false);
      setError('خطأ في تحميل البث');
    };

    a.addEventListener('playing', onPlaying);
    a.addEventListener('pause', onPause);
    a.addEventListener('waiting', onWaiting);
    a.addEventListener('error', onError);

    return () => {
      a.removeEventListener('playing', onPlaying);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('waiting', onWaiting);
      a.removeEventListener('error', onError);
    };
  }, []);

  return (
    <div className="w-full rounded-xl border bg-card p-3 text-primary flex flex-col gap-2">
      {/* native audio control (matches the screenshot) */}
      <audio
        ref={audioRef}
        controls
        preload="none"
        className="w-full rounded-md bg-accent"
        src={RADIO_STREAM_URL}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {loading && <span className="text-xs opacity-70">جاري التحميل...</span>}
          {error && <span className="text-xs text-destructive">{error}</span>}
          {!loading && !error && (
            <span className="text-xs opacity-70">{playing ? 'مشغل' : 'متوقف'}</span>
          )}
        </div>
      </div>
    </div>
  );
}
