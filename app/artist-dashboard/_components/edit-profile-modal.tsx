import { useRef } from "react";
import { PiUserList } from "react-icons/pi";

export default function EditProfileModal({ modalButtonText }: { modalButtonText?: string }) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => modalRef.current?.showModal()} className="btn btn-primary btn-wide">
        <PiUserList size={22} />
        <span className="ml-1">{modalButtonText || 'Edit Profile'}</span>
      </button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
