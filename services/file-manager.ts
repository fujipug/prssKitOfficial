import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { clientStorage } from "./firebase-config";

export const uploadFile = async (file: File, userId: string, path?: string) => {
  try {
    const storagePath = `${userId}/${path ? path + '/' : ''}${file.name}`;
    const storageRef = ref(clientStorage, storagePath);

    // Upload file
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    return {
      url: downloadURL,
      path: storagePath
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (filePath: string) => {
  const deleteFilePath = `gs://prsskit.firebasestorage.app/${filePath}`;
  try {
    const fileRef = ref(clientStorage, deleteFilePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const getFileUrl = async (filePath: string) => {
  try {
    const fileRef = ref(clientStorage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};