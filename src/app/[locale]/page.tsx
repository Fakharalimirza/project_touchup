
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { services } from '@/lib/data';
import { Users, DollarSign, Clock, LifeBuoy, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const whyChooseUsKeys = ['experienced', 'affordable', 'reliable', 'support'] as const;
const testimonialKeys = ['ahmed', 'fatima', 'john'] as const;

const whyChooseUsIcons: Record<typeof whyChooseUsKeys[number], React.ElementType> = {
  experienced: Users,
  affordable: DollarSign,
  reliable: Clock,
  support: LifeBuoy,
};

export default function Home() {
  const tHome = useTranslations('Home');
  const tServices = useTranslations('Services');
  const tGeneral = useTranslations('General');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <div
            className="absolute inset-0"
        >
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/painting.png?alt=media&token=cd8e0f87-467e-433f-9ce8-2060f7e8345e"
                alt="Technician working on an air conditioner"
                fill
                className="object-cover"
                priority
                data-ai-hint="painting wall"
            />
        </div>
        <div className="absolute inset-0 bg-black/60 dark:bg-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div
            className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center"
        >
            <h1
                className="text-4xl md:text-7xl font-bold font-headline mb-4"
            >
                {tHome('heroTitle')}
            </h1>
            <p
                className="text-lg md:text-xl mb-8"
            >
                {tHome('heroSubtitle')}
            </p>
            <div>
                <Button asChild size="lg">
                    <Link href="/booking">{tHome('heroButton')}</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Services Overview */}
      <section
        id="services"
        className="py-16 md:py-24"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{tHome('servicesTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              {tHome('servicesSubtitle')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service) => (
              <div key={service.slug} className="w-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.34rem)]">
                <Card className="text-center transition-all duration-300 glow-border bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline">{tServices(service.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-4">{tServices(service.descriptionKey)}</p>
                    <Button asChild variant="outline">
                      <Link href={`/services/${service.slug}`}>{tGeneral('learnMore')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-16 md:py-24 bg-card/50"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{tHome('whyChooseUsTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2">
              {tHome('whyChooseUsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsKeys.map((itemKey) => {
              const Icon = whyChooseUsIcons[itemKey];
              return (
              <div key={itemKey} className="flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:bg-primary/10">
                <div className="bg-accent/20 text-accent p-4 rounded-full mb-4 transition-all duration-300 transform-gpu hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--accent))]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tHome(`whyChooseUsItems.${itemKey}.title`)}</h3>
                <p className="text-muted-foreground">{tHome(`whyChooseUsItems.${itemKey}.description`)}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 md:py-24"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{tHome('testimonialsTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2">
              {tHome('testimonialsSubtitle')}
            </p>
          </div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonialKeys.map((testimonialKey, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full glow-border bg-card/50 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center text-center p-6 h-full">
                        <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                          <AvatarImage src={`https://placehold.co/100x100.png`} alt={tHome(`testimonials.${testimonialKey}.name`)} data-ai-hint="man portrait" />
                          <AvatarFallback>{tHome(`testimonials.${testimonialKey}.name`).charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground italic mb-4 flex-grow">"{tHome(`testimonials.${testimonialKey}.quote`)}"</p>
                        <p className="font-semibold">{tHome(`testimonials.${testimonialKey}.name`)}</p>
                        <p className="text-sm text-muted-foreground">{tHome(`testimonials.${testimonialKey}.title`)}</p>
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
      <section
        className="py-20 bg-gradient-to-r from-primary via-accent to-primary/80 text-primary-foreground"
        >
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{tHome('ctaTitle')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {tHome('ctaSubtitle')}
          </p>
          <div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/booking">{tHome('ctaButton')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
