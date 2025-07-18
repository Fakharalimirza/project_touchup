
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import AdminContactNoticeEmail from '@/emails/admin-contact-notice';

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
    // Send Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = render(<AdminContactNoticeEmail data={validatedData.data} />);

    await transporter.sendMail({
      from: `"TouchUp Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL_CONTACT,
      subject: `New Contact Message: ${validatedData.data.subject}`,
      replyTo: validatedData.data.email,
      html: emailHtml,
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
