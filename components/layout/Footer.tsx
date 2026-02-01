'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border text-card-foreground" dir="rtl">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="نور الايمان" width={32} height={32} />
          <span className="font-bold text-lg text-card-foreground">نور الايمان</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="text-muted-foreground hover:text-accent-foreground">
            الرئيسية
          </Link>
          <Link href="/prayer-times" className="text-muted-foreground hover:text-accent-foreground">
            مواقيت الصلاة
          </Link>
          <Link href="/azkar" className="text-muted-foreground hover:text-accent-foreground">
            الأذكار
          </Link>
          <Link href="/quran" className="text-muted-foreground hover:text-accent-foreground">
            القرآن
          </Link>
          <Link href="/listen" className="text-muted-foreground hover:text-accent-foreground">
            استمع
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} نور الايمان — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
