import type { Metadata } from 'next';
import { Geist, Geist_Mono, Tajawal, Amiri, Scheherazade_New } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import PrayerBar from '@/components/layout/PrayerBar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { AudioManagerProvider } from '@/context/AudioManager';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin', 'latin-ext'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin', 'latin-ext'] });
const tajawal = Tajawal({
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700'],
  subsets: ['arabic'],
  display: 'swap',
});
const amiri = Amiri({
  variable: '--font-amiri',
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
});
const scheherazade = Scheherazade_New({
  variable: '--font-scheherazade',
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'نور الايمان',
  description: 'A modern Islamic web application.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} ${amiri.variable} ${scheherazade.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AudioManagerProvider>
            <Navbar />
            <PrayerBar />
            {/* pt-24 = 16 (navbar h-16) + 8 (prayer bar h-8) */}
            <main className="min-h-screen pt-24 container mx-auto">{children}</main>
            <Footer />
          </AudioManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
