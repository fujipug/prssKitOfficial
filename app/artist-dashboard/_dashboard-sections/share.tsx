import { FileData } from "@/app/types";
import ShareButton from "@/components/share-button";
import { useAuth } from "@/lib/AuthContext";
import { useFormatter } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { PiDownloadSimple } from "react-icons/pi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Share({ translations }: { translations: any }) {
  const { artist } = useAuth();
  const format = useFormatter();

  const handleDownload = async (fileData: FileData) => {
    console.log("Downloading file:", fileData);
    try {
      const response = await fetch(fileData.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileData.name;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-4 lg:col-span-3">
          <div className="bg-base-200 border-base-300 rounded-box border p-4 flex flex-col items-center justify-center">

            <span className="rounded-box p-4 bg-white">
              <QRCodeSVG
                value="https://prsskit.com/"
                size={256}
                fgColor="#000000"
                level="M"
              />
            </span>

            <h1 className="text-3xl font-bold mt-4">{artist?.artistName}</h1>

            <span className="rounded-box py-2 px-3 bg-base-300 mt-2">
              <p className="text-sm font-mono">prsskit.com/{artist?.urlIdentifier}</p>
            </span>
          </div>
        </div>

        <div className="col-span-8 md:col-span-4 lg:col-span-5">
          <div className="bg-base-200 border-base-300 rounded-box border p-4">
            <h1 className="text-2xl font-bold mb-1">{translations['title']}</h1>
            <p className="text-sm mb-4">{translations['description']}</p>
            <ul className="list bg-base-100 rounded-box shadow">

              {artist?.assets
                ?.sort((a, b) => b.lastModified - a.lastModified)?.slice(0, 5) // Take only first 5
                ?.map((asset, index) => (
                  <li className="list-row" key={asset.name + index}>
                    <div><img className="size-10 rounded-box" src={asset.url} /></div>
                    <div>
                      <p>{asset.name}</p>
                      <p className="text-xs uppercase font-semibold opacity-60">
                        {format.dateTime(new Date(asset.lastModified))}
                      </p>

                      {/* <p className="text-xs uppercase font-semibold opacity-60">{asset.type}</p> */}
                    </div>
                    <div className="tooltip" data-tip="Share">
                      <ShareButton
                        url={asset.url}
                        title={asset.name}
                        text={`Check out this asset: ${asset.name}`}
                      />
                    </div>
                    <div className="tooltip" data-tip="Download">
                      <button className="btn btn-square btn-ghost" onClick={() => handleDownload(asset)}>
                        <PiDownloadSimple size={22} />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}