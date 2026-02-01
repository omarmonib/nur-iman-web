'use client';

import React from 'react';

type Section<K extends string = string> = {
  key: K;
  title: string;
};

interface Props<K extends string = string> {
  active: K;
  onChange: React.Dispatch<React.SetStateAction<K>>;
  sections: Section<K>[];
}

export function AzkarTabs<K extends string = string>({ active, onChange, sections }: Props<K>) {
  return (
    <div className="flex flex-row gap-4">
      {sections.map((s) => (
        <div
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`cursor-pointer p-4 rounded-xl border shadow-md transition transform hover:scale-105 
            ${
              s.key === active
                ? 'bg-accent/90 text-primary border-primary shadow-md'
                : 'bg-card text-primary border-muted/50'
            }`}
        >
          <h3 className="text-center">{s.title}</h3>
        </div>
      ))}
    </div>
  );
}
