import { serverAuth } from '@/services/firebase-admin-config';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  console.log("Setting session cookie...", request);
  const { idToken } = await request.json();

  if (!idToken) {
    throw new Error("No ID token provided");
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
    const sessionCookie = await serverAuth.createSessionCookie(idToken, { expiresIn });

    if (!sessionCookie) {
      throw new Error("Failed to create session cookie");
    }

    (await cookies()).set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    (await cookies()).set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.prss-kit-official.vercel.app' : '.localhost',
    });

    return Response.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}