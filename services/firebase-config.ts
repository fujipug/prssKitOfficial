import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.PRSS_KIT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const clientApp = initializeApp(firebaseConfig);
const clientDb = getFirestore(clientApp);
const clientStorage = getStorage(clientApp);
const clientFunctions = getFunctions(clientApp);
const clientAuth = getAuth(clientApp);

export { clientDb, clientStorage, clientFunctions, clientAuth };

// Emulator
if (process.env.NODE_ENV == "development") {
  connectAuthEmulator(clientAuth, "http://127.0.0.1:9099")
  connectFunctionsEmulator(clientFunctions, "127.0.0.1", 5001)
  connectFirestoreEmulator(clientDb, "127.0.0.1", 8080)
  connectStorageEmulator(clientStorage, "127.0.0.1", 9199)
}