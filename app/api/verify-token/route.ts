import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/services/firebase-admin-config";
// import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const token = await request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "Authorization token missing" }, { status: 400 });
  }

  const test = await adminAuth.verifyIdToken(token).then((decodedToken) => {
    console.log("Token verified successfully:", decodedToken);
    return decodedToken;
  }).catch((error) => {
    console.error("Error verifying token:", error);
    return null;
  });

  return NextResponse.json({ message: "Token verification complete", decodedToken: test }, { status: 200 });

  // await adminAuth.verifyIdToken(token).then(async (decodedToken) => {
  //   console.log("Token verified successfully:", decodedToken);
  //   const cookieStore = await cookies();
  //   const expiresIn = 12 * 60 * 60 * 24; // twelve days
  //   const session = await adminAuth.createSessionCookie(await token, { expiresIn }).then((session) => {
  //     console.log("Session cookie created successfully");
  //     return session;
  //   }).catch((error) => {
  //     console.error("Error creating session cookie:", error);
  //     return null;
  //   });

  //   if (session) {
  //     cookieStore.set("PRSSKIT_SESSION", session, {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       maxAge: expiresIn
  //     });
  //   }
  //   return NextResponse.json({ message: "Session cookie created successfully", }, { status: 200 });
  // }).catch((error) => {
  //   console.error("Error verifying token:", error);
  //   return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  // });
}
