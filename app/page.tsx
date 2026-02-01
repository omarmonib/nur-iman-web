import ArticlesSection from '@/components/articles/ArticlesSection';
import TodayDoaa from '@/components/doaa-naseha/TodayDoaa';
import PrayerTimesCard from '@/components/prayer/PrayerTimesCard';
import RadioPlayer from '@/components/radio/RadioPlayer';
import WeatherCard from '@/components/weather/WeatherCard';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero / Welcom */}
      <section className="text-center py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground">
          موقع <span className="text-emerald-600">نور الايمان</span>
        </h1>
      </section>

      {/* Main Layout */}
      {/* Right Column - Daily Reminder / Duas */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-0">
        <div className="md:col-span-3">
          <TodayDoaa />
        </div>

        {/* Middle Column - Articles */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <ArticlesSection />
        </div>

        {/* Left Column - Prayer Times + Radio */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="">
            <PrayerTimesCard />
          </div>

          <div className="">
            <h2 className="text-lg font-bold text-primary mb-2">
              🎧 استمع الآن الى إذاعة القرآن الكريم
            </h2>
            <RadioPlayer />
            <div className="mt-4">
              <WeatherCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
