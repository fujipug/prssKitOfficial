// import MaskedDiv from "@/components/masked-div";
// import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Assets({ translations }: { translations: any }) {
  return (
    <div className="min-h-dvh bg-base-10 space-y-4">
      {/* <div className="p-4">
        <p className="text-lg font-bold mb-4">{translations['collection_text']}</p>
        <MaskedDiv maskType="type-1" className="size-40">
          <Image src="/test_collection.jpg" width={40} height={40} className="w-max" alt="Collection Image" />
        </MaskedDiv>
      </div> */}

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['document_text']}</p>
        <p className="text-gray-500 mb-8">Manage your documents here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['image_text']}</p>
        <p className="text-gray-500 mb-8">Manage your images here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['video_text']}</p>
        <p className="text-gray-500 mb-8">Manage your videos here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">{translations['audio_text']}</p>
        <p className="text-gray-500 mb-8">Manage your audio files here.</p>
      </div>
    </div>
  );
}