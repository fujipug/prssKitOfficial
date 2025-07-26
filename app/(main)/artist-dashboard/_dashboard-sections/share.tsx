'use client';
import { FileData } from "@/app/types";
import ShareButton from "@/components/share-button";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import { useFormatter } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { PiCopySimpleDuotone, PiDownloadSimple } from "react-icons/pi";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Share({ translations, showMore }: { translations: any, showMore: () => void }) {
  const { artist } = useAuth();
  const format = useFormatter();
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://prsskit.com/${artist?.urlIdentifier}`);
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
  };

  const handleDownload = async (asset: FileData) => {
    try {
      const response = await fetch(asset.url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = asset.name || 'download';
      a.style.display = 'none';

      // Clean up after the download starts
      a.addEventListener('click', () => {
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }, { once: true });

      document.body.appendChild(a);
      a.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <>
      {showCopyToast && (
        <div className="toast toast-top toast-center z-50 mt-22">
          <p className="alert alert-success text-lg">Copied to clipboard</p>
        </div>
      )}

      <div className="min-h-screen bg-base-100">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-8 md:col-span-4 lg:col-span-3">
            <div className="bg-base-200 border-base-300 rounded-box border p-4 flex flex-col items-center justify-center">

              <span className="rounded-box p-4 bg-white border border-primary-content">
                <QRCodeSVG
                  value={`https://prsskit.com/${artist?.urlIdentifier}`}
                  size={256}
                  fgColor="#000"
                  level="M"
                />
              </span>

              <h1 className="text-3xl font-bold mt-4 break-all line-clamp-2">{artist?.artistName}</h1>

              <motion.span
                onClick={handleCopyUrl}
                whileTap={{
                  y: [0, -10, 0], // Bounce up and down
                  transition: { duration: 0.5 } // Adjust duration as needed
                }}
                className="rounded-box py-2 px-3 bg-primary-content mt-4 items-center flex space-x-2 tooltip tooltip-primary cursor-pointer"
                data-tip="Copy URL"
              >
                <p className="text-sm font-mono text-primary break-all">prsskit.com/{artist?.urlIdentifier}</p>
                <PiCopySimpleDuotone className="shrink-0 text-primary" size={22} />
              </motion.span>
            </div>
          </div>

          <div className="col-span-8 md:col-span-4 lg:col-span-5">
            <div className="bg-base-200 border-base-300 rounded-box border p-4">
              <h1 className="text-2xl font-bold mb-1">{translations['title']}</h1>
              <p className="text-sm mb-4">{translations['description']}</p>
              <ul className="list bg-base-100 rounded-box shadow">

                {artist?.assets
                  ?.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)?.slice(0, 5)
                  ?.map((asset, index) => (
                    <li className="list-row" key={asset.name + index}>
                      <Image height={56} width={56} className="size-14 rounded-box object-cover" alt={asset.name} src={asset.thumbnail?.url || asset.url} />
                      <div className="items-center flex">
                        <div>
                          <p className="line-clamp-1">{asset.name}</p>
                          <p className="text-xs uppercase font-semibold opacity-60">
                            {format.dateTime(new Date(asset.createdAt?.seconds * 1000))}
                          </p>
                        </div>
                      </div>

                      <div className="tooltip" data-tip="Share">
                        <ShareButton
                          url={asset.url}
                          title={asset.name}
                          text={`Check out this asset: ${asset.name}`}
                        />
                      </div>

                      <div className="tooltip" data-tip="Download">
                        <button onClick={() => handleDownload(asset)} className="btn btn-square btn-ghost" role="button">
                          <PiDownloadSimple size={22} />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>

              <div className="flex justify-center">
                <button onClick={showMore} className="btn btn-wide btn-outline mt-4">
                  Show more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}