import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

const blogPostKeys = ['ac_maintenance_tips', 'choosing_paint', 'common_plumbing_issues'];
const blogPostImages: Record<string, { image: string, dataAiHint: string }> = {
  ac_maintenance_tips: { image: 'https://placehold.co/400x250.png', dataAiHint: 'air conditioner' },
  choosing_paint: { image: 'https://placehold.co/400x250.png', dataAiHint: 'paint roller' },
  common_plumbing_issues: { image: 'https://placehold.co/400x250.png', dataAiHint: 'leaky faucet' },
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
 
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function BlogPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

  return (
    <div className="container py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostKeys.map((postKey) => (
          <Card key={postKey} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image src={blogPostImages[postKey].image} alt={tPosts(`${postKey}.title`)} fill className="object-cover" data-ai-hint={blogPostImages[postKey].dataAiHint} />
              </div>
              <div className="p-6">
                <CardTitle className="font-headline text-xl leading-snug">
                  <Link href={`/blog/${postKey}`} className="hover:text-primary transition-colors">{tPosts(`${postKey}.title`)}</Link>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-6">
              <p className="text-muted-foreground">{tPosts(`${postKey}.excerpt`)}</p>
            </CardContent>
            <CardFooter className="px-6 pb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>{tPosts(`${postKey}.date`)}</span>
              <Link href={`/blog/${postKey}`} className="font-semibold text-primary hover:underline">
                {t('readMore')} <ArrowRight className="inline h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
