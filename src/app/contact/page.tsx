import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TouchUp. Find our contact details, office location, and send us a message through our contact form. We are here to help!',
};

const contactDetails = [
  { icon: Phone, text: '+971 54 531 4170', href: 'tel:+971545314170' },
  { icon: Mail, text: 'info@touchup.ae', href: 'mailto:info@touchup.ae' },
  { icon: MapPin, text: 'A202 - Sport Society Mall - Mirdif - Dubai', href: 'https://maps.app.goo.gl/j2K9xckTiutBcczi7' },
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
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <form className="space-y-4 flex flex-col flex-grow">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={5} className="flex-grow" />
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col space-y-4">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <item.icon className="h-6 w-6 text-primary" />
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">{item.text}</a>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <Clock className="h-6 w-6 text-primary" />
              <ul>
              <li><strong>Mon - Fri:</strong> 10:00 AM - 6:30 PM</li>
              <li><strong>Saturday:</strong> 10:00 AM - 3:00 PM</li>
              <li><strong>Sunday:</strong> Closed</li>
              </ul>
            </div>
            <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600 !mt-auto">
              <a href="https://wa.me/+971545314170" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Map */}
      <div className="mt-12 rounded-lg overflow-hidden shadow-md">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.720140556507!2d55.4071128318501!3d25.222091595902192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f610690b32a1b%3A0xe12a1ef297e8c056!2sSport%20Society!5e0!3m2!1sen!2sae!4v1752040962765!5m2!1sen!2sae" 
          width="100%" 
          height="450" 
          style={{border:0}} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
}
