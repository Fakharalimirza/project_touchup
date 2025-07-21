
import { unstable_setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServerOff } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                <ServerOff className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Database Not Connected</h3>
                <p className="text-muted-foreground">
                    This application is not connected to a database. Form submissions are sent via email only.
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
