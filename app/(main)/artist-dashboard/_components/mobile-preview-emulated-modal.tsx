import { FileData } from "@/app/types";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MobilePreviewEmulatedModal({
  item,
  onClose
}: {
  item: FileData | null;
  onClose: () => void
}) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-end justify-center bg-black/50 rounded-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-white p-8 rounded-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96">
          <Image
            src={item.url}
            alt={item.name || "Preview"}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex justify-end p-4 gap-2">
          <button
            className=""
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}