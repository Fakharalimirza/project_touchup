'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import AdminBookingNoticeEmail from '@/emails/admin-booking-notice';
import CustomerConfirmationEmail from '@/emails/customer-confirmation';

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
  terms: z.literal(true),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitBooking(data: BookingFormValues) {
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }

  try {
    // Send email to admin
    await resend.emails.send({
      from: 'TouchUp Booking <booking@touchup.ae>',
      to: 'info@touchup.ae',
      subject: `New Booking Request - ${validatedData.data.service}`,
      react: AdminBookingNoticeEmail({ data: validatedData.data }),
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'TouchUp Hub <booking@touchup.ae>',
      to: validatedData.data.email,
      subject: 'Your Booking Request with TouchUp Hub has been received!',
      react: CustomerConfirmationEmail({ name: validatedData.data.name, data: validatedData.data }),
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: 'Failed to send emails.' };
  }
}
