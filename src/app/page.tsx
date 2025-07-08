import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { services } from '@/lib/data';
import { CheckCircle, Users, DollarSign, Clock, LifeBuoy } from 'lucide-react';

const whyChooseUs = [
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our team consists of certified and experienced professionals.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Prices',
    description: 'We offer competitive pricing without compromising on quality.',
  },
  {
    icon: Clock,
    title: 'Quick & Reliable',
    description: 'Punctual and efficient service to fit your busy schedule.',
  },
  {
    icon: LifeBuoy,
    title: '24/7 Support',
    description: 'Our support team is always ready to assist you anytime.',
  },
];

const testimonials = [
  {
    name: 'Ahmed Khan',
    title: 'Homeowner, Dubai Marina',
    quote: 'TouchUp Hub\'s team was professional and efficient. My AC has never worked better! Highly recommended for their prompt service.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Fatima Al-Jaber',
    title: 'Business Owner',
    quote: 'We use TouchUp Hub for all our office maintenance needs. They are reliable, and their deep cleaning service is second to none.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'John Smith',
    title: 'Expat Resident',
    quote: 'I had a plumbing emergency, and they were at my door within an hour. Fast, friendly, and fixed the problem perfectly. Great job!',
    avatar: 'https://placehold.co/100x100.png',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Technician working on an air conditioner"
          fill
          className="object-cover"
          priority
          data-ai-hint="cleaning team"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            Reliable Home Maintenance, One Touch Away
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your trusted partner for cleaning, AC, plumbing, and electrical services in Dubai.
          </p>
          <Button asChild size="lg">
            <Link href="/booking">Book a Service Now</Link>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Services</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              We offer a wide range of services to keep your home in perfect condition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.slug} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button asChild variant="outline">
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground mt-2">
              We are committed to providing top-quality service and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="bg-accent/20 text-primary p-4 rounded-full mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Real stories from our satisfied customers.
            </p>
          </div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center text-center p-6">
                        <Avatar className="w-20 h-20 mb-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">Ready for a Spotless Home?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let our experts take care of your home maintenance needs. Get a free quote or book your service online today!
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/booking">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
