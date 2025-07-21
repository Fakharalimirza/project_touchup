
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import AdminContactNoticeEmail from '@/emails/admin-contact-notice';
import * as React from 'react';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormValues) {
  const validatedData = contactSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid data provided.' };
  }

  try {
    const fromAddress = process.env.EMAIL_FROM_ADDRESS;
    if (!fromAddress) {
      throw new Error('EMAIL_FROM_ADDRESS environment variable is not set.');
    }
    
    await resend.emails.send({
      from: fromAddress,
      to: process.env.ADMIN_EMAIL_CONTACT as string,
      subject: `New Contact Message: ${validatedData.data.subject}`,
      reply_to: validatedData.data.email,
      react: React.createElement(AdminContactNoticeEmail, { data: validatedData.data }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    if (error instanceof Error) {
       return { success: false, error: error.message };
    }
    return { success: false, error: 'An unexpected error occurred on the server.' };
  }
}
