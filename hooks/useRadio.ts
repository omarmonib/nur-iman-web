'use client';
import { useEffect, useRef, useState } from 'react';

export function useRadio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const a = new Audio();
    a.src = src;
    a.preload = 'none';
    a.crossOrigin = 'anonymous';
    audioRef.current = a;

    const onPlaying = () => {
      setPlaying(true);
      setLoading(false);
      setError(null);
    };
    const onPause = () => setPlaying(false);
    const onError = () => {
      setLoading(false);
      setPlaying(false);
      setError('خطأ في تشغيل البث');
    };

    a.addEventListener('playing', onPlaying);
    a.addEventListener('pause', onPause);
    a.addEventListener('error', onError);

    return () => {
      a.pause();
      a.src = '';
      a.removeEventListener('playing', onPlaying);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, [src]);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await a.play();
    } catch (e: unknown) {
      setLoading(false);
      setPlaying(false);
      const message =
        e instanceof Error ? e.message : typeof e === 'string' ? e : 'رفض التشغيل من المتصفح';
      setError(message);
    }
  };

  return { playing, loading, error, togglePlay };
}

export default useRadio;
