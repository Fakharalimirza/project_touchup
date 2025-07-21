
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import AdminBookingNoticeEmail from '@/emails/admin-booking-notice';
import CustomerConfirmationEmail from '@/emails/customer-confirmation';
import { format } from 'date-fns';

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

// We create a new type for the email data that uses a string for the date.
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

  // Format the date into a string before sending it to the email template.
  const emailData: BookingEmailData = {
    ...validatedData.data,
    date: format(validatedData.data.date, 'PPP'),
  };

  try {
    // Send Emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminEmailHtml = render(<AdminBookingNoticeEmail data={emailData} />);
    const customerEmailHtml = render(<CustomerConfirmationEmail name={emailData.name} data={emailData} />);

    // Send email to admin
    await transporter.sendMail({
      from: `"TouchUp Booking" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL_BOOKING,
      subject: `New Booking Request: ${emailData.service}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Touchup Building Maintenance" <${process.env.SMTP_USER}>`,
      to: emailData.email,
      subject: 'Your Booking Request has been Received!',
      html: customerEmailHtml,
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
