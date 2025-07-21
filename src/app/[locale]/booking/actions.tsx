
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { format } from 'date-fns';
import AdminBookingNoticeEmail from '@/emails/admin-booking-notice';
import CustomerConfirmationEmail from '@/emails/customer-confirmation';
import * as React from 'react';

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  service: z.string(),
  propertyType: z.enum(['residential', 'commercial']),
  specificPropertyType: z.string(),
  date: z.date(),
  time: z.string(),
  apartmentVilla: z.string().min(1),
  building: z.string().min(2),
  street: z.string().min(3),
  area: z.string().min(3),
  city: z.string().min(2),
  instructions: z.string().optional(),
});

export type BookingEmailData = Omit<z.infer<typeof bookingSchema>, 'date'> & {
  date: string;
};
export type BookingFormValues = z.infer<typeof bookingSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitBooking(data: BookingFormValues) {
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid data provided.' };
  }
  
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;
  if (!fromAddress) {
      throw new Error('EMAIL_FROM_ADDRESS environment variable is not set.');
  }

  // Format the date into a string before sending it to the email template.
  const emailData: BookingEmailData = {
    ...validatedData.data,
    date: format(validatedData.data.date, 'PPP'),
  };

  try {
    // Send email to admin
    await resend.emails.send({
      from: fromAddress,
      to: process.env.ADMIN_EMAIL_BOOKING as string,
      subject: `New Booking Request: ${emailData.service}`,
      react: React.createElement(AdminBookingNoticeEmail, { data: emailData }),
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: fromAddress,
      to: emailData.email,
      subject: 'Your Booking Request has been Received!',
      react: React.createElement(CustomerConfirmationEmail, { name: emailData.name, data: emailData }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error in submitBooking:', error);
    if (error instanceof Error) {
       return { success: false, error: error.message };
    }
    return { success: false, error: 'An unexpected error occurred on the server.' };
  }
}
