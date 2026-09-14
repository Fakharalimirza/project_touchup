
'use server';

import { z } from 'zod';
import { render } from '@react-email/render';
import AdminContactNoticeEmail from '@/emails/admin-contact-notice';
import { getTransporter, getFromAddress, getAdminRecipients } from '@/lib/mailer';
import * as React from 'react';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormValues) {
  const validatedData = contactSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid data provided.' };
  }

  try {
    const fromAddress = getFromAddress();
    const adminRecipients = getAdminRecipients('CONTACT');
    if (adminRecipients.length === 0) {
      throw new Error('ADMIN_EMAIL_CONTACT environment variable is not set.');
    }

    const html = await render(
      React.createElement(AdminContactNoticeEmail, { data: validatedData.data })
    );

    await getTransporter().sendMail({
      from: fromAddress,
      to: adminRecipients,
      subject: `New Contact Message: ${validatedData.data.subject}`,
      replyTo: validatedData.data.email,
      html,
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
