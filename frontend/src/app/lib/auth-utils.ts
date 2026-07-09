import { cookies } from 'next/headers';

/**
 * Authentically extracts the active Dietitian's ID from the secure session cookie.
 * Returns the string ID if logged in, or null if unauthenticated.
 */
export function getDietitianSession(): string | null {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('dietitian_session');

    // If the cookie doesn't exist or is completely blank, they aren't logged in
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    // Return the secure dietitian ID string saved inside the cookie
    return sessionCookie.value;
  } catch (error) {
    console.error("Error reading authentication session cookie:", error);
    return null;
  }
}