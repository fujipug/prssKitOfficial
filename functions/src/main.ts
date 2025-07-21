import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

admin.initializeApp({
  // serviceAccountId: process.env.PRSS_KIT_ADMIN_CLIENT_EMAIL,
  storageBucket: 'prsskit.firebasestorage.app',
});

interface Thumbnail {
  url: string;
  path: string;
}

interface Row {
  id: string;
  index: number;
  isShown: boolean;
  items?: FileData[];
  name: string;
}

interface FileData {
  id: string;
  url: string;
  path: string;
  name: string;
  type: string;
  size: number;
  createdAt: Timestamp;
  lastModified: number;
  thumbnail?: Thumbnail;
}

const adminAuth = getAuth(admin.app());
const adminStorage = getStorage(admin.app());
const adminFirestore = getFirestore(admin.app());

const cors = [
  'https://www.prss-kit-official.vercel.app',
  'https://prss-kit-official.vercel.app',
  "https://www.prsskit.com",
  'https://prsskit.com',
  'http://localhost:3000'
]

export { cors, admin, FileData, Row, adminAuth, adminStorage, adminFirestore };