import { cookies } from 'next/headers';

export interface Session {
  id: string;
  role: "DIETITIAN" | "CLIENT";
}

/**
 * Reads the session cookie set during login ('nutrilife_session')
 * and returns the logged-in user's id + role, or null if not logged in.
 */
export function getSession(): Session | null {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('nutrilife_session');

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const parsed = JSON.parse(sessionCookie.value);

    if (!parsed?.id || !parsed?.role) {
      return null;
    }

    return parsed as Session;
  } catch (error) {
    console.error("Error reading authentication session cookie:", error);
    return null;
  }
}