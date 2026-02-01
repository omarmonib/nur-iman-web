'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function CitySelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [flash, setFlash] = useState(false);

   const cities = [
     { label: 'القاهره', value: 'Cairo' },
     { label: 'الجيزة', value: 'Giza' },
     { label: 'الإسكندرية', value: 'Alexandria' },
     { label: 'أسوان', value: 'Aswan' },
     { label: 'الأقصر', value: 'Luxor' },
     { label: 'سوهاج', value: 'Sohag' },
     { label: 'بورسعيد', value: 'Port Said' },
     { label: 'الإسماعيلية', value: 'Ismailia' },
     { label: 'طنطا', value: 'Tanta' },
     { label: 'المنصورة', value: 'Mansoura' },
     { label: 'القليوبية', value: 'Qalyubia' },
     { label: 'أسيوط', value: 'Asyut' },
     { label: 'الفيوم', value: 'Faiyum' },
     { label: 'زقازيق', value: 'Zagazig' },
     { label: 'السويس', value: 'Suez' },
     { label: 'المنيا', value: 'Minya' },
     { label: 'دمنهور', value: 'Damanhur' },
     { label: 'المنوفية', value: 'Monufia' },
     { label: 'بني سويف', value: 'Beni Suef' },
     { label: 'الغردقة', value: 'Hurghada' },
   ];

  useEffect(() => {
    // play a short subtle animation when selected city changes
    const start = setTimeout(() => setFlash(true), 0);
    const t = setTimeout(() => setFlash(false), 260);
    return () => {
      clearTimeout(start);
      clearTimeout(t);
    };
  }, [value]);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`
          w-full max-w-48 text-right text-sm font-medium px-3 py-2 rounded-md
          border border-border bg-card text-foreground font-sans
          transform transition-transform duration-200 ease-out
          ${flash ? 'scale-105 shadow-md' : 'scale-100'}
        `}
        aria-label="اختر المدينة"
      >
        <SelectValue placeholder="القاهرة" />
      </SelectTrigger>

      <SelectContent
        className="
          text-right p-2 rounded-md shadow-lg
          bg-card text-foreground
          border border-border
          transform transition-opacity duration-150 ease-out max-h-60 overflow-y-auto scroll-smooth
        "
      >
        <SelectGroup>
          <SelectLabel className="text-xs font-semibold mb-1 text-muted-foreground sticky top-0 bg-card z-10">
            أختر المدينة
          </SelectLabel>

          <SelectSeparator className="border-t border-border my-2" />

          {cities.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CitySelector;
