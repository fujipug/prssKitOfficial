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

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('prsskit_session');
  const protectedRoutes = ['/artist-dashboard'];
  const ignoredRoutes = ['_next', '_api'].concat(protectedRoutes);

  const path = request.nextUrl.pathname;

  if (sessionCookie && !ignoredRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/artist-dashboard', request.url));
  }

  if (!sessionCookie && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/artist-dashboard', '/'],
}