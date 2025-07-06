import { Artist, FileData, PostRegister, PreRegister } from "@/app/types";
import { uploadFile } from "@/lib/file-uploader";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { clientDb, clientAuth } from "@/services/firebase-config";

export const firebaseRegister = async (email: string, password: string, preRegister: PreRegister) => {
  return await createUserWithEmailAndPassword(clientAuth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const uploadedPressKits = preRegister.pressKits
        ? await Promise.all(preRegister.pressKits.map(async (file: File) => {
          try {
            const res = await uploadFile(file, user.uid, 'press-kits');
            return {
              imgUrl: res.url,
              path: res.path,
              name: file.name,
              type: file.type,
              size: file.size,
              lastModified: file.lastModified,
            };
          } catch (error) {
            console.error('Error uploading file:', error);
            return null;
          }
        })).then(results => results.filter((item): item is FileData => item !== null))
        : undefined;

      const uploadedAssets = preRegister.assets
        ? await Promise.all(preRegister.assets.map(async (file: File) => {
          try {
            const res = await uploadFile(file, user.uid, 'assets');
            return {
              imgUrl: res.url,
              path: res.path,
              name: file.name,
              type: file.type,
              size: file.size,
              lastModified: file.lastModified,
            };
          } catch (error) {
            console.error('Error uploading file:', error);
            return null;
          }
        })).then(results => results.filter((item): item is FileData => item !== null))
        : undefined;

      const registerData: PostRegister = {
        artistName: preRegister.artistName,
        pressKits: uploadedPressKits,
        assets: uploadedAssets
      };

      await createUserInFirestore(user, registerData);
      return user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
}

export const firebaseSignIn = async (credentials: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(clientAuth, credentials.email, credentials.password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}

const createUserInFirestore = async (user: User, postRegister: PostRegister) => {
  const docRef = doc(clientDb, 'users', user.uid);
  return await setDoc(docRef, {
    email: user.email,
    artistName: postRegister.artistName,
    pressKits: postRegister.pressKits,
    assets: postRegister.assets,
    urlIdentifier: user.uid,
    pressKitElementIndex: 0,
    createdAt: Timestamp.now(),
  });
};

export const subscribeToCurrentUser = (
  onUserUpdate: (userData: { userId: string } & Artist | null) => void
) => {
  const user = clientAuth.currentUser;

  if (!user) {
    onUserUpdate(null);
    return () => { }; // No-op cleanup
  }

  const unsubscribe = onSnapshot(
    doc(clientDb, "users", user.uid),
    (doc) => {
      onUserUpdate({ userId: doc.id, ...doc.data() as Artist });
    },
    (error) => {
      console.error("Error fetching user data:", error);
    }
  );

  return unsubscribe;
};

export const firebaseSignOut = async () => {
  return await clientAuth.signOut()
    .then(async () => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.log('Error signing out: ', error);
    });
}
