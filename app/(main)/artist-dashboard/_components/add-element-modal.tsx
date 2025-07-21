import { useAuth } from "@/lib/AuthContext";
import { updateArtist } from "@/network/firebase";
import AssetsFolderSvg from "@/utils/assets-folder-svg";
import fileSortTypeUpload from "@/utils/file-sort-type-upload";
import UploadFilesSvg from "@/utils/upload-files-svg";
import { motion } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { PiAppleLogo, PiArrowLeft, PiLink, PiSoundcloudLogo, PiSpotifyLogo, PiYoutubeLogo } from "react-icons/pi";
import { UrlItemSorter } from "./url-item-sorter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddElementModal({ translations, dialogRef, rowId, children }: { translations: any; dialogRef?: (ref: RefObject<HTMLDialogElement | null>) => void; rowId?: string; children?: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSecondary, setShowSecondary] = useState(false);
  const { firebaseUser, artist } = useAuth();
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    if (modalRef.current && typeof dialogRef === 'function') {
      dialogRef(modalRef);
    }
  }, [dialogRef, modalRef]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    return await fileSortTypeUpload(Array.from(files), firebaseUser.uid).then(async (results) => {
      const rows = artist.rows;
      let assets = results;
      assets = assets.filter((asset) => !artist.assets?.some((existingAsset) => existingAsset.path === asset.path));

      const elementObject = !rowId
        ? // create a new row with the uploaded files in the items array
        [...(artist.rows || []),
        {
          id: crypto.randomUUID(),
          name: "Untitled",
          index: rows ? rows.length : 0,
          isShown: true,
          items: results,
        }]
        : // get the selected row and add the uploaded files to items array along with existing items
        rows?.map((row) => {
          if (row.id === rowId) {
            return {
              ...row,
              items: [...(row.items || []), ...results],
            };
          }
          return row;
        });

      const updatedArtist = {
        ...artist,
        assets: [...(artist.assets || []), ...assets],
        rows: elementObject,
      };

      // clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return await updateArtist(updatedArtist);
    }).catch((error) => {
      console.error("Error uploading files:", error);
    });
  };

  const urlScanner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get("url") as string | null;

    // Check if the URL is valid
    if (!url || !/^https?:\/\/.+/.test(url)) {
      console.error("Invalid URL");
      return;
    }

    if (url) {
      setUrlInput(url);
      setShowSecondary(true);
    }
  };

  return (
    <>
      <input type="file" multiple max={4} accept="image/*,video/*,audio/*,.pdf,.docx" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
      {children}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`${showSecondary ? 'hidden' : 'w-full'}`}>
            <form onSubmit={urlScanner}>
              <fieldset className={`fieldset bg-base-300 rounded-box p-4 mb-4`}>
                <legend className="fieldset-legend space-x-2">
                  <div className="size-8 bg-[#1DB954] flex justify-center items-center rounded-full text-white tooltip" data-tip="Spotify"><PiSpotifyLogo size={20} /></div>
                  <div className="size-8 bg-[#FA2D48] flex justify-center items-center rounded-full text-white tooltip" data-tip="Apple Music"><PiAppleLogo size={20} /></div>
                  <div className="size-8 bg-[#FF7700] flex justify-center items-center rounded-full text-white tooltip" data-tip="Sound Cloud"><PiSoundcloudLogo size={20} /></div>
                  <div className="size-8 bg-[#CD201F] flex justify-center items-center rounded-full text-white tooltip" data-tip="YouTube"><PiYoutubeLogo size={20} /></div>
                  <div className="size-8 bg-gray-600 flex justify-center items-center rounded-full text-white tooltip" data-tip="Link"><PiLink size={20} /></div>
                  {/* <span className="font-semibold"></span> */}
                </legend>
                <div className="join">
                  <input type="text" name="url" className="input w-full join-item" placeholder="Enter URL" />
                  <button type="submit" className="btn btn-primary join-item">Add</button>
                </div>
              </fieldset>
            </form>

            <div className="divider"></div>

            <div className="flex w-full">
              <div onClick={() => fileInputRef.current?.click()} className="card bg-base-300 hover:bg-base-200 rounded-box grid grow place-items-center p-4 cursor-pointer">
                <UploadFilesSvg className="size-32 text-primary" />
                <p className="text-center font-semibold mt-4">{translations['upload_files']}</p>
              </div>
              <div className="divider divider-horizontal">{translations['divider_text']}</div>
              <div onClick={() => setShowSecondary(true)} className="card bg-base-300 hover:bg-base-200 rounded-box grid grow place-items-center p-4 cursor-pointer">
                <AssetsFolderSvg className="size-32 text-primary" />
                <p className="text-center font-semibold mt-4">{translations['select_from_assets']}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`${showSecondary ? 'w-full' : 'hidden'}`}>
            <button onClick={() => setShowSecondary(false)} className="btn btn-ghost">
              <PiArrowLeft size={22} />
              <span className="ml-1">Back</span>
            </button>

            <UrlItemSorter url={urlInput} />
          </motion.div>

          <div className="modal-action justify-between">
            <button onClick={() => modalRef.current?.close()} className="btn btn-ghost">Close</button>
            {/* <button type="submit" className="btn btn-primary">Update</button> */}
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  )
}
