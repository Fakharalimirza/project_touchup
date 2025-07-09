'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
];

const quickLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/services', labelKey: 'services' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
  { href: '/booking', labelKey: 'bookNow' },
  { href: '/blog', labelKey: 'blog' },
] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');

  return (
    <footer className="bg-card border-t text-muted-foreground text-sm">
      <div className="container max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-start">
          {/* About */}
          <div className="space-y-6 text-start">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
              <Image
                src="https://touchup.ae/wp-content/uploads/2025/07/black-logo-en.png"
                alt="TouchUp Hub Logo"
                width={120}
                height={40}
                className="object-contain dark:hidden"
              />
              <Image
                src="https://touchup.ae/wp-content/uploads/2025/07/white-logo-en.png"
                alt="TouchUp Hub Logo"
                width={120}
                height={40}
                className="object-contain hidden dark:block"
              />
            </Link>
            <p>
              {t('about')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-start">
            <h3 className="text-lg font-semibold text-foreground">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {tHeader(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-start">
            <h3 className="text-lg font-semibold text-foreground">{t('contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/j2K9xckTiutBcczi7"
                  className="hover:text-primary transition-colors"
                >
                  A202 - Sport Society Mall - Mirdif - Dubai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@touchup.ae" className="hover:text-primary transition-colors">
                  info@touchup.ae
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+971545314170" className="hover:text-primary transition-colors">
                  +971 54 531 4170
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Office Hours + Socials */}
          <div className="space-y-4 text-start">
            <h3 className="text-lg font-semibold text-foreground">{t('officeHours')}</h3>
            <ul className="space-y-2">
              <li>
                <strong>{t('hours.mon_fri')}</strong> {t('times.mon_fri')}
              </li>
              <li>
                <strong>{t('hours.sat')}</strong> {t('times.sat')}
              </li>
              <li>
                <strong>{t('hours.sun')}</strong> {t('times.sun')}
              </li>
            </ul>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-center text-xs">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
