import { Row } from "@/app/types";
import { PiMinusBold, PiVinylRecordDuotone } from "react-icons/pi";
import Image from "next/image";
import AddElementModal from "./add-element-modal";
import { useRef } from "react";
import useClickOutside from "@/lib/useClickOutside";

export default function RowInstance({ item, editRowItemsMode, translations, setEditRowItemsMode }: {
  item: Row;
  editRowItemsMode: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
  setEditRowItemsMode: (mode: string | null) => void;
}) {
  const editRowRef = useRef<HTMLDivElement>(null);

  useClickOutside(editRowRef, () => {
    if (editRowItemsMode === item.id) {
      setEditRowItemsMode(null);
    }
  });

  return (
    <div ref={editRowRef} className={`${editRowItemsMode === item.id ? 'overflow-x-visible' : 'overflow-x-scroll'} space-x-2 snap-x space-y-2 flex pt-2`} id={item.id}>
      {item.items?.map((file, index) => (
        <div key={index} className={`${editRowItemsMode === item.id ? 'animate-wiggle' : ''} avatar snap-center indicator`}>
          <span className={`${editRowItemsMode === item.id ? 'indicator-item indicator-start badge badge-error size-8 p-0 rounded-full' : 'hidden'}`}>
            <PiMinusBold onClick={() => setEditRowItemsMode(item.id)} className="text-white" size={18} />
          </span>

          <div className="w-24 rounded-box">
            {/* TODO: Move this to a util folder  */}
            {file?.type?.startsWith('video/') && (
              <video className="w-full h-full object-cover rounded-box" controls>
                <source src={file?.url} type={file?.type} />
                Your browser does not support the video tag.
              </video>
            )}

            {file?.type?.startsWith('audio/') && (
              <div className="w-full h-full relative bg-base-300/80">
                <div className="bg-base-300 shadow w-full h-2/5 bottom-0 absolute z-10 flex items-center justify-center"></div>
                <PiVinylRecordDuotone size={100} className='absolute inset-0 m-auto' />
              </div>
            )}

            {file?.type?.startsWith('image/') && (
              <Image width={96} height={96} alt="Item" src={file?.url} />
            )}

            {file?.type?.startsWith('application/') && (
              <iframe
                src={file?.url}
                height="100%"
                width="100%"
                allowFullScreen={false}
                className="overflow-hidden pointer-events-none border-none"
              ></iframe>
            )}
          </div>
        </div>
      ))}

      {item.items && item.items.length < 6 && (
        <AddElementModal rowId={item.id} translations={translations} />
      )}
    </div>

  );
}