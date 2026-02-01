'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Sun, Moon } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import IslamicIcon from '@/public/icons/islamic.svg';

const isActiveLink = (href: string, path: string) =>
  href === '/' ? path === '/' : path.startsWith(href);

const navLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الأذكار', href: '/azkar' },
  { name: 'القرآن', href: '/quran' },
  { name: 'من نحن', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const path = pathname ?? '';

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const ThemeIcon = useMemo(
    () => (resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />),
    [resolvedTheme]
  );

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/95 text-card-foreground backdrop-blur-sm shadow-sm"
      dir="rtl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 sm:px-4 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 md:static absolute left-4 top-1/2 -translate-y-1/2 md:translate-y-1"
        >
          <Image
            src={IslamicIcon}
            alt="نور الايمان"
            width={32}
            height={32}
            className="dark:invert"
          />
          <span className="font-bold text-lg">نور الايمان</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href, path);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 rounded-md text-md font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground hover:text-accent-foreground'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="تبديل الوضع"
          >
            {mounted && ThemeIcon}
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="فتح القائمة">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              dir="rtl"
              className="pt-6 pb-6 bg-card text-card-foreground text-right"
            >
              <div className="px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={IslamicIcon}
                      alt="logo"
                      width={28}
                      height={28}
                      className="dark:invert"
                    />
                    <span className="font-semibold">نور الايمان</span>
                  </div>

                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="إغلاق القائمة">
                      ✕ أغلاق
                    </Button>
                  </SheetClose>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.href, path);

                    return (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className={`block w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                            isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/10'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                {/* Theme toggle */}
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    aria-label="تبديل الوضع"
                  >
                    {mounted && ThemeIcon}
                  </Button>
                  <span className="text-sm">وضع الواجهة</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
