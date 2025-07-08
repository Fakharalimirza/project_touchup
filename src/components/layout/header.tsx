"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { color } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Image src="https://touchup.ae/wp-content/uploads/2021/08/Screenshot_2024-03-27_125327-removebg-preview.png" alt="TouchUp Hub Logo" width={50} height={40} className="object-contain" />
        </Link>
        <nav className="hidden md:flex items-center gap-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild>
            <Link href="/booking">Book Now</Link>
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
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                   <Link href="/" className="flex items-center gap-2 font-bold text-primary mb-4" onClick={closeSheet}>
                     <Image src="https://touchup.ae/wp-content/uploads/2021/08/Screenshot_2024-03-27_125327-removebg-preview.png" alt="TouchUp Logo" width={150} height={40} className="object-contain" />
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button asChild className="w-full" onClick={closeSheet}>
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
