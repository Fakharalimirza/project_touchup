
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

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

function getAdminEmailHtml(data: BookingFormValues) {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #333;">New Booking Request</h1>
        
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 5px; color: #555;">Customer Details</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>

        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 5px; color: #555;">Booking Details</h2>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date & Time:</strong> ${new Date(data.date).toLocaleDateString()} at ${data.time}</p>

        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 5px; color: #555;">Property Details</h2>
        <p><strong>Property Type:</strong> ${data.propertyType}</p>
        <p><strong>Specifics:</strong> ${data.specificPropertyType}</p>
        <p><strong>Address:</strong> ${data.apartmentVilla}, ${data.building}, ${data.street}, ${data.area}, ${data.city}</p>

        ${data.instructions ? `
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 5px; color: #555;">Special Instructions</h2>
        <p>${data.instructions}</p>
        ` : ''}
    </div>
    `;
}

function getCustomerEmailHtml(name: string, data: BookingFormValues) {
    const baseUrl = 'https://touchup.ae';
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
        <img src="https://touchup.ae/wp-content/uploads/2021/08/Screenshot_2024-03-27_125327-removebg-preview.png" width="150" alt="TouchUp Hub" style="margin: 0 auto;" />
        <h1 style="color: #1d1c1d;">Thank you for choosing TouchUp Hub!</h1>
        <div style="text-align: left; padding: 0 24px;">
            <p>Hi ${name},</p>
            <p>We have received your booking request and a member of our team will contact you shortly to confirm the details.</p>
        </div>
        <div style="margin: 24px; padding: 16px; border: 1px solid #eee; border-radius: 5px; background-color: #fafafa; text-align: left;">
            <h2 style="font-size: 16px; margin-top: 0;">Your Request Summary:</h2>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.time}</p>
        </div>
        <div style="text-align: left; padding: 0 24px;">
            <p>We look forward to serving you!</p>
        </div>
        <a href="${baseUrl}" style="background-color: #1890ff; border-radius: 3px; color: #fff; display: inline-block; padding: 12px 24px; text-decoration: none; margin: 24px auto;">Visit Our Website</a>
        <p style="color: #8898aa; font-size: 12px; text-align: center;">TouchUp Hub, A202 - Sport Society Mall - Mirdif - Dubai</p>
    </div>
    `;
}

export async function submitBooking(data: BookingFormValues) {
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }

  const adminEmailHtml = getAdminEmailHtml(validatedData.data);
  const customerEmailHtml = getCustomerEmailHtml(validatedData.data.name, validatedData.data);

  try {
    // Send email to admin
    await transporter.sendMail({
      from: `"TouchUp Booking" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL_BOOKING,
      subject: `New Booking Request - ${validatedData.data.service}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"TouchUp Hub" <${process.env.SMTP_FROM_EMAIL}>`,
      to: validatedData.data.email,
      subject: 'Your Booking Request with TouchUp Hub has been received!',
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: 'Failed to send emails.' };
  }
}
