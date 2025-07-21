import { Artist, PostRegister, PreRegister } from "@/app/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { collection, doc, getDocs, limit, onSnapshot, query, setDoc, Timestamp, where } from "firebase/firestore";
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
        // profileImage: {
        //   id: user.uid,
        //   url: '/default_user.jpg', // Default profile image
        //   path: "",
        //   name: user.displayName || "Default Profile",
        //   type: "image/jpeg",
        //   size: 0,
        //   createdAt: Timestamp.now(),
        //   lastModified: Date.now(),
        // }
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

  console.log("Subscribing to user:", user);

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

export async function isUrlIdentifierAvailable(urlIdentifier: string): Promise<boolean> {
  try {
    const usersRef = collection(clientDb, 'users');
    const q = query(usersRef, where('urlIdentifier', '==', urlIdentifier));
    const querySnapshot = await getDocs(q);

    return querySnapshot.empty; // Returns true if available, false if taken
  } catch (error) {
    console.error("Error checking URL identifier:", error);
    return false;
  }
}


export async function updateArtist(artist: Artist) {
  const user = clientAuth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const docRef = doc(clientDb, 'users', user.uid);
  return await setDoc(docRef, { ...artist }, { merge: true });
}

export async function getUserByUrlIdentifier(urlIdentifier: string) {
  const getUserQuery = query(
    collection(clientDb, 'users'),
    where('urlIdentifier', '==', urlIdentifier),
    limit(1)
  );

  const querySnapshot = await getDocs(getUserQuery);
  if (querySnapshot.empty) {
    console.log('No such user!');
    return null;
  }
  const userDoc = querySnapshot.docs[0];
  return { userId: userDoc.id, ...userDoc.data() as Artist };
}

export async function deleteRowItem(artistId: string, rowId: string, itemId: string) {
  const docRef = doc(clientDb, 'users', artistId);
  const userDoc = await (await import("firebase/firestore")).getDoc(docRef);

  if (!userDoc.exists()) {
    throw new Error("User not found");
  }

  const userData = userDoc.data() as Artist;
  const updatedRows = userData.rows?.map(row => {
    if (row.id === rowId) {
      return { ...row, items: row.items?.filter(item => item.id !== itemId) };
    }
    return row;
  });

  return await setDoc(docRef, { rows: updatedRows }, { merge: true });
}