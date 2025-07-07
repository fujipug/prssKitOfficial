import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { serverAuth } from "@/services/firebase-admin-config";

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "No session cookie found" },
        { status: 401 }
      );
    }

    // const result = await serverAuth.verifySessionCookie(sessionCookie);

    // return NextResponse.json(result.data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Session verification failed" },
      { status: 500 }
    );
  }
}