import { Row } from "@/app/types";
import { useAuth } from "@/lib/AuthContext";
import { updateArtist } from "@/network/firebase";
import { useRef } from "react";
import { PiTrash } from "react-icons/pi";

export default function DeleteElementModal({ row }: { row: Row }) {
  const { artist } = useAuth();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDeleteRow = async () => {
    const updatedRows = artist.rows?.filter((item) => item.id !== row.id);
    await updateArtist({
      ...artist,
      rows: updatedRows,
    });

    // Close the modal after deletion
    modalRef.current?.close();
  };

  return (
    <>
      <div onClick={() => modalRef.current?.showModal()} className="tooltip tooltip-error" data-tip="Delete">
        <button className="btn btn-square btn-error btn-soft">
          <PiTrash size={22} />
        </button>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-error-content">
          <h3 className="font-bold text-lg text-white">Delete!</h3>
          <p className="py-4 text-white">Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <button onClick={handleDeleteRow} className="btn">Delete</button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  )
}
