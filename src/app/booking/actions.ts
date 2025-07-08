'use server';

import { z } from 'zod';

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

type BookingFormValues = z.infer<typeof bookingSchema>;

export async function submitBooking(data: BookingFormValues) {
  // Validate data on the server
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }

  const { name, email, phone, service, propertyType, specificPropertyType, date, time, apartmentVilla, building, street, area, city, instructions } = validatedData.data;

  // In a real application, you would use a service like Resend, SendGrid, or Nodemailer to send emails.
  // As I cannot handle API keys, I will simulate the email sending process by logging to the console.

  // 1. Email to the admin
  const adminEmailContent = `
    New Booking Request
    -------------------
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Service: ${service}
    Property Type: ${propertyType}
    Property Details: ${specificPropertyType}
    Date: ${date.toLocaleDateString()}
    Time: ${time}
    Address: ${apartmentVilla}, ${building}, ${street}, ${area}, ${city}
    Instructions: ${instructions || 'N/A'}
  `;

  console.log('--- Sending Email to Admin (info@touchup.ae) ---');
  console.log(adminEmailContent);
  console.log('-------------------------------------------------');


  // 2. Confirmation email to the customer
  const customerEmailContent = `
    Subject: Your Booking Request with TouchUp Hub has been received!

    Hi ${name},

    Thank you for choosing TouchUp Hub!

    We have received your booking request and a member of our team will contact you shortly to confirm the details.

    Your Request Summary:
    --------------------
    Service: ${service}
    Date: ${date.toLocaleDateString()}
    Time: ${time}

    We look forward to serving you!

    Best regards,
    The TouchUp Hub Team
  `;

  console.log(`--- Sending Confirmation Email to Customer (${email}) ---`);
  console.log(customerEmailContent);
  console.log('---------------------------------------------------------');

  // Simulate a successful operation
  return { success: true };
}
