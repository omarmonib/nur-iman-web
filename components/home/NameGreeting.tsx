'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function NameGreeting() {
  const isMounted = useIsMounted();
  const [name, setName] = useLocalStorage<string>('user-name', '');
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);

  if (!isMounted) return null;

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setName(trimmed);
    setEditing(false);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') {
      setEditing(false);
      setInput('');
    }
  };

  if (name && !editing) {
    return (
      <div className="flex items-center justify-center gap-2">
        <p
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: 'var(--font-amiri), serif' }}
        >
          أهلاً وسهلاً يا {name} 🌙
        </p>
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-muted-foreground hover:text-primary transition underline underline-offset-2"
          aria-label="تغيير الاسم"
        >
          تغيير
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {!name && <p className="text-muted-foreground text-sm">أدخل اسمك لنحييك بشكل شخصي 😊</p>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اسمك هنا..."
          maxLength={30}
          autoFocus
          className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-sm text-right placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44"
          aria-label="أدخل اسمك"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-40"
        >
          تأكيد
        </button>
        {editing && (
          <button
            onClick={() => {
              setEditing(false);
              setInput('');
            }}
            className="text-xs text-muted-foreground hover:text-primary transition"
          >
            إلغاء
          </button>
        )}
      </div>
    </div>
  );
}
