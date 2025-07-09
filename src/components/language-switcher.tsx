
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Simple, self-contained SVG for the GB flag
const GbFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-auto rounded-sm">
    <rect fill="#00247d" width="60" height="30"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" strokeWidth="4"/>
    <path d="M0,15 H60 M30,0 V30" stroke="#fff" strokeWidth="10"/>
    <path d="M0,15 H60 M30,0 V30" stroke="#cf142b" strokeWidth="6"/>
  </svg>
);

// Simple, self-contained SVG for the UAE flag
const AeFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" className="w-6 h-auto rounded-sm">
        <rect width="1200" height="600" fill="#000"/>
        <rect width="1200" height="400" fill="#00732f"/>
        <rect width="1200" height="200" fill="#fff"/>
        <rect width="300" height="600" fill="#f00"/>
    </svg>
);


export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (nextLocale: string) => {
    // This will replace the current locale in the pathname with the new one
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {locale === 'en' ? <GbFlag /> : <AeFlag />}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLocale('en')} disabled={locale === 'en'}>
          <GbFlag />
          <span className="ms-2">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('ar')} disabled={locale === 'ar'}>
          <AeFlag />
          <span className="ms-2">العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
