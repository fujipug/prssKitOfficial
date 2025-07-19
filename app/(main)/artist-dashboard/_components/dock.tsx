import { PiPaintBrushBroadDuotone, PiPlus } from "react-icons/pi";
import AddElementModal from "./add-element-modal";
import { useRef } from "react";
import MobileMockModal from "./mobile-mock-modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dock({ translations }: { translations: any }) {
  let addElementModalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className="lg:hidden fixed z-10 bottom-2 left-1/2 
    transform -translate-x-1/2 bg-secondary shadow-2xl py-2 px-3
    rounded-box flex justify-center items-center space-x-12 text-secondary-content">
      <AddElementModal dialogRef={(ref) => addElementModalRef = ref} translations={translations}>
        <button className="flex flex-col items-center justify-center" onClick={() => addElementModalRef.current?.showModal()}>
          <PiPlus size={30} />
          <p className="text-xs mt-1">Row</p>
        </button>
      </AddElementModal>

      <MobileMockModal />

      <button className="flex flex-col items-center justify-center">
        <PiPaintBrushBroadDuotone size={30} />
        <span className="text-xs mt-1">Design</span>
      </button>
    </div>
  );
}