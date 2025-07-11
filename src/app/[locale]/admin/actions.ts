'use server';

// Admin actions are disabled due to backend configuration removal.

export async function login(idToken: string | undefined) {
  console.error('Admin login is currently disabled.');
  return { success: false, message: 'Admin login is currently disabled.' };
}

export async function logout() {
  console.error('Admin logout is currently disabled.');
}
