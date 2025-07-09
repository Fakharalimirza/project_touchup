'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

// This transporter configuration relies on environment variables.
// Ensure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM_EMAIL are set in your .env file.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function submitContactForm(data: ContactFormValues) {
  const validatedData = contactSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }
  
  const { name, email, subject, message } = validatedData.data;

  try {
    await transporter.sendMail({
      from: `"TouchUp Contact Form" <${process.env.SMTP_FROM_EMAIL || 'noreply@touchup.ae'}>`,
      to: 'info@touchup.ae',
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New message from your website contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: 'Failed to send the message.' };
  }
}
