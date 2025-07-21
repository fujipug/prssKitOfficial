// import MaskedDiv from "@/components/masked-div";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Assets({ translations }: { translations: any }) {
  const { artist } = useAuth();

  const documents = artist?.assets?.filter((file) => file.type.split("/")[0] === "application");
  const images = artist?.assets?.filter((file) => file.type.split("/")[0] === "image");
  const videos = artist?.assets?.filter((file) => file.type.split("/")[0] === "video");
  const audios = artist?.assets?.filter((file) => file.type.split("/")[0] === "audio");

  return (
    <div className="min-h-screen bg-base-10 space-y-4">
      {/* <div className="p-4">
        <p className="text-lg font-bold mb-4">{translations['collection_text']}</p>
        <MaskedDiv maskType="type-1" className="size-40">
          <Image src="/test_collection.jpg" width={40} height={40} className="w-max" alt="Collection Image" />
        </MaskedDiv>
      </div> */}

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['document_text']}</p>
        <ul>
          {documents?.map((file, index) => (
            <li key={file.name + index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold mb-4">{translations['image_text']}</p>
          <p className="text-lg font-bold mb-4">Show more</p>
        </div>
        <ul className="space-x-2 snap-x space-y-2 flex overflow-x-scroll">
          {images?.map((file, index) => (
            <li key={file.name + index} className="avatar snap-center">
              <div className="w-24 rounded-box">
                <Image width={96} height={96} alt="Item" src={file?.url} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['video_text']}</p>
        <ul>
          {videos?.map((file, index) => (
            <li key={file.name + index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['audio_text']}</p>
        <ul>
          {audios?.map((file, index) => (
            <li key={file.name + index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}