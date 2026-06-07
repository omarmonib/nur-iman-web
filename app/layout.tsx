import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Tajawal, Amiri, Scheherazade_New } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import PrayerBar from '@/components/layout/PrayerBar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { AudioManagerProvider } from '@/context/AudioManager';
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister';

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
  description: 'تطبيق إسلامي شامل — القرآن الكريم، الأذكار، مواقيت الصلاة',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'نور الايمان',
  },
};

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
            <ServiceWorkerRegister />
            <Navbar />
            <PrayerBar />
            <main className="min-h-screen pt-24 container mx-auto">{children}</main>
            <Footer />
          </AudioManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
