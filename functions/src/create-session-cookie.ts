import { onCall } from "firebase-functions/v2/https";
import { cors, adminAuth } from "./main";

export const createSessionCookie = onCall({ cors }, async (req) => {
  const idToken = req.data.idToken;
  // TODO: This is causeing problems with sign in and sign out
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    return sessionCookie;
  } catch (error) {
    throw new Error('UNAUTHORIZED REQUEST!' + (error instanceof Error ? `: ${error.message}` : ''));
  }
});
