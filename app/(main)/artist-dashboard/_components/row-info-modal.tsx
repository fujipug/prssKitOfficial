import { useRef, useState } from "react";
import { PiArrowLeft, PiFileText, PiFilmStripDuotone, PiImage, PiInfo, PiPlayPause, PiVideo, PiVinylRecordDuotone } from "react-icons/pi";
import { FileData, Row } from "@/app/types";
import formatBytes from "@/utils/format-bytes";
import PreviewItem from "./preview-item";
import Image from "next/image";

export default function RowInfoModal({ row }: { row: Row }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [previewItem, setPreviewItem] = useState<FileData | null>(null);

  return (
    <>
      <div className="tooltip" data-tip="Info">
        <button onClick={() => modalRef.current?.showModal()} className="btn btn-square btn-soft">
          <PiInfo size={22} />
        </button>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">

          {!previewItem ?
            <ul className="list bg-base-200 border-base-300 rounded-box border p-4">

              {row.items?.map((item: FileData, index: number) => (
                <li key={index} className="list-row items-center">
                  <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
                  <div>
                    {item.type?.startsWith('audio/') && (
                      <div className="bg-base-300/80 relative rounded-box">
                        <PiVinylRecordDuotone className='size-14' />
                        <div className="bg-base-300 rounded-box absolute bottom-0 w-full h-2/5"></div>
                      </div>
                    )}

                    {item.type?.startsWith('video/') && (
                      <PiFilmStripDuotone className="size-14" />

                    )}

                    {item.type?.startsWith('image/') && (
                      <Image height={56} width={56} className="size-14 rounded-box object-cover" alt={item.name} src={item.thumbnail?.url || item.url} />
                    )}

                    {item.type?.startsWith('application/') && (
                      <iframe
                        src={item?.url}
                        allowFullScreen={false}
                        className="size-14 rounded-box object-cover overflow-hidden pointer-events-none border-none"
                      ></iframe>
                    )}
                  </div>

                  <div className="list-col-grow">
                    <p className="line-clamp-1">{item.name}</p>
                    {/* <p className="text-xs font-semibold opacity-60">{item.type}</p> */}
                    <p className="text-xs uppercase font-semibold opacity-60">{formatBytes(item.size)}</p>
                  </div>

                  <button className="btn btn-square btn-soft" onClick={() => setPreviewItem(item)}>
                    {item.type?.startsWith('audio/') && (
                      <PiPlayPause size={22} />
                    )}

                    {item.type?.startsWith('video/') && (
                      <PiVideo size={22} />

                    )}

                    {item.type?.startsWith('image/') && (
                      <PiImage size={22} />
                    )}

                    {item.type?.startsWith('application/') && (
                      <PiFileText size={22} />
                    )}

                    {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg> */}
                  </button>
                </li>
              ))}
            </ul>
            :
            <>
              <button onClick={() => setPreviewItem(null)} className="btn btn-ghost">
                <PiArrowLeft size={22} />
                <span className="ml-1">Back</span>
              </button>
              <PreviewItem fileData={previewItem}></PreviewItem>
            </>
          }

        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  )
}
