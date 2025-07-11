'use server';
import { cookies } from 'next/headers';

export async function setSecureCookie(cookie: string) {
  const cookieStore = await cookies();
  await cookieStore.set("sessionCookie", cookie, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === 'production',
    path: "/",
    maxAge: 60 * 60 * 24 * 5
  });
}

export async function deleteSecureCookie() {
  const cookieStore = await cookies();
  await cookieStore.delete("sessionCookie");
}