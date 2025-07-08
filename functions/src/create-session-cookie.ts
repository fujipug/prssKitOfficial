import { onCall } from "firebase-functions/v2/https";
import { cors } from "./main";
import { adminAuth } from "./main";

export const createSessionCookie = onCall({ cors }, async (req) => {
  const idToken = req.data.idToken;
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    console.log('Session cookie created:', sessionCookie);
    // res.setHeader('Set-Cookie', `PRSSKIT_SESSION=${sessionCookie}; HttpOnly; Path=/; Max-Age=${expiresIn / 1000}; SameSite=Lax`);
    // const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    // res?.cookie('session', sessionCookie, options);
    // res?.end(JSON.stringify({ status: 'success' }));
    // return { status: 'success', sessionCookie };
  } catch (error) {
    throw new Error('UNAUTHORIZED REQUEST!' + (error instanceof Error ? `: ${error.message}` : ''));
  }
});