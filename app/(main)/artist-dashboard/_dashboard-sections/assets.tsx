// import MaskedDiv from "@/components/masked-div";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { useFormatter } from "next-intl";
import { PiCalendarPlusDuotone, PiDotsThreeOutlineVerticalFill, PiDownloadSimple, PiInfo, PiMagnifyingGlass, PiPencilSimpleLine, PiShare, PiTrash } from "react-icons/pi";
import formatBytes from "@/utils/format-bytes";
import { FileData } from "@/app/types";
import { deleteFile } from "@/services/file-manager";
import { updateArtist } from "@/network/firebase";
import { useRef } from "react";
import fileSortTypeUpload from "@/utils/file-sort-type-upload";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Assets({ translations }: { translations: any }) {
  const { artist } = useAuth();
  const format = useFormatter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(translations);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    await fileSortTypeUpload(Array.from(files), artist.id)
      .then(async (uploadedFiles: FileData[]) => {
        artist.assets = [...(artist.assets || []), ...uploadedFiles];
        return await updateArtist(artist);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });

    fileInputRef.current!.value = ''; // Clear the input after upload
  };

  const handleDeleteAsset = async (asset: FileData) => {
    await deleteFile(asset.path);
    if (asset.thumbnail?.path) await deleteFile(asset.thumbnail?.path);
    artist.assets = artist.assets?.filter((a) => a.id !== asset.id);
    await updateArtist(artist);
  };

  return (
    <div className="min-h-screen">
      <form className="flex justify-center items-center">
        <fieldset className={`fieldset bg-base-300 rounded-box p-4 mb-4 w-full md:w-3/4`}>
          <div className="join">
            <label className="input join-item w-full">
              <PiMagnifyingGlass className="opacity-50" />
              <input type="search" name="search" className="grow" placeholder="Search" />
            </label>
            <button type="submit" className="btn btn-primary join-item">Search</button>
          </div>
        </fieldset>
      </form>

      <div className="flex justify-center items-center mb-4">
        <div className="bg-base-300 rounded-box p-4 space-x-4">
          <select defaultValue="Type" className="select select-sm w-32">
            <option disabled={true}>Type</option>
            <option>Image</option>
            <option>Video</option>
            <option>Audio</option>
          </select>

          <select defaultValue="Created" className="select select-sm w-32">
            <option disabled={true}>Created</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {/* <button className="btn btn-primary btn-lg absolute top-4 left-4 z-10">Upload</button> */}
        {artist?.assets?.map((asset) => (
          <div key={asset.id} className="card bg-base-200 w-full shadow-sm">
            <figure className="relative">
              <button className="btn btn-md btn-circle btn-accent absolute shadow right-2 top-2 z-10"
                popoverTarget={`popover-asset-menu-${asset.id}`}
                style={{ anchorName: `--anchor-asset-menu-${asset.id}` } as React.CSSProperties}>
                <PiDotsThreeOutlineVerticalFill size={20} />
              </button>

              <ul className="dropdown menu rounded-box bg-base-100 shadow-sm dropdown-bottom dropdown-end mt-1"
                popover="auto" id={`popover-asset-menu-${asset.id}`}
                style={{ positionAnchor: `--anchor-asset-menu-${asset.id}` } as React.CSSProperties}>
                <li><a className="items-center"><PiDownloadSimple className="mr-1" size={16} />Download</a></li>
                <li><a className="items-center"><PiPencilSimpleLine className="mr-1" size={16} />Rename</a></li>
                <li><a className="items-center"><PiShare className="mr-1" size={16} />Share</a></li>
                <li><a className="items-center"><PiInfo className="mr-1" size={16} />File info</a></li>
                <li onClick={() => handleDeleteAsset(asset)}><a className="text-error-content bg-error items-center"><PiTrash className="mr-1" size={16} />Delete</a></li>
              </ul>

              <Image
                src={asset.thumbnail?.url || asset?.url}
                alt={asset.name}
                // layout="responsive"
                width={200}
                height={200}
                className="object-cover h-64 w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {asset?.name}
              </h2>

              <div className="flex items-center space-x-2">
                <p>{formatBytes(asset?.size)}</p>
                <div className="flex space-x-1 items-center">
                  <PiCalendarPlusDuotone />
                  <span>{format.dateTime(new Date(asset.createdAt?.seconds * 1000))}</span>
                </div>
              </div>

              <div className="card-actions justify-end">
                <div className="badge badge-secondary">{asset?.type}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <input multiple max={4} accept="image/*,video/*,audio/*,.pdf,.docx" ref={fileInputRef} onChange={(e) => handleFileChange(e)} type="file" className="hidden" />
      <button onClick={() => fileInputRef.current?.click()} className="btn btn-primary btn-lg rounded-full fixed bottom-8 right-8 z-10 shadow-2xl">Upload</button>
    </div >
  );
}