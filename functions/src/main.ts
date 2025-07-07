import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth";

const adminApp = initializeApp();
const adminAuth = getAuth(adminApp);
const cors = [
  'https://www.prss-kit-official.vercel.app',
  'https://prss-kit-official.vercel.app',
  "https://www.prsskit.com",
  'https://prsskit.com',
  'http://localhost:3000'
]

export { adminAuth, cors }