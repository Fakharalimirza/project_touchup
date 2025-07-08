import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TouchUp Hub. Find our contact details, office location, and send us a message through our contact form. We are here to help!',
};

const contactDetails = [
  { icon: Phone, text: '+971 (0)4 123 4567', href: 'tel:+97141234567' },
  { icon: Mail, text: 'contact@touchup.ae', href: 'mailto:contact@touchup.ae' },
  { icon: MapPin, text: '123 Maintenance Ave, Business Bay, Dubai' },
];

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          We're here to help with all your maintenance needs. Reach out to us via phone, email, or the form below.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Details & Map */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <item.icon className="h-6 w-6 text-primary" />
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground hover:text-primary">{item.text}</a>
                  ) : (
                    <span className="text-muted-foreground">{item.text}</span>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">Sat - Thu: 8 AM - 6 PM</span>
              </div>
            </CardContent>
          </Card>

          <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600">
            <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </Button>
          
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
             <Image src="https://placehold.co/600x400.png" alt="Map location" fill className="object-cover" data-ai-hint="map location" />
          </div>
        </div>
      </div>
    </div>
  );
}
