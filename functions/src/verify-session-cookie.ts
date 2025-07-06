import { HttpsError, onCall } from "firebase-functions/https";
import { cors } from "./main";
// import { cookies } from "next/headers";

export const verifySessionCookie = onCall({ cors }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to verify session');
  }

  try {
    // const sessionCookie = (await cookies()).get("session")?.value;

    // if (!sessionCookie) {
    //   throw new HttpsError('invalid-argument', 'No session cookie provided');
    // }

    // const decodedClaims = await serverAuth.verifySessionCookie(
    //   sessionCookie,
    //   true // check revoked
    // );

    // return decodedClaims;
  } catch (error) {
    throw new HttpsError('unauthenticated', 'Invalid session cookie', error);
  }
});