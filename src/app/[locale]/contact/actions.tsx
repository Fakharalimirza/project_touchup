
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { render } from '@react-email/render';
import AdminContactNoticeEmail from '@/emails/admin-contact-notice';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
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
  
  const contactData = validatedData.data;
  
  try {
    await addDoc(collection(db, "contacts"), {
      ...contactData,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    
    const emailHtml = render(<AdminContactNoticeEmail data={validatedData.data} />);

    await transporter.sendMail({
      from: `"Touchup Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL_CONTACT,
      replyTo: validatedData.data.email,
      subject: `New Contact Form Message: ${validatedData.data.subject}`,
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
