
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { render } from '@react-email/render';
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

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function submitBooking(data: BookingFormValues) {
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }
  
  const { terms, ...bookingData } = validatedData.data;

  try {
    // Save to Firestore
    await addDoc(collection(db, "bookings"), {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: 'new'
    });

    const adminEmailHtml = render(<AdminBookingNoticeEmail data={validatedData.data} />);
    const customerEmailHtml = render(<CustomerConfirmationEmail name={validatedData.data.name} data={validatedData.data} />);

    // Send email to admin
    await transporter.sendMail({
      from: `"TouchUp Booking" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL_BOOKING,
      subject: `New Booking Request - ${validatedData.data.service}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Touchup Building Maintenance" <${process.env.SMTP_FROM_EMAIL}>`,
      to: validatedData.data.email,
      subject: 'Your Booking Request with Touchup Building Maintenance has been received!',
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Error during submission:', error);
    if (error instanceof Error) {
        return { success: false, error: `Failed to submit booking: ${error.message}` };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}
