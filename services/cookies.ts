import { deleteSecureCookie, setSecureCookie } from '@/app/actions/cookie-actions';
import { clientFunctions, httpsCallable } from '../utils/firebase-config';
import { redirect } from 'next/navigation';

export function createSessionCookie(idToken: string) {
  httpsCallable(clientFunctions, 'createSessionCookie')({ idToken })
    .then((response) => {
      setSecureCookie(response.data as string).then(() => {
        redirect('/artist-dashboard');
      })
    })
    .catch((error) => {
      console.error("Error creating session cookie:", error);
      throw new Error('Failed to create session cookie: ' + (error instanceof Error ? error.message : 'Unknown error'));
    });
}

export function deleteSessionCookie() {
  deleteSecureCookie().then(() => {
    //TODO: Find a better way to handle redirects in Next.js
    // This is a workaround to ensure the redirect happens after the cookie is deleted
    // Using setTimeout to allow the cookie deletion to complete before redirecting
    setTimeout(() => {
      redirect('/login');
    }, 1000);
  }).catch((error) => {
    console.error("Error deleting session cookie:", error);
  });
}
