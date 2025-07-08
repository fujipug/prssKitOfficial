'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { firebaseRegister, firebaseSignIn, firebaseSignOut, subscribeToCurrentUser } from "@/network/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { PreRegister, Artist } from "@/app/types";
// import { deleteSessionCookie } from "@/actions/auth";
import { clientAuth } from "@/services/firebase-config";
// import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  isSignedIn: boolean;
  firebaseUser: User | null;
  profile: Artist | null;
  isLoading: boolean;
  register: (params: { email: string; password: string; preRegister: PreRegister }) => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}>({
  isSignedIn: false,
  firebaseUser: null,
  profile: null,
  isLoading: true,
  register: async () => { },
  signIn: async () => { },
  signOut: async () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Artist | null>(null);

  useEffect(() => {
    onAuthStateChanged(clientAuth, (user) => {
      setIsLoading(true);

      if (user) {
        setIsSignedIn(true);
        setFirebaseUser(user);
      } else {
        setIsSignedIn(false);
        setFirebaseUser(null);
      }

      setIsLoading(false);
    });
  }, [clientAuth]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const subscribe = async () => {
      unsubscribe = await subscribeToCurrentUser(setProfile);
    };

    subscribe();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebaseUser]);

  const register = async ({ email, password, preRegister }: { email: string; password: string; preRegister: PreRegister }) => {
    await firebaseRegister(email, password, preRegister);
  }

  const signIn = async (credentials: { email: string; password: string }) => {
    const user = await firebaseSignIn(credentials);

    if (!user) {
      throw new Error('Sign in failed');
    }

    await setSessionCookie(await user.getIdToken());

    // await httpsCallable(clientFunctions, 'createSessionCookie')({
    //   idToken: await user.getIdToken(),
    //   // csrfToken: 'your-csrf-token', // Optional, if you implement CSRF protection
    // }).then(async () => {
    //   await setSessionCookie(await user.getIdToken());
    // });
  };

  const signOut = async () => {
    const user = await firebaseSignOut();

    // delete the session cookie

    return user;
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, firebaseUser, profile, isLoading, register, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const setSessionCookie = async (token: string) => {
  const baseurl = process.env.NODE_ENV === 'production' ? 'https://prss-kit-official.vercel.app' : 'http://localhost:3000';
  const response = await fetch(`${baseurl}/api/set-session-cookie`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Failed to set session cookie');
  }

  console.log('Session cookie created successfully');
  window.location.href = '/artist-dashboard'
}
