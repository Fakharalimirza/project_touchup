import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services, Service } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/services" className="flex items-center gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                data-ai-hint={service.dataAiHint}
              />
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-primary font-semibold">SERVICE</span>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.title}</h1>
            <p className="text-lg text-muted-foreground">{service.details}</p>
            <Button asChild size="lg">
              <Link href={`/booking?service=${service.slug}`}>Book This Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
