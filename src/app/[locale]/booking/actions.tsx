
'use server';

import { z } from 'zod';
import { format } from 'date-fns';
import { render } from '@react-email/render';
import AdminBookingNoticeEmail from '@/emails/admin-booking-notice';
import CustomerConfirmationEmail from '@/emails/customer-confirmation';
import { getTransporter, getFromAddress, getAdminRecipients } from '@/lib/mailer';
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

export async function submitBooking(data: BookingFormValues) {
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid data provided.' };
  }

  const fromAddress = getFromAddress();
  const adminRecipients = getAdminRecipients('BOOKING');
  if (adminRecipients.length === 0) {
    throw new Error('ADMIN_EMAIL_BOOKING environment variable is not set.');
  }

  // Format the date into a string before sending it to the email template.
  const emailData: BookingEmailData = {
    ...validatedData.data,
    date: format(validatedData.data.date, 'PPP'),
  };

  try {
    const transporter = getTransporter();

    const adminHtml = await render(
      React.createElement(AdminBookingNoticeEmail, { data: emailData })
    );
    const customerHtml = await render(
      React.createElement(CustomerConfirmationEmail, { name: emailData.name, data: emailData })
    );

    // Send email to admins (supports multiple recipients)
    await transporter.sendMail({
      from: fromAddress,
      to: adminRecipients,
      subject: `New Booking Request: ${emailData.service}`,
      html: adminHtml,
      replyTo: emailData.email,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: fromAddress,
      to: emailData.email,
      subject: 'Your Booking Request has been Received!',
      html: customerHtml,
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
