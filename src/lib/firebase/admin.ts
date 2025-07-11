
import * as admin from 'firebase-admin';

export function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return;
  }
  
  // Use lowercase secret names as required by the hosting environment.
  const privateKey = process.env.admin_private_key;
  const clientEmail = process.env.firebase_client_email;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error('Firebase Admin SDK Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in environment variables. Please check your App Hosting secrets and configuration.');
  }
  if (!clientEmail) {
    throw new Error('Firebase Admin SDK Error: firebase_client_email is not set in environment variables. Please check your App Hosting secrets and configuration.');
  }
  if (!privateKey) {
    throw new Error('Firebase Admin SDK Error: admin_private_key is not set in environment variables. Please check your App Hosting secrets and configuration.');
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
