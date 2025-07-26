'use client';
import { createContext, useState, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { firebaseRegister, firebaseSignIn, firebaseSignOut, subscribeToCurrentUser } from "@/network/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { PreRegister, Artist } from "@/app/types";
import { clientAuth } from "@/utils/firebase-config";
import { createSessionCookie, deleteSessionCookie } from "@/services/cookies";

const AuthContext = createContext<{
  isSignedIn: boolean;
  firebaseUser: User;
  artist: Artist;
  isLoading: boolean;
  register: (params: { email: string; password: string; preRegister: PreRegister }) => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}>({
  isSignedIn: false,
  firebaseUser: {} as User,
  artist: {} as Artist,
  isLoading: false,
  register: async () => { },
  signIn: async () => { },
  signOut: async () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState<Artist>({} as Artist);

  useEffect(() => {
    onAuthStateChanged(clientAuth, (user) => {
      setIsLoading(true);

      if (user) {
        setIsSignedIn(true);
        setFirebaseUser(user);
      } else {
        setIsSignedIn(false);
        setFirebaseUser({} as User);
      }

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToCurrentUser(setArtist);
    return () => unsubscribe(); // Cleanup on unmount
  }, [firebaseUser]);

  const register = async ({ email, password, preRegister }: { email: string; password: string; preRegister: PreRegister }) => {
    const user = await firebaseRegister(email, password, preRegister);

    if (!user) {
      throw new Error('Sign in failed');
    }

    // Create a session cookie after signing in
    const idToken = await user?.getIdToken();
    await createSessionCookie(idToken);
  }

  const signIn = async (credentials: { email: string; password: string }) => {
    const user = await firebaseSignIn(credentials);

    if (!user) {
      throw new Error('Sign in failed');
    }

    // Create a session cookie after signing in
    const idToken = await user?.getIdToken();
    await createSessionCookie(idToken);
  }

  const signOut = async () => {
    await firebaseSignOut();

    // Delete the session cookie after signing out
    await deleteSessionCookie()
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, firebaseUser, artist, isLoading, register, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
