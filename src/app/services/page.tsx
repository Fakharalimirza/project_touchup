import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the wide range of professional home maintenance and cleaning services offered by TouchUp Hub. From deep cleaning to AC repair, we have you covered.',
};

export default function ServicesPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Professional Services</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          At TouchUp Hub, we provide a comprehensive suite of high-quality services to ensure your home or office is in pristine condition.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col text-center hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.34rem)]">
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                <service.icon className="w-10 h-10" />
              </div>
              <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href={`/services/${service.slug}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
