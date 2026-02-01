'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

type Item = {
  text: string;
  count?: number;
  description?: string;
  audio?: string;
};

export function AzkarCard({ item }: { item: Item }) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initialCountRef = useRef<number | undefined>(item.count);
  const [remaining, setRemaining] = useState<number | null>(
    typeof item.count === 'number' ? item.count : null
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const toggleAudio = async () => {
    if (!item.audio) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(item.audio);
      audioRef.current.addEventListener('ended', () => setPlaying(false));
    }

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };


  const handleCountClick = () => {
    if (remaining === null) return;
    if (remaining > 1) {
      setRemaining(remaining - 1);
    } else if (remaining === 1) {
      setRemaining(0);
    } else {
      // when 0, reset to initial (if provided) to allow restarting
      setRemaining(initialCountRef.current ?? null);
    }
  };

  return (
    <article className="p-4 rounded-lg border bg-card text-primary flex flex-col gap-2 rtl shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="prose-raw leading-relaxed" style={{ textAlign: 'right' }}>
          {item.text}
        </p>
      </div>

      {/* counter placed under the text and centered */}
      {remaining !== null && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
          <Button
            type="button"
            onClick={handleCountClick}
            className={`badge transition
    ${
      remaining === 0
        ? 'bg-red-100 text-red-700'
        : remaining === 1
          ? 'bg-amber-100 text-amber-800'
          : 'bg-emerald-100 text-emerald-700'
    }
  `}
            aria-label={remaining > 0 ? `تبقى ${remaining}` : 'إعادة الضبط'}
          >
            {remaining > 0 ? remaining : 'انتهى — إعادة'}
          </Button>
        </div>
      )}

      {item.description && (
        <p className="text-xs text-muted" style={{ textAlign: 'right' }}>
          {item.description}
        </p>
      )}

      <div className="flex gap-2 justify-end">
        {item.audio && (
          <Button
            type="button"
            onClick={toggleAudio}
            variant="ghost"
            className="text-xs px-2 py-1 rounded bg-muted"
            aria-label={playing ? 'إيقاف الصوت' : 'تشغيل الصوت'}
          >
            {playing ? 'إيقاف' : 'تشغيل الصوت'}
          </Button>
        )}

        <Button
          type="button"
          onClick={copyToClipboard}
          className="text-xs px-2 py-1 rounded bg-muted"
          aria-label="نسخ الذكر"
          variant="outline"
        >
          {copied ? 'تم النسخ' : 'نسخ'}
        </Button>

        <Button
          type="button"
          onClick={() => {
            if (navigator.share) navigator.share({ text: item.text }).catch(() => {});
          }}
          className="text-xs px-2 py-1 rounded bg-muted"
          aria-label="مشاركة الذكر"
          variant="outline"
        >
          مشاركة
        </Button>
      </div>
    </article>
  );
}
