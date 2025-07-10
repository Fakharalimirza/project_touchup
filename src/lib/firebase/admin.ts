
import * as admin from 'firebase-admin';

export function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return;
  }
  
  const privateKey = process.env.ADMIN_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error('Firebase Admin SDK Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in environment variables. Please check your App Hosting secrets and configuration.');
  }
  if (!clientEmail) {
    throw new Error('Firebase Admin SDK Error: FIREBASE_CLIENT_EMAIL is not set in environment variables. Please check your App Hosting secrets and configuration.');
  }
  if (!privateKey) {
    throw new Error('Firebase Admin SDK Error: ADMIN_PRIVATE_KEY is not set in environment variables. Please check your App Hosting secrets and configuration.');
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error: any) {
    // Throw a more descriptive error to help with debugging
    throw new Error(`Firebase Admin initialization failed: ${error.message}. Make sure the service account credentials (client email and private key) are set correctly as secrets.`);
  }
}
