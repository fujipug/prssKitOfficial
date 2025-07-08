import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
// import { getFirestore } from 'firebase-admin/firestore';
// import { getFunctions } from 'firebase-admin/functions';

export const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.PRSS_KIT_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.PRSS_KIT_ADMIN_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
  })
};

const SERVER_APP_NAME = 'adminApp';
const apps = getApps();

function getAdminApp() {
  if (apps.length > 0) {
    return apps.find(app => app.name === SERVER_APP_NAME) || apps[0];
  }

  return initializeApp(
    firebaseAdminConfig,
    SERVER_APP_NAME
  );
}

const adminApp = getAdminApp();
const adminAuth = getAuth(adminApp);
// const serverDb = getFirestore(serverApp);
// const serverFunctions = getFunctions(serverApp);
const cors = [
  'https://www.prss-kit-official.vercel.app',
  'https://prss-kit-official.vercel.app',
  "https://www.prsskit.com",
  'https://prsskit.com',
  'http://localhost:3000'
]

export { adminAuth, cors };