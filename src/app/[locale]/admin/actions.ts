'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';

initializeAdminApp();

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME!;
const COOKIE_SECRET = process.env.SESSION_COOKIE_PASSWORD!;

// This is a simplified session management for demo purposes.
// In a real application, use a proper library like next-auth or iron-session.
async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
  
  cookies().set(SESSION_COOKIE_NAME, sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });
}

export async function login(idToken: string | undefined) {
  if (!idToken) {
    return { success: false, message: 'ID token is missing.' };
  }

  try {
    // Verify the admin credentials before creating a session
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (decodedToken.email !== adminEmail) {
      return { success: false, message: 'You are not authorized to access this page.' };
    }

    await createSession(idToken);
    
    // Revalidate path to ensure middleware reruns
    revalidatePath('/admin', 'layout');

    return { success: true, message: 'Login successful!' };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, message: 'Authentication failed. Please try again.' };
  }
}

export async function logout() {
  cookies().delete(SESSION_COOKIE_NAME);
  revalidatePath('/admin');
  redirect('/admin');
}
