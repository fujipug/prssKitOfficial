import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'

// import { cookies } from "next/headers";
import { adminAuth } from "@/services/firebase-admin-config";

export async function GET(request: NextRequest) {
  const token = await request.headers.get("Authorization")?.replace("Bearer ", "");

  console.log("Received token:", token);

  if (!token) {
    return NextResponse.json({ message: "Authorization token missing" }, { status: 400 });
  }

  // const cookieStore = await cookies();
  const expiresIn = 12 * 60 * 60 * 24; // twelve days
  // const session = await adminAuth.createSessionCookie(await token, { expiresIn }).then((session) => {
  //   console.log("Session cookie created successfully");
  //   return session;
  // }).catch((error) => {
  //   console.error("Error creating session cookie:", error);
  //   return null;
  // });

  // console.log("Session cookie:", session);

  // cookieStore.set("PRSSKIT_SESSION", session, {
  //   httpOnly: true,
  //   sameSite: "lax",
  //   path: "/",
  //   maxAge: expiresIn
  // });
  console.log("Verifying token with adminAuth...", token);
  const test = await adminAuth.verifyIdToken(token); // Ensure the adminAuth app is initialized
  return NextResponse.json({ appName: { test } }, { status: 200 });
  // return NextResponse.json({ message: "Session cookie created successfully" }, { status: 200 });
}
