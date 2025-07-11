import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TermsPage' });
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PrivacyPolicyPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TermsPage' });

  const sections: Array<{ title: string; content: string | string[] }> = [
    { title: 'acceptance.title', content: 'acceptance.content' },
    { title: 'accounts.title', content: 'accounts.content' },
    { title: 'prohibited.title', content: 'prohibited.content' },
    { title: 'content.title', content: 'content.content' },
    { 
      title: 'info.title', 
      content: [
        'info.list.personal',
        'info.list.technical',
        'info.list.usage',
        'info.list.cookies',
      ] 
    },
    { 
      title: 'usage.title', 
      content: [
        'usage.list.provide',
        'usage.list.respond',
        'usage.list.send',
        'usage.list.analyze',
        'usage.list.comply',
      ]
    },
    { 
      title: 'sharing.title', 
      content: [
        'sharing.list.providers',
        'sharing.list.law',
        'sharing.list.thirdParties',
      ]
    },
    { title: 'payment.title', content: 'payment.content' },
    { title: 'termination.title', content: 'termination.content' },
    { title: 'modifications.title', content: 'modifications.content' },
    { title: 'disclaimer.title', content: 'disclaimer.content' },
    { title: 'liability.title', content: 'liability.content' },
    { title: 'governing.title', content: 'governing.content' },
    { title: 'final.title', content: 'final.content' },
  ];

  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
          <p className="text-lg text-muted-foreground mt-4">
            {t('subtitle')}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          {sections.map(section => (
            <div key={section.title}>
              <h2 className="text-2xl font-semibold font-headline text-primary">{t(section.title as any)}</h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {section.content.map(item => (
                    <li key={item}>{t(item as any)}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">{t(section.content as any)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
