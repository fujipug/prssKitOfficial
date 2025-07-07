import { onCall, CallableRequest } from "firebase-functions/v2/https";
import { adminAuth, cors } from "./main";

export const createSessionCookie = onCall({ cors }, async (request: CallableRequest) => {
  const idToken = request.data?.idToken;
  if (!idToken) {
    throw new Error("No ID token provided");
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    if (!sessionCookie) {
      throw new Error("Failed to create session cookie");
    }

    return { success: true, sessionCookie };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
});