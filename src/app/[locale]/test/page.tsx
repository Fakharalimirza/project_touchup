'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sendTestEmail } from './actions';
import { Loader2 } from 'lucide-react';

export default function TestPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendTestEmail = async () => {
    setIsLoading(true);
    try {
      const result = await sendTestEmail();
      if (result.success) {
        toast({
          title: 'Email Sent!',
          description: 'The test email was sent successfully.',
        });
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to Send Email',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-16 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Email Test Page</h1>
        <p className="text-muted-foreground mt-2">
          Click the button below to send a test email.
        </p>
      </div>
      <Button onClick={handleSendTestEmail} disabled={isLoading} size="lg">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Test Email
      </Button>
    </div>
  );
}
