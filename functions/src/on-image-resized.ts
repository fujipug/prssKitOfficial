import * as functions from 'firebase-functions';
import { onCustomEventPublished } from 'firebase-functions/v2/eventarc';
import { adminStorage, FileData, Row } from './main';
import { getDownloadURL } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

export const onImageResized = onCustomEventPublished(
  "firebase.extensions.storage-resize-images.v1.onSuccess",
  async (event) => {
    try {
      const thumbnailPath = event.data.outputs[0].value.outputFilePath;
      const imagePath = event.data.input.name;
      const bucket = adminStorage.bucket().file(thumbnailPath);
      const downloadURL = await getDownloadURL(bucket);
      const userId = event.data.input.name.split('/image')[0];

      await updateAssetInDatabase(userId, imagePath, thumbnailPath, downloadURL);

    } catch (error) {
      functions.logger.error('Error updating asset:', error);
      throw error;
    }
  }
);

async function updateAssetInDatabase(userId: string, imagePath: string, thumbnailPath: string, downloadURL: string) {
  const userRef = getFirestore().collection('users').doc(userId);
  const userDoc = (await userRef.get()).data();
  const assets = userDoc?.assets || [];
  const rows = userDoc?.rows || [];

  const updatedAssets = assets.map((asset: FileData) => {
    if (asset.path === imagePath) {
      return { ...asset, thumbnail: { path: thumbnailPath, url: downloadURL } };
    }
    return asset;
  });

  const updatedRows = rows.map((row: Row) => {
    return {
      ...row,
      items: row.items?.map((item: FileData) => {
        if (item.path === imagePath) {
          return { ...item, thumbnail: { path: thumbnailPath, url: downloadURL } };
        }
        return item;
      })
    };
  });

  await userRef.update({ assets: updatedAssets, rows: updatedRows });
}

