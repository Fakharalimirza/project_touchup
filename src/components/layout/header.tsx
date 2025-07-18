import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/language-switcher';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

const logos = {
  en: {
    light: 'https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/logo%2Flogo%20black%20en.png?alt=media&token=74ca5c3b-ee14-4188-a000-8f3b4f91bca4',
    dark: 'https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/logo%2Flogo%20white%20en.png?alt=media&token=652355d2-af45-4c5a-a112-71d79a85c10d'
  },
  ar: {
    light: 'https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/logo%2Flogo%20black%20ar.png?alt=media&token=a7fa8eef-e242-4275-be0a-8171a99f1d2e',
    dark: 'https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/logo%2Flogo%20white%20ar.png?alt=media&token=c3bf3614-1d8c-49df-99d8-98b181d2ce36'
  }
}

type HeaderProps = {
  pathname: string;
};

export default function Header({ pathname }: HeaderProps) {
  const t = useTranslations('Header');
  const locale = useLocale() as 'en' | 'ar';
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => setSheetOpen(false);

  const getIsActive = (href: string) => {
    const localizedPath = `/${locale}${href === '/' ? '' : href}`;
    if (href === '/') {
        return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(localizedPath);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Image src={logos[locale].light} alt="Touchup Building Maintenance Logo" width={120} height={40} className="object-contain dark:hidden" style={{ height: 'auto' }} />
          <Image src={logos[locale].dark} alt="Touchup Building Maintenance Logo" width={120} height={40} className="object-contain hidden dark:block" style={{ height: 'auto' }}/>
        </Link>
        <nav className="hidden md:flex items-center gap-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                getIsActive(link.href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
           <Button asChild size="icon" className="bg-green-500 hover:bg-green-600 text-white hover:text-white/90">
            <a href="https://wa.me/971542477677" target="_blank" rel="noopener noreferrer" aria-label={t('whatsApp')}>
              <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path
                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-11.8-90.3-32.5l-6.7-4-67.1 17.5L52.4 352l-4.4-7c-18.6-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                ></path>
              </svg>
            </a>
          </Button>
          <Button asChild>
            <Link href="/booking">{t('bookNow')}</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === 'ar' ? 'left' : 'right'} className="flex flex-col">
              <SheetHeader>
                <SheetTitle>
                   <Link href="/" className="flex items-center gap-2 font-bold text-primary mb-4" onClick={closeSheet}>
                     <Image src={logos[locale].light} alt="Touchup Building Maintenance Logo" width={150} height={40} className="object-contain dark:hidden" style={{ height: 'auto' }}/>
                     <Image src={logos[locale].dark} alt="Touchup Building Maintenance Logo" width={150} height={40} className="object-contain hidden dark:block" style={{ height: 'auto' }}/>
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      getIsActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>
               <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                  <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={closeSheet}>
                    <a href="https://wa.me/971542477677" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-5 w-5"
                        fill="currentColor"
                      >
                        <path
                          d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-11.8-90.3-32.5l-6.7-4-67.1 17.5L52.4 352l-4.4-7c-18.6-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                        ></path>
                      </svg>
                      {t('whatsApp')}
                    </a>
                  </Button>
                  <Button asChild className="w-full" onClick={closeSheet}>
                    <Link href="/booking">{t('bookNow')}</Link>
                  </Button>
                  <div className="flex justify-center mt-2 gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
