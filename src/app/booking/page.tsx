import { Suspense } from 'react';
import { Metadata } from 'next';
import BookingForm from '@/components/booking-form';

export const metadata: Metadata = {
  title: 'Book a Service',
  description: 'Schedule your next home maintenance or cleaning service with TouchUp Hub. Our simple booking form makes it easy to get the help you need.',
};

function BookingFormFallback() {
  return <div>Loading form...</div>
}

export default function BookingPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Book a Service</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Fill out the form below to schedule your service. We'll get back to you to confirm your appointment.
          </p>
        </div>
        
        <Suspense fallback={<BookingFormFallback />}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
