
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

export async function submitBooking(data: BookingFormValues) {
  const validatedData = bookingSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Server-side validation failed:', validatedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }
  
  const { terms, ...bookingData } = validatedData.data;

  try {
    // Save to Firestore
    await addDoc(collection(db, "bookings"), {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: 'new'
    });

    return { success: true };
  } catch (error) {
    console.error('Error during submission:', error);
    if (error instanceof Error) {
        return { success: false, error: `Failed to submit booking: ${error.message}` };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}
