
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';

const loginSchema = z.object({
  idToken: z.string().min(1),
});

export async function createSession(idToken: string) {
  try {
    initializeAdminApp();
  } catch (error) {
    if (error instanceof Error) {
        console.error('Firebase Admin Initialization Error:', error.message);
        // Return a clearer, more user-friendly error message.
        return { error: `Admin login is not configured. Please set the FIREBASE_CLIENT_EMAIL and ADMIN_PRIVATE_KEY secrets in your App Hosting backend settings and redeploy.` };
    }
    throw new Error('An unknown error occurred during Firebase Admin initialization.');
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
  cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
  return { success: true };
}

export async function login(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid ID Token!' };
  }

  const { idToken } = validatedFields.data;

  const result = await createSession(idToken);

  if (result?.error) {
    return { error: result.error };
  }
  
  redirect('/admin/dashboard');
}


export async function logout() {
  cookies().delete('session');
  revalidatePath('/admin');
  redirect('/admin');
}
