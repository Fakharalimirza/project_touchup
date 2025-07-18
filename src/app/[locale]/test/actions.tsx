'use server';

import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import TestEmail from '@/emails/test-email';

export async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailHtml = render(<TestEmail />);

  try {
    await transporter.sendMail({
      from: `"TouchUp Test" <${process.env.SMTP_USER}>`,
      to: 'fakharalimirza@gmail.com',
      subject: 'Touchup.ae - Email Test',
      html: emailHtml,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error sending test email:', error);
    return { success: false, error: error.message || 'Failed to send email.' };
  }
}
