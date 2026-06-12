import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'نور الايمان',
    short_name: 'نور الايمان',
    description: 'تطبيق إسلامي شامل — القرآن الكريم، الأذكار، مواقيت الصلاة',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#059669',
    lang: 'ar',
    dir: 'rtl',
    categories: ['religion', 'lifestyle'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'القرآن الكريم',
        url: '/quran',
        description: 'افتح المصحف الشريف',
      },
      {
        name: 'الأذكار',
        url: '/azkar',
        description: 'أذكار الصباح والمساء',
      },
    ],
  };
}
