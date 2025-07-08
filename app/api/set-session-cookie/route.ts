import { NextRequest, NextResponse } from 'next/server';
// import admin from 'firebase-admin';
import { adminAuth } from '../firebase-admin-config';

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') return new Response(null, { status: 405 });

  try {
    const { token } = await request.json();
    // const decodedIdToken = await getAuth().verifyIdToken(token);
    // Only process if the user just signed in in the last 5 minutes.
    // if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn });

    // Verify the token
    // const decodedToken = await getAuth().verifyIdToken(token);
    console.log('Setting session cookie sdfsdflskdf;lakfd;alsdkf:', await sessionCookie);

    // Set the cookie using NextResponse
    const response = new NextResponse(JSON.stringify({ success: true }), { status: 200 });
    response.cookies.set('prsskit_session', await sessionCookie, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: expiresIn / 1000,
      sameSite: 'lax',
    });

    return response;
    // }
    // A user that was not recently signed in is trying to set a session cookie.
    // To guard against ID token theft, require re-authentication.
    // return new NextResponse('Recent sign in required!', { status: 401 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), { status: 401 });
  }
}