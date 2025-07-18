import { FileData } from "@/app/types";
import Image from "next/image";
import formatBytes from "@/utils/format-bytes";
import Player from "next-video/player";
import AudioPlayer from "@/components/audio-player";

export default function PreviewItem({ fileData }: { fileData: FileData }) {
  return (
    <div className="bg-base-200 border-base-300 rounded-box border p-4">
      <div className="flex items-center space-x-2 mb-4">
        {fileData.type.startsWith("image/") &&
          <Image width={1200} height={1200} src={fileData.url} alt={fileData.name} className="w-full h-full rounded-lg" />
        }

        {fileData.type.startsWith("video/") &&
          // <video src={fileData.url} className="w-16 h-16 object-cover rounded" controls />
          <Player
            src={fileData.url}
          // poster="https://www.mydomain.com/remote-poster.webp"
          // blurDataURL="data:image/webp;base64,UklGRlA..."
          />
        }

        {fileData.type.startsWith("audio/") &&
          <>
            {/* <PiVinylRecordDuotone className="size-14" /> */}
            {/* <audio src={fileData.url} className="w-full" controls /> */}
            <AudioPlayer audio={fileData} fullWidth={false} />
          </>
        }

        {fileData.type.startsWith("application/") &&
          <iframe
            src={fileData.url}
            height="100%"
            width="100%"
            className="w-full h-96"
            title={fileData.name}
          ></iframe>
        }
      </div>
      <h2 className="text-lg font-bold truncate">{fileData.name}</h2>
      <p className="text-sm text-gray-500">{formatBytes(fileData.size)}</p>
    </div>
  )
}