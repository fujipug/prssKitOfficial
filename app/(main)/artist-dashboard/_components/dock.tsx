import { PiDevicesDuotone, PiPaintBrushBroadDuotone, PiPlus } from "react-icons/pi";

export default function Dock() {
  return (
    <div className="lg:hidden dock dock-lg bg-secondary text-secondary-content z-20">
      <button>
        <PiPlus size={32} />
        <span className="dock-label mt-1">Add row</span>
      </button>

      <button>
        <PiDevicesDuotone size={32} />
        <span className="dock-label mt-1">Preview</span>
      </button>

      <button>
        <PiPaintBrushBroadDuotone size={32} />
        <span className="dock-label mt-1">Design</span>
      </button>
    </div>
  );
}
