import { onCall } from "firebase-functions/v2/https";
import { cors } from "./main";
import { adminAuth } from "./main";

// export const createSessionCookie = onCall({ cors }, async (request: CallableRequest) => {
//   const uid = request.auth?.uid;
//   if (!uid) {
//     throw new Error("No user ID provided");
//   }

//   try {
//     const sessionCookie = await adminAuth.createCustomToken(uid);

//     if (!sessionCookie) {
//       throw new Error("Failed to create custom token");
//     }

//     return { success: true, sessionCookie };
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     throw new Error(errorMessage);
//   }
// });

export const createSessionCookie = onCall({ cors }, async (req) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.data.idToken.toString();
  const csrfToken = req.data.csrfToken.toString();
  // Guard against CSRF attacks.
  if (csrfToken !== req.data.csrfToken) {
    throw new Error('UNAUTHORIZED REQUEST!');
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  // adminAuth
  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    // You cannot set cookies directly in a Callable Function response.
    // Instead, return the session cookie to the client and let the client set it.
    return { status: 'success', sessionCookie };
  } catch (error) {
    throw new Error('UNAUTHORIZED REQUEST!' + (error instanceof Error ? `: ${error.message}` : ''));
  }
});