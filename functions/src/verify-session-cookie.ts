import { onCall } from "firebase-functions/https";
import { adminAuth, cors } from "./main";

export const verifySessionCookie = onCall({ cors }, async (request) => {
  const sessionCookie = request.data?.sessionCookie;
  if (!sessionCookie) {
    throw new Error("No session cookie provided");
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    return { success: true, uid: decodedClaims.uid };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
});
