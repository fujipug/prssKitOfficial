import { FileData } from "@/app/types";
import { uploadFile } from "@/services/file-manager";
import { Timestamp } from "firebase/firestore";

async function fileSortTypeUpload(files: File[], userId: string): Promise<FileData[]> {
  if (!files || files.length === 0) {
    throw new Error("No files provided for sorting.");
  }

  const sortedFiles: Record<string, File[]> = {
    images: [],
    videos: [],
    audio: [],
    documents: []
  };

  for (const file of files) {
    const fileType = file.type.split('/')[0];
    const applicationType = file.type.split('/')[1];

    if (fileType === 'image') {
      sortedFiles.images.push(file);
    } else if (fileType === 'video') {
      sortedFiles.videos.push(file);
    } else if (fileType === 'audio') {
      sortedFiles.audio.push(file);
    } else if (applicationType === 'pdf' || applicationType === 'docx') {
      sortedFiles.documents.push(file);
    } else {
      throw new Error("Unsupported file type. Only images, videos, audio files, and specific application files (pdf, docx) are allowed.");
    }
  }

  // Upload all sorted files
  const uploadPromises = Object.entries(sortedFiles).flatMap(([, files]) => {
    return files.map(file => {
      const { name, type, size, lastModified } = file;
      return uploadFile(file, userId, type.split('/')[0]).then(result => ({
        ...result,
        id: crypto.randomUUID(),
        createdAt: Timestamp.now(),
        name,
        type,
        size,
        lastModified
      }));
    });
  });

  const results = await Promise.all(uploadPromises);

  return results;
}

export default fileSortTypeUpload;