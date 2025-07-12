import { useRef } from "react";
import { PiTrash } from "react-icons/pi";

export default function DeleteItemModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div onClick={() => modalRef.current?.showModal()} className="tooltip tooltip-error" data-tip="Delete">
        <button className="btn btn-square btn-error btn-soft">
          <PiTrash size={22} />
        </button>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-error-content">
          <h3 className="font-bold text-lg text-white">Hello!</h3>
          <p className="py-4 text-white">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog >
    </>
  )
}
