'use client';

import { useAudioManager } from '@/context/AudioManager';

type Props = {
  text: string;
  numberInSurah: number;
  audio?: string;
  isActive?: boolean;
  onPlay?: () => void;
};

export default function QuranAyah({ text, numberInSurah, audio, isActive = false, onPlay }: Props) {
  const { isPlaying, toggle } = useAudioManager();

  const playing = audio ? isPlaying(audio) : false;

  const handleToggle = () => {
    if (onPlay && !playing) {
      onPlay();
    } else if (audio) {
      toggle(audio);
    }
  };

  return (
    <div className={`ayah ${isActive ? 'active' : ''}`} dir="rtl">
      <span className="text-2xl leading-relaxed">{text}</span>
      <span className="verse-number" aria-hidden>
        {numberInSurah}
      </span>
      {audio && (
        <div className="mt-2">
          <button onClick={handleToggle} className="px-2 py-1 bg-accent/20 rounded text-sm">
            {playing ? 'إيقاف' : 'تشغيل'}
          </button>
        </div>
      )}
    </div>
  );
}
