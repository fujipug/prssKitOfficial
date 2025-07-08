// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import {
//   authMiddleware,
//   redirectToHome,
//   redirectToLogin
// } from 'next-firebase-auth-edge';

// const PUBLIC_PATHS = ['/register', '/login', '/'];

export async function middleware() {
  //   return authMiddleware(request, {
  //     loginPath: '/api/verify-token',
  //     logoutPath: '/api/logout',
  //     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  //     cookieName: 'PRSSKIT_SESSION',
  //     cookieSignatureKeys: ['Key-Should-Be-at-least-32-bytes-in-length'],
  //     cookieSerializeOptions: {
  //       path: '/',
  //       httpOnly: true,
  //       secure: false, // Set this to true on HTTPS environments
  //       sameSite: 'lax' as const,
  //       maxAge: 12 * 60 * 60 * 24 // twelve days
  //     },
  //     serviceAccount: {
  //       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  //       clientEmail:
  //         process.env.PRSS_KIT_ADMIN_CLIENT_EMAIL || '',
  //       privateKey:
  //         process.env.PRSS_KIT_ADMIN_PRIVATE_KEY?.replace(/\\n/gm, '\n') || ''
  //     },
  //     enableMultipleCookies: true,
  //     enableCustomToken: false,
  //     debug: true,
  //     checkRevoked: true,
  //     authorizationHeaderName: 'Authorization',
  //     handleValidToken: async ({ token, decodedToken }, headers) => {
  //       // Authenticated user should not be able to access /login, /register and / routes
  //       console.log('Valid token received', token, decodedToken);
  //       if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
  //         return redirectToHome(request);
  //       }

  //       return NextResponse.next({
  //         request: {
  //           headers
  //         }
  //       });
  //     },
  //     handleInvalidToken: async (reason) => {
  //       console.info('Missing or malformed credentials', { reason });

  //       return redirectToLogin(request, {
  //         path: '/login',
  //         publicPaths: PUBLIC_PATHS
  //       });
  //     },
  //     handleError: async (error) => {
  //       console.error('Unhandled authentication error', { error });

  //       return redirectToLogin(request, {
  //         path: '/login',
  //         publicPaths: PUBLIC_PATHS
  //       });
  //     }
  //   });
  // }

  // export const config = {
  //   matcher: [
  //     '/api/verify-token',
  //     '/api/logout',
  //     '/',
  //     '/((?!_next|favicon.ico|api|.*\\.).*)'
  //   ]
};