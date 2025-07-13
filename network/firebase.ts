import { Artist, PostRegister, PreRegister } from "@/app/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { clientDb, clientAuth } from "@/services/firebase-config";
import fileSortTypeUpload from "@/utils/file-sort-type-upload";

export const firebaseRegister = async (email: string, password: string, preRegister: PreRegister) => {
  return await createUserWithEmailAndPassword(clientAuth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const uploadedPressKits = (preRegister.pressKits?.length ?? 0) > 0
        ? await fileSortTypeUpload(preRegister.pressKits ?? [], user.uid)
        : [];

      const uploadedAssets = (preRegister.assets?.length ?? 0) > 0
        ? await fileSortTypeUpload(preRegister.assets ?? [], user.uid)
        : [];

      const registerData: PostRegister = {
        artistName: preRegister.artistName,
        assets: uploadedPressKits.concat(uploadedAssets),
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
    // pressKits: postRegister.pressKits,
    assets: postRegister.assets,
    urlIdentifier: user.uid,
    // pressKitElementIndex: 0,
    rows: [{
      id: "press-kit",
      name: "Press Kit",
      index: 0,
      isShown: true,
      items: (postRegister.pressKits ?? []).length > 0 ? postRegister.pressKits : [],
    }],
    createdAt: Timestamp.now(),
  });
};

export const subscribeToCurrentUser = (
  onUserUpdate: (userData: { userId: string } & Artist) => void
) => {
  const user = clientAuth.currentUser;

  if (!user) {
    onUserUpdate({ userId: "", ...({} as Artist) });
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
  return await clientAuth.signOut();
}


export async function updateArtist(artist: Artist) {
  const user = clientAuth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const docRef = doc(clientDb, 'users', user.uid);
  return await setDoc(docRef, { ...artist }, { merge: true });
}