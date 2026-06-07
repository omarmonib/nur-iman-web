'use client';

import { useAudioManager } from '@/context/AudioManager';
import { RADIO_STREAM_URL } from '@/lib/constants/radio';

export default function RadioPlayer() {
  const { toggle, isPlaying, loading, error } = useAudioManager();

  const playing = isPlaying(RADIO_STREAM_URL);

  return (
    <div className="w-full rounded-xl border bg-card p-3 text-primary flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => toggle(RADIO_STREAM_URL)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-sm transition hover:opacity-90 disabled:opacity-50"
          aria-label={playing ? 'إيقاف البث' : 'تشغيل البث'}
        >
          {loading ? (
            <span className="text-xs">جاري التحميل...</span>
          ) : playing ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              إيقاف البث
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground" />
              تشغيل البث
            </>
          )}
        </button>

        <span className="text-xs text-muted-foreground">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : playing ? (
            'بث مباشر'
          ) : (
            'متوقف'
          )}
        </span>
      </div>
    </div>
  );
}
