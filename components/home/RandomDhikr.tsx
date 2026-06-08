'use client';

import { useState, useCallback } from 'react';
import rawData from '@/data/azkar.json';
import type { AzkarSection } from '@/types/azkar';

const data = rawData as AzkarSection[];

// Flatten all azkar items from all sections into one array
const allAzkar = data.flatMap((section) =>
  section.array.map((item) => ({
    text: item.text,
    category: section.title ?? section.category,
  }))
);

function getRandomIndex(exclude?: number): number {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * allAzkar.length);
  } while (allAzkar.length > 1 && idx === exclude);
  return idx;
}

export default function RandomDhikr() {
  const [index, setIndex] = useState(() => getRandomIndex());
  const [animating, setAnimating] = useState(false);

  const refresh = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => getRandomIndex(prev));
      setAnimating(false);
    }, 200);
  }, []);

  const dhikr = allAzkar[index];
  if (!dhikr) return null;

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-primary">🌿 ذكر عشوائي</h2>
        <span className="text-xs text-muted-foreground">{dhikr.category}</span>
      </div>

      <p
        className={`text-base leading-relaxed text-right transition-opacity duration-200 ${
          animating ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ fontFamily: 'var(--font-amiri), serif' }}
      >
        {dhikr.text}
      </p>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ text: dhikr.text }).catch(() => {});
            } else {
              navigator.clipboard.writeText(dhikr.text).catch(() => {});
            }
          }}
          className="text-xs text-muted-foreground hover:text-primary transition underline underline-offset-2"
        >
          مشاركة
        </button>

        <button
          onClick={refresh}
          disabled={animating}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition disabled:opacity-50"
          aria-label="ذكر آخر"
        >
          <span
            className={`inline-block transition-transform duration-300 ${animating ? 'rotate-180' : ''}`}
          >
            ↻
          </span>
          ذكر آخر
        </button>
      </div>
    </div>
  );
}
