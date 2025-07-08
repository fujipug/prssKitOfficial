'use server';
export async function createSessionCookie(token: string, expiresIn: number) {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await import('@/services/firebase-admin-config')
    .then(({ adminAuth }) => {
      return adminAuth.createSessionCookie(token, { expiresIn });
    })
    .catch((error) => {
      console.error("Error creating session cookie:", error);
      return null;
    });

  if (sessionCookie) {
    cookieStore.set("PRSSKIT_SESSION", sessionCookie, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn
    });
  }

  return sessionCookie;
}
