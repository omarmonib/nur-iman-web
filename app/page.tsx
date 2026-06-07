import ArticlesSection from '@/components/articles/ArticlesSection';
import TodayDoaa from '@/components/doaa-naseha/TodayDoaa';
import PrayerTimesCard from '@/components/prayer/PrayerTimesCard';
import RadioPlayer from '@/components/radio/RadioPlayer';
import WeatherCard from '@/components/weather/WeatherCard';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground">
          موقع <span className="text-emerald-600">نور الايمان</span>
        </h1>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-0">
        <div className="md:col-span-3">
          <ErrorBoundary label="دعاء اليوم">
            <TodayDoaa />
          </ErrorBoundary>
        </div>

        <div className="md:col-span-6 flex flex-col gap-6">
          <ErrorBoundary label="المقالات">
            <ArticlesSection />
          </ErrorBoundary>
        </div>

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
