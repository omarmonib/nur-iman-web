import TodayDoaa from '@/components/doaa-naseha/TodayDoaa';
import PrayerTimesCard from '@/components/prayer/PrayerTimesCard';
import RadioPlayer from '@/components/radio/RadioPlayer';
import WeatherCard from '@/components/weather/WeatherCard';
import QuranVerseOfDay from '@/components/home/QuranVerseOfDay';
import HadithOfDay from '@/components/home/HadithOfDay';
import HeroSection from '@/components/home/HeroSection';
import LastReadSurah from '@/components/home/LastReadSurah';
import RandomDhikr from '@/components/home/RandomDhikr';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <ErrorBoundary label="الترحيب">
        <HeroSection />
      </ErrorBoundary>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-0">
        {/* Right column */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <ErrorBoundary label="أكمل القراءة">
            <LastReadSurah />
          </ErrorBoundary>
          <ErrorBoundary label="دعاء اليوم">
            <TodayDoaa />
          </ErrorBoundary>
          <ErrorBoundary label="ذكر عشوائي">
            <RandomDhikr />
          </ErrorBoundary>
        </div>

        {/* Middle column */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <ErrorBoundary label="آية اليوم">
            <QuranVerseOfDay />
          </ErrorBoundary>
          <ErrorBoundary label="حديث اليوم">
            <HadithOfDay />
          </ErrorBoundary>
        </div>

        {/* Left column */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <ErrorBoundary label="مواقيت الصلاة">
            <PrayerTimesCard />
          </ErrorBoundary>
          <div>
            <h2 className="text-lg font-bold text-primary mb-2">
              🎧 استمع الآن الى إذاعة القرآن الكريم
            </h2>
            <ErrorBoundary label="الراديو">
              <RadioPlayer />
            </ErrorBoundary>
            <div className="mt-4">
              <ErrorBoundary label="الطقس">
                <WeatherCard />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
