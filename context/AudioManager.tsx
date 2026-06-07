'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type AudioState = {
  src: string | null;
  playing: boolean;
  loading: boolean;
  progress: number;
  duration: number;
  error: string | null;
};

type AudioManagerContext = AudioState & {
  play: (src: string) => Promise<void>;
  pause: () => void;
  toggle: (src: string) => Promise<void>;
  seek: (seconds: number) => void;
  stop: () => void;
  isPlaying: (src: string) => boolean;
};

const AudioManagerContext = createContext<AudioManagerContext | null>(null);

export function AudioManagerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<AudioState>({
    src: null,
    playing: false,
    loading: false,
    progress: 0,
    duration: 0,
    error: null,
  });

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onPlaying = () => setState((s) => ({ ...s, playing: true, loading: false, error: null }));
    const onPause = () => setState((s) => ({ ...s, playing: false }));
    const onWaiting = () => setState((s) => ({ ...s, loading: true }));
    const onEnded = () => setState((s) => ({ ...s, playing: false, progress: 0 }));
    const onError = () =>
      setState((s) => ({ ...s, playing: false, loading: false, error: 'خطأ في تشغيل الصوت' }));
    const onTimeUpdate = () =>
      setState((s) => ({ ...s, progress: audio.currentTime, duration: audio.duration || 0 }));
    const onLoadedMetadata = () => setState((s) => ({ ...s, duration: audio.duration || 0 }));

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async (src: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    setState((s) => ({ ...s, loading: true, error: null }));

    if (audio.src !== src) {
      audio.src = src;
      setState((s) => ({ ...s, src, progress: 0, duration: 0 }));
    }

    try {
      await audio.play();
    } catch (err) {
      console.warn('[AudioManager] play() failed:', err);
      setState((s) => ({ ...s, playing: false, loading: false, error: 'تعذّر تشغيل الصوت' }));
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = '';
    setState({ src: null, playing: false, loading: false, progress: 0, duration: 0, error: null });
  }, []);

  const toggle = useCallback(
    async (src: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.src === src && state.playing) {
        pause();
      } else {
        await play(src);
      }
    },
    [state.playing, play, pause]
  );

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setState((s) => ({ ...s, progress: seconds }));
  }, []);

  const isPlaying = useCallback(
    (src: string) => state.playing && state.src === src,
    [state.playing, state.src]
  );

  return (
    <AudioManagerContext.Provider value={{ ...state, play, pause, toggle, seek, stop, isPlaying }}>
      {children}
    </AudioManagerContext.Provider>
  );
}

export function useAudioManager() {
  const ctx = useContext(AudioManagerContext);
  if (!ctx) throw new Error('useAudioManager must be used inside <AudioManagerProvider>');
  return ctx;
}
