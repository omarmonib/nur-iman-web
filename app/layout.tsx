import type { Metadata } from 'next';
import { Geist, Geist_Mono, Tajawal, Amiri, Scheherazade_New } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'], // remove 'arabic'
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'latin-ext'], // remove 'arabic'
});

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
        {/* ThemeProvider for Dark/Light mode using next-themes */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar fixed */}
          <Navbar />

          {/* Main content - pad top to account for fixed navbar (h-16) */}
          <main className="min-h-screen pt-16 container mx-auto relative z-10">{children}</main>

          {/* Footer fixed */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
