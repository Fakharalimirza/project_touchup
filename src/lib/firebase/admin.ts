
import * as admin from 'firebase-admin';

export function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return;
  }
  
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    throw new Error('Firebase Admin SDK credentials are not set in environment variables. Make sure FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set as secrets.');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
    }),
  });
}
