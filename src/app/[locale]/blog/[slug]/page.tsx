
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string; locale: string };
};

const blogPostKeys = ['ac_maintenance_tips', 'choosing_paint', 'common_plumbing_issues'];
const blogPostImages: Record<string, { image: string, dataAiHint: string }> = {
  ac_maintenance_tips: { image: 'https://placehold.co/800x400.png', dataAiHint: 'air conditioner' },
  choosing_paint: { image: 'https://placehold.co/800x400.png', dataAiHint: 'paint roller' },
  common_plumbing_issues: { image: 'https://placehold.co/800x400.png', dataAiHint: 'leaky faucet' },
};

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);

  if (!blogPostKeys.includes(slug)) {
    return { title: 'Blog Post Not Found' };
  }

  const t = await getTranslations({ locale, namespace: `BlogPosts.${slug}` });
 
  return {
    title: t('title'),
    description: t('excerpt'),
  };
}

export function generateStaticParams() {
  return blogPostKeys.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params: { locale, slug } }: Props) {
  unstable_setRequestLocale(locale);

  if (!blogPostKeys.includes(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `BlogPosts.${slug}` });
  const tBlogPage = await getTranslations({ locale, namespace: 'BlogPage' });
  const postImage = blogPostImages[slug];

  return (
    <div className="container py-16">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/blog" className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
                </Link>
            </Button>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">{t('title')}</h1>
          <p className="text-muted-foreground text-lg">{t('excerpt')}</p>
          <p className="text-sm text-muted-foreground mt-4">{t('date')}</p>
        </header>

        {postImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
                <Image
                src={postImage.image}
                alt={t('title')}
                fill
                className="object-cover"
                data-ai-hint={postImage.dataAiHint}
                priority
                />
            </div>
        )}

        <div className="prose dark:prose-invert max-w-none prose-lg">
          {t.rich('content', {
            p: (chunks) => <p className="mb-4 text-muted-foreground">{chunks}</p>,
            h2: (chunks) => <h2 className="text-2xl font-semibold font-headline text-primary mt-8 mb-4">{chunks}</h2>,
            ul: (chunks) => <ul className="list-disc pl-5 space-y-2 text-muted-foreground">{chunks}</ul>,
            li: (chunks) => <li>{chunks}</li>,
            strong: (chunks) => <strong>{chunks}</strong>,
            a: (chunks) => <a href={chunks?.toString()} className="text-primary hover:underline">{chunks}</a>,
            br: () => <br />,
          })}
        </div>

      </article>
    </div>
  );
}
