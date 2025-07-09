import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Book Now' },
  { href: '/blog', label: 'Blog' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t text-muted-foreground text-sm">
      <div className="container max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-6 text-left">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
              <Image
                src="https://touchup.ae/wp-content/uploads/2021/08/Screenshot_2024-03-27_125327-removebg-preview.png"
                alt="TouchUp Hub Logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </Link>
            <p>
              Your trusted partner for all home maintenance and cleaning needs in Dubai. Quality service, guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
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
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-semibold text-foreground">Office Hours</h3>
            <ul className="space-y-2">
              <li>
                <strong>Mon - Fri:</strong> 10:00 AM - 6:30 PM
              </li>
              <li>
                <strong>Saturday:</strong> 10:00 AM - 3:00 PM
              </li>
              <li>
                <strong>Sunday:</strong> Closed
              </li>
            </ul>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} TouchUp.ae. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
