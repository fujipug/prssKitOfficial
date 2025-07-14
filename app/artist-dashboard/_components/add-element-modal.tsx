import { useAuth } from "@/lib/AuthContext";
import { updateArtist } from "@/network/firebase";
import AssetsFolderSvg from "@/utils/assets-folder-svg";
import fileSortTypeUpload from "@/utils/file-sort-type-upload";
import UploadFilesSvg from "@/utils/upload-files-svg";
import { useRef, useState } from "react";
import { PiArrowLeft, PiPlus, PiRowsPlusBottom } from "react-icons/pi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddElementModal({ translations, rowId, modalButtonText }: { translations: any; rowId?: string; modalButtonText?: string; }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAssets, setShowAssets] = useState(false);
  const { firebaseUser, artist } = useAuth();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    return await fileSortTypeUpload(Array.from(files), firebaseUser.uid).then(async (results) => {
      const rows = artist.rows;

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
        assets: [...(artist.assets || []), ...results],
        rows: elementObject,
      };

      return await updateArtist(updatedArtist);
    }).catch((error) => {
      console.error("Error uploading files:", error);
    });
  };

  return (
    <>
      <input type="file" multiple max={4} accept="image/*,video/*,audio/*,.pdf,.docx" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
      {typeof rowId !== "string" ? (
        <button onClick={() => modalRef.current?.showModal()} className="btn btn-primary btn-lg btn-block mb-4">
          <PiRowsPlusBottom size={22} />
          <span className="ml-1">{modalButtonText || 'Add new item'}</span>
        </button>
      ) : (
        <button onClick={() => modalRef.current?.showModal()} className="btn btn-dash size-24">
          <PiPlus size={22} />
        </button>
      )}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className={`${showAssets ? 'hidden' : 'flex w-full'}`}>
            <div onClick={() => fileInputRef.current?.click()} className="card bg-base-300 hover:bg-base-200 rounded-box grid grow place-items-center p-4 cursor-pointer">
              <UploadFilesSvg className="size-32 text-primary" />
              <p className="text-center font-semibold mt-4">{translations['upload_files']}</p>
            </div>
            <div className="divider divider-horizontal">{translations['divider_text']}</div>
            <div onClick={() => setShowAssets(true)} className="card bg-base-300 hover:bg-base-200 rounded-box grid grow place-items-center p-4 cursor-pointer">
              <AssetsFolderSvg className="size-32 text-primary" />
              <p className="text-center font-semibold mt-4">{translations['select_from_assets']}</p>
            </div>
          </div>

          <button onClick={() => setShowAssets(false)} className={`${showAssets ? 'btn btn-ghost' : 'hidden'}`}>
            <PiArrowLeft size={22} />
            <span className="ml-1">Back</span>
          </button>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
