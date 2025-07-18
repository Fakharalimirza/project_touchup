
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  terms: z.literal(true),
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
  const { terms, ...contactData } = validatedData.data;

  
  try {
    // Save to Firestore
    await addDoc(collection(db, "contacts"), {
      ...contactData,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New message from your website contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <h3 style="color: #333;">Message:</h3>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${message}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"TouchUp Contact Form" <${process.env.SMTP_FROM_EMAIL || 'noreply@touchup.ae'}>`,
      to: process.env.ADMIN_EMAIL_CONTACT,
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Error during submission:', error);
    if (error instanceof Error) {
        return { success: false, error: `Failed to send message: ${error.message}` };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}
