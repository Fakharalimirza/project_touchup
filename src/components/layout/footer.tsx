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
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
               <Image src="https://touchup.ae/wp-content/uploads/2021/08/Screenshot_2024-03-27_125327-removebg-preview.png" alt="TouchUp Hub Logo" width={150} height={40} className="object-contain" />
            </Link>
            <p className="text-muted-foreground">
              Your trusted partner for all home maintenance and cleaning needs in Dubai. Quality service, guaranteed.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <span>123 Maintenance Ave, Business Bay, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:contact@touchup.ae" className="hover:text-primary">contact@touchup.ae</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+971041234567" className="hover:text-primary">+971 (0)4 123 4567</a>
              </li>
            </ul>
          </div>
          
          {/* Office Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
            <ul className="space-y-2 text-muted-foreground">
                <li><strong>Sat - Thu:</strong> 8:00 AM - 6:00 PM</li>
                <li><strong>Friday:</strong> Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TouchUp.ae. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
