import nodemailer, { type Transporter } from 'nodemailer';

let _transporter: Transporter | null = null;

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is not set.`);
  }
  return value;
}

export function getTransporter(): Transporter {
  if (!_transporter) {
    const host = required('SMTP_HOST');
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = (process.env.SMTP_SECURE || 'true').toLowerCase() === 'true';
    const user = required('SMTP_USER');
    const pass = required('SMTP_PASS');

    _transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { minVersion: 'TLSv1.2' },
    });
  }
  return _transporter;
}

export function getFromAddress(): string {
  return process.env.EMAIL_FROM_ADDRESS || 'Touchup Website <website-form@touchup.ae>';
}

/** Parse comma-separated admin list, e.g. "a@x, b@x" -> ["a@x","b@x"] */
export function getAdminRecipients(kind: 'BOOKING' | 'CONTACT'): string[] {
  const raw =
    kind === 'BOOKING'
      ? process.env.ADMIN_EMAIL_BOOKING || ''
      : process.env.ADMIN_EMAIL_CONTACT || '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function verifySmtp(): Promise<void> {
  await getTransporter().verify();
}
