// import { serverAuth } from '@/functions/src/firebase-admin';
// import { cookies } from 'next/headers';

// export async function isUserSignedIn() {
//   const cookieStore = await cookies();
//   const sessionCookie = cookieStore.get('session')?.value;
//   console.log('Session cookie:', sessionCookie);
//   if (!sessionCookie) return false;

//   try {
//     await serverAuth.verifySessionCookie(sessionCookie, true);
//     return true;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return false;
//   }
// }