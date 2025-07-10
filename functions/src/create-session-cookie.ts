import { onCall } from "firebase-functions/v2/https";
import { adminAuth, cors } from "./main";

export const createSessionCookie = onCall({ cors }, async (req) => {
  const idToken = req.data.idToken;
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    return sessionCookie;
  } catch (error) {
    throw new Error('UNAUTHORIZED REQUEST!' + (error instanceof Error ? `: ${error.message}` : ''));
  }
});
