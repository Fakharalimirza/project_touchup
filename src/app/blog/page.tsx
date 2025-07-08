import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Tips',
  description: 'Find helpful tips, maintenance advice, and company news on the TouchUp Hub blog. Your resource for a well-maintained home.',
};

const blogPosts = [
  {
    slug: 'ac-maintenance-tips',
    title: 'Top 5 AC Maintenance Tips for the Dubai Heat',
    excerpt: 'Keep your cool this summer with these essential tips for maintaining your air conditioning unit. A little care goes a long way!',
    date: 'July 15, 2024',
    image: 'https://placehold.co/400x250.png',
    dataAiHint: 'air conditioner',
  },
  {
    slug: 'choosing-paint',
    title: 'How to Choose the Right Paint for Your Dubai Home',
    excerpt: 'Picking the right paint is more than just color. Learn about different types of paint and what works best for the local climate.',
    date: 'July 10, 2024',
    image: 'https://placehold.co/400x250.png',
    dataAiHint: 'paint roller',
  },
  {
    slug: 'common-plumbing-issues',
    title: 'DIY Fixes for Common Plumbing Issues (and When to Call a Pro)',
    excerpt: 'A leaky faucet? A slow drain? Here are some simple fixes you can try yourself, and how to know when it\'s time to call TouchUp Hub.',
    date: 'July 5, 2024',
    image: 'https://placehold.co/400x250.png',
    dataAiHint: 'leaky faucet',
  },
];

export default function BlogPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Blog & Maintenance Tips</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Expert advice and insights to help you keep your home in top shape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.dataAiHint} />
              </div>
              <div className="p-6">
                <CardTitle className="font-headline text-xl leading-snug">
                  <Link href="#" className="hover:text-primary transition-colors">{post.title}</Link>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-6">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="px-6 pb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>{post.date}</span>
              <Link href="#" className="font-semibold text-primary hover:underline">
                Read More <ArrowRight className="inline h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
