import { useRef, useState } from "react";
import { PiDesktop, PiDeviceMobileSpeaker, PiDevicesDuotone } from "react-icons/pi";
import MobilePreview from "./mobile-preview";
import MobilePreviewEmulatedModal from "./mobile-preview-emulated-modal";
import { FileData } from "@/app/types";

export default function MobileMockModal() {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [mobilePreviewItem, setMobilePreviewItem] = useState<FileData | null>(null);

  return (
    <>
      <button onClick={() => modalRef.current?.showModal()} className="flex flex-col items-center justify-center">
        <PiDevicesDuotone size={30} />
        <span className="text-xs mt-1">Preview</span>
      </button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">

          <div className="flex justify-center items-center space-x-2">
            <button className="btn btn-soft btn-primary btn-active">
              <PiDeviceMobileSpeaker size={22} />
            </button>

            <button className="btn btn-soft btn-primary">
              <PiDesktop size={22} />
            </button>
          </div>

          <div className="h-[700px] flex items-center justify-center">
            <div className="absolute transform scale-70">
              <div className="mockup-phone">
                <div className="mockup-phone-camera"></div>
                <div className={`mockup-phone-display relative ${mobilePreviewItem ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
                  <MobilePreview selectedPreviewItem={setMobilePreviewItem} />
                  {mobilePreviewItem && (
                    <MobilePreviewEmulatedModal
                      item={mobilePreviewItem}
                      onClose={() => setMobilePreviewItem(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="justify-between">
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