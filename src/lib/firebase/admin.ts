
import * as admin from 'firebase-admin';

export function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return;
  }
  
  // When deployed, the private key is available via the ADMIN_PRIVATE_KEY env var.
  // For local development, it falls back to FIREBASE_PRIVATE_KEY from the .env file.
  const privateKey = (process.env.ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n');

  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    throw new Error('Firebase Admin SDK credentials are not set in environment variables. Make sure FIREBASE_CLIENT_EMAIL and a private key (ADMIN_PRIVATE_KEY or FIREBASE_PRIVATE_KEY) are set as secrets.');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
    }),
  });
}
