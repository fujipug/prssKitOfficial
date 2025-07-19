import { PiDevicesDuotone, PiPaintBrushBroadDuotone, PiPlus } from "react-icons/pi";
import AddElementModal from "./add-element-modal";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dock({ translations }: { translations: any }) {
  let addElementModalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className="lg:hidden fixed z-10 bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary shadow-2xl p-4 rounded-box flex justify-center items-center space-x-10">
      <AddElementModal dialogRef={(ref) => addElementModalRef = ref} translations={translations}>
        <button className="flex flex-col items-center justify-center" onClick={() => addElementModalRef.current?.showModal()}>
          <PiPlus size={32} />
          <p className="dock-label mt-1">Row</p>
        </button>
      </AddElementModal>

      <button className="flex flex-col items-center justify-center">
        <PiDevicesDuotone size={32} />
        <span className="dock-label mt-1">Preview</span>
      </button>

      <button className="flex flex-col items-center justify-center">
        <PiPaintBrushBroadDuotone size={32} />
        <span className="dock-label mt-1">Design</span>
      </button>
    </div>
  );
}