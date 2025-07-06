import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getFunctions } from 'firebase-admin/functions';

export const firebaseAdminConfig = {
  credential: cert('../prsskit-firebase-adminsdk.json')
};

function getAdminApp() {
  const SERVER_APP_NAME = 'serverApp';
  const apps = getApps();

  if (apps.length > 0) {
    return apps.find(app => app.name === SERVER_APP_NAME) || apps[0];
  }

  return initializeApp(
    firebaseAdminConfig,
    SERVER_APP_NAME
  );
}

const serverApp = getAdminApp();
const serverAuth = getAuth(serverApp);
const serverDb = getFirestore(serverApp);
const serverFunctions = getFunctions(serverApp);
const cors = [
  "https://www.prsskit.com",
  'https://prsskit.com',
  'http://localhost:3000'
]

export { serverAuth, serverDb, serverFunctions, cors };