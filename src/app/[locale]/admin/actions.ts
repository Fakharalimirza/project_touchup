'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function createSession(idToken: string) {
  await initializeAdminApp();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
  cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
}

export async function login(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Firebase Auth Error:', result.error.message);
      return { error: 'Invalid email or password.' };
    }

    await createSession(result.idToken);
    
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred.' };
  }
  
  redirect('/admin/dashboard');
}


export async function logout() {
  cookies().delete('session');
  revalidatePath('/admin');
  redirect('/admin');
}
