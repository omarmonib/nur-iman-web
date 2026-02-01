'use client';

import { useEffect, useState } from 'react';

type Weather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
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

export default function WeatherCard({ initial = 'cairo' }: { initial?: string }) {
  const safeInitial = initial && CITIES[initial] ? initial : 'cairo';
  const [selected, setSelected] = useState<string>(safeInitial);
  const initialCity = CITIES[safeInitial];
  const [latitude, setLatitude] = useState<number>(initialCity.latitude);
  const [longitude, setLongitude] = useState<number>(initialCity.longitude);
  const [place, setPlace] = useState<string>(initialCity.name);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
        );
        if (!resp.ok) throw new Error('فشل تحميل الطقس');
        const json = await resp.json();
        const cw = json.current_weather;
        if (mounted && cw) {
          setWeather({
            temperature: cw.temperature,
            windspeed: cw.windspeed,
            winddirection: cw.winddirection,
            weathercode: cw.weathercode,
            time: cw.time,
          });
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg || 'حدث خطأ');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [latitude, longitude]);

  useEffect(() => {
    // when selected city changes, update coords and place
    const city = CITIES[selected];
    if (city) {
      setLatitude(city.latitude);
      setLongitude(city.longitude);
      setPlace(city.name);
    }
  }, [selected]);

  async function getMyLocation() {
    if (!navigator.geolocation) {
      setError('المتصفح لا يدعم تحديد الموقع');
      return;
    }

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        setPlace('موقعي');
        setSelected('');
        setLoading(false);
      },
      () => {
        setError('فشل الحصول على الموقع');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  return (
    <div className="w-full rounded-xl border bg-card p-3 text-primary flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">الطقس — {place}</h3>
          <p className="text-xs text-muted-foreground">المصدر: Open-Meteo</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selected}
            onChange={(e) => {
              const v = e.target.value;
              if (v === '__myloc') {
                getMyLocation();
              } else {
                setSelected(v);
              }
            }}
            className="rounded-md border px-2 py-1 text-sm"
            aria-label="اختر المدينة"
          >
            {Object.entries(CITIES).map(([key, c]) => (
              <option key={key} value={key}>
                {c.name}
              </option>
            ))}
            <option value="__myloc">موقعي</option>
          </select>
          <button
            type="button"
            className="text-sm px-2 py-1 rounded-md border"
            onClick={() => getMyLocation()}
            title="استخدم موقعي"
          >
            موقعي
          </button>
        </div>
      </div>

      {loading && <div className="text-sm opacity-80">جاري التحميل...</div>}

      {error && <div className="text-sm text-destructive">{error}</div>}

      {weather && (
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
