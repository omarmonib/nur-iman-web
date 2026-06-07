'use client';

import { useEffect, useState } from 'react';

type Weather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
};

const weatherCodeMap: Record<number, string> = {
  0: 'صافي',
  1: 'قليل السحب',
  2: 'غائم جزئياً',
  3: 'غائم',
  45: 'ضباب',
  48: 'رذاذ متجمد',
  51: 'رذاذ خفيف',
  53: 'رذاذ',
  55: 'رذاذ كثيف',
  61: 'أمطار خفيفة',
  63: 'أمطار',
  65: 'أمطار غزيرة',
  71: 'ثلج خفيف',
  73: 'ثلج',
  75: 'ثلج غزير',
  80: 'زخات أمطار',
  81: 'زخات أمطار قوية',
  82: 'زخات مطر عنيفة',
  95: 'عواصف رعدية',
  96: 'عواصف رعدية مع برد',
  99: 'عواصف رعدية مع برد شديد',
};

const CITIES: Record<string, { latitude: number; longitude: number; name: string }> = {
  cairo: { latitude: 30.0444, longitude: 31.2357, name: 'القاهرة' },
  riyadh: { latitude: 24.7136, longitude: 46.6753, name: 'الرياض' },
  jeddah: { latitude: 21.4858, longitude: 39.1925, name: 'جدة' },
  dubai: { latitude: 25.2048, longitude: 55.2708, name: 'دبي' },
  amman: { latitude: 31.9454, longitude: 35.9284, name: 'عمّان' },
};

type CityKey = keyof typeof CITIES | 'myloc';
type Coords = { latitude: number; longitude: number; name: string };

export default function WeatherCard({ initial = 'cairo' }: { initial?: string }) {
  const safeInitial = initial && CITIES[initial] ? initial : 'cairo';

  const [selected, setSelected] = useState<CityKey>(safeInitial);
  const [coords, setCoords] = useState<Coords>(CITIES[safeInitial]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&timezone=auto`,
      { signal: controller.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error('فشل تحميل الطقس');
        return r.json();
      })
      .then((json) => {
        if (!mounted) return;
        const cw = json.current_weather;
        if (cw) {
          setWeather({
            temperature: cw.temperature,
            windspeed: cw.windspeed,
            winddirection: cw.winddirection,
            weathercode: cw.weathercode,
          });
          setError(null);
        }
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (!mounted) return;
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'حدث خطأ');
        setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [coords]);

  const handleCityChange = (value: string) => {
    if (value === 'myloc') {
      getMyLocation();
      return;
    }
    const city = CITIES[value];
    if (!city) return;
    setSelected(value);
    setCoords(city);
    setLoading(true);
    setError(null);
  };

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      setError('المتصفح لا يدعم تحديد الموقع');
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSelected('myloc');
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name: 'موقعي',
        });
      },
      () => {
        setError('فشل الحصول على الموقع');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  return (
    <div className="w-full rounded-xl border bg-card p-3 text-primary flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">الطقس — {coords.name}</h3>
          <p className="text-xs text-muted-foreground">المصدر: Open-Meteo</p>
        </div>

        <select
          value={selected}
          onChange={(e) => handleCityChange(e.target.value)}
          className="rounded-md border px-2 py-1 text-sm"
          aria-label="اختر المدينة"
        >
          {Object.entries(CITIES).map(([key, c]) => (
            <option key={key} value={key}>
              {c.name}
            </option>
          ))}
          <option value="myloc">{selected === 'myloc' ? 'موقعي ✓' : 'موقعي'}</option>
        </select>
      </div>

      {loading && <div className="text-sm opacity-80">جاري التحميل...</div>}
      {error && <div className="text-sm text-destructive">{error}</div>}

      {weather && !loading && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{Math.round(weather.temperature)}°C</span>
            <span className="text-sm opacity-80">درجة الحرارة الحالية</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm">{weatherCodeMap[weather.weathercode] ?? '—'}</span>
            <span className="text-xs opacity-80">حالة السماء</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">{weather.windspeed} m/s</span>
            <span className="text-xs opacity-80">سرعة الرياح</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">{Math.round(weather.winddirection)}°</span>
            <span className="text-xs opacity-80">اتجاه الرياح</span>
          </div>
        </div>
      )}
    </div>
  );
}
