'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAudioManager } from '@/context/AudioManager';

type Item = {
  text: string;
  count?: number;
  description?: string;
  audio?: string;
};

export default function AzkarCard({ item }: { item: Item }) {
  const { toggle, isPlaying } = useAudioManager();
  const [copied, setCopied] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(
    typeof item.count === 'number' ? item.count : null
  );

  const playing = item.audio ? isPlaying(item.audio) : false;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.warn('[AzkarCard] clipboard write failed:', err);
    }
  };

  const handleCountClick = () => {
    if (remaining === null) return;
    if (remaining > 0) {
      setRemaining(remaining - 1);
    } else {
      setRemaining(item.count ?? null);
    }
  };

  return (
    <article className="p-4 rounded-lg border bg-card text-primary flex flex-col gap-2 rtl shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="prose-raw leading-relaxed" style={{ textAlign: 'right' }}>
          {item.text}
        </p>
      </div>

      {remaining !== null && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
          <Button
            type="button"
            onClick={handleCountClick}
            className={`badge transition ${
              remaining === 0
                ? 'bg-red-100 text-red-700'
                : remaining === 1
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-700'
            }`}
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
            onClick={() => toggle(item.audio!)}
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
            if (navigator.share) navigator.share({ text: item.text }).catch(console.warn);
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
