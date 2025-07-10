// import type { NextRequest } from "next/server";
// import { authMiddleware } from "next-firebase-auth-edge";

// export async function middleware(request: NextRequest) {
//   return authMiddleware(request, {
//     loginPath: "/api/login",
//     logoutPath: "/api/logout",
//     apiKey: "XXxxXxXXXxXxxxxx_XxxxXxxxxxXxxxXXXxxXxX",
//     cookieName: "prsskit_session",
//     cookieSignatureKeys: ["Key-Should-Be-at-least-32-bytes-in-length"],
//     cookieSerializeOptions: {
//       path: "/",
//       httpOnly: true,
//       secure: false, // Set this to true on HTTPS environments
//       sameSite: "lax" as const,
//       maxAge: 12 * 60 * 60 * 24, // Twelve days
//     },
//     serviceAccount: {
//       projectId: "your-firebase-project-id",
//       clientEmail: "firebase-adminsdk-nnw48@your-firebase-project-id.iam.gserviceaccount.com",
//       privateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
//     },
//   });
// }

// export const config = {
//   matcher: ["/api/login", "/api/logout", "/", "/((?!_next|favicon.ico|api|.*\\.).*)"],
// };

import { NextResponse, NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/artist-dashboard'];
const PUBLIC_ROUTES = ['/_next', '/login', '/register', '/'];

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('PRSSKIT_SESSION') !== undefined;
  const path = request.nextUrl.pathname;

  // If not authenticated and trying to access a protected route, redirect to login
  if (!sessionCookie && PROTECTED_ROUTES.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access a public route, redirect to dashboard
  if (sessionCookie && PUBLIC_ROUTES.includes(path)) {
    return NextResponse.redirect(new URL('/artist-dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...PROTECTED_ROUTES, ...PUBLIC_ROUTES],
}