
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const tPage = useTranslations('ServicesPage');
  const tServices = useTranslations('Services');
  const tGeneral = useTranslations('General');
  
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{tPage('title')}</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          {tPage('subtitle')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col text-center hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.34rem)]">
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                <service.icon className="w-10 h-10" />
              </div>
              <CardTitle className="font-headline text-2xl">{tServices(service.titleKey)}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-6 flex-grow">{tServices(service.descriptionKey)}</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href={`/services/${service.slug}`}>{tGeneral('viewDetails')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
