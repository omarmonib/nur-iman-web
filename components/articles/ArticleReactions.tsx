'use client';

import { useState } from 'react';

type Reaction = 'like' | 'unlike' | 'heart' | null;

export default function ArticleReactions({ articleId }: { articleId: number }) {
  const [reaction, setReaction] = useState<Reaction>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(`reaction-${articleId}`);
    return (saved as Reaction) ?? null;
  });

  const handleReact = (type: Reaction) => {
    if (reaction === type) {
      setReaction(null);
      localStorage.removeItem(`reaction-${articleId}`);
    } else {
      setReaction(type);
      localStorage.setItem(`reaction-${articleId}`, type!);
    }
  };

  const btn = (type: Reaction, emoji: string) => (
    <button
      onClick={() => handleReact(type)}
      className={`px-3 py-1 rounded-md border transition
        ${reaction === type ? 'bg-primary text-primary-foreground' : 'bg-muted'}
      `}
    >
      {emoji}
    </button>
  );

  return (
    <div className="flex gap-2 mt-3">
      {btn('like', '👍')}
      {btn('unlike', '👎')}
      {btn('heart', '❤️')}
    </div>
  );
}
