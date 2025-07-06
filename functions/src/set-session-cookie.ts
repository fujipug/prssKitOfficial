import { onCall } from "firebase-functions/v2/https";
import { cors } from "./main";
import { serverAuth } from "./main";

export const setSessionCookie = onCall({ cors }, async (request) => {
  const idToken = request.data.idToken;
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds

  if (!request.auth) {
    throw new Error("Unauthorized");
  }

  if (!idToken) {
    throw new Error("No ID token provided");
  }

  try {
    const sessionCookie = await serverAuth.createSessionCookie(idToken, { expiresIn });

    if (!sessionCookie) {
      throw new Error("Failed to create session cookie");
    }

    const options = {
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: false, // Enable in production
      sameSite: "lax" as const,  // Adjust as needed
      path: '/',
    };

    return {
      sessionCookie,
      options
    };
  } catch (error) {
    throw new Error("Failed to create session cookie: " + error);
  }
});