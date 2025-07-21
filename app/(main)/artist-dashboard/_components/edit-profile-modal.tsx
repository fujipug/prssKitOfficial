import { Artist, GoogleCity } from "@/app/types";
import { isUrlIdentifierAvailable, updateArtist } from "@/network/firebase";
import { useEffect, useRef, useState } from "react";
import { PiUserList } from "react-icons/pi";
import Image from "next/image";
import fileSortTypeUpload from "@/utils/file-sort-type-upload";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditProfileModal({ artist, translations, modalButtonText }: { artist: Artist; translations: any; modalButtonText?: string }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [places, setPlaces] = useState<GoogleCity[]>([]);
  const [urlIdentifier, setUrlIdentifier] = useState(artist?.urlIdentifier || '');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [tempProfileImage, setTempProfileImage] = useState<File | null>(null);

  const onPlaceInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // debounce the input to avoid too many requests
    if (event.target.value.length < 3) {
      setPlaces([]);
      return;
    }

    if (event.target.value.length > 20) {
      return; // Prevent too long input
    }

    fetch('/api/places/cities?input=' + encodeURIComponent(event.target.value))
      .then(response => response.json())
      .then(data => setPlaces(data.cities));
  }

  useEffect(() => {
    const checkIdentifier = (async (identifier: string) => {
      if (!identifier) {
        setIsAvailable(null);
        return;
      }

      if (identifier === artist?.urlIdentifier) {
        setIsAvailable(true);
        return;
      }

      setIsChecking(true);
      const available = await isUrlIdentifierAvailable(identifier);
      setIsAvailable(available);
      setIsChecking(false);
    });

    const debounceCheck = setTimeout(() => {
      checkIdentifier(urlIdentifier);
    }, 1000);

    return () => clearTimeout(debounceCheck);
  }, [urlIdentifier, artist?.urlIdentifier]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const artistName = formData.get('artistName') as string;
    const biography = formData.get('biography') as string;
    const location = formData.get('location') as string;
    const uploadedImage = tempProfileImage ? await fileSortTypeUpload([tempProfileImage], artist.uid) : null;

    const updatedArtist: Artist = {
      ...artist,
      artistName: artistName.trim(),
      urlIdentifier: urlIdentifier.trim(),
      biography: biography.trim(),
      location: location.trim(),
    };

    if (uploadedImage && uploadedImage.length > 0) {
      updatedArtist.profileImage = uploadedImage[0];
    }

    await updateArtist(updatedArtist).then(() => {
      modalRef.current?.close();
    })
  }

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setTempProfileImage(file);
  };

  return (
    <>
      <button onClick={() => modalRef.current?.showModal()} className="btn btn-primary btn-block">
        <PiUserList size={22} />
        <span className="ml-1">{modalButtonText || 'Edit Profile'}</span>
      </button>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box space-y-2">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 flex space-x-2">
            <div className="avatar">
              <div className="w-24 rounded">
                <Image
                  src={tempProfileImage ? URL.createObjectURL(tempProfileImage) : artist?.profileImage?.url || '/default_user.jpg'}
                  alt={artist?.artistName || 'Artist Profile'}
                  width={96}
                  height={96}
                  className={`object-cover` + (tempProfileImage || artist?.profileImage?.url ? '' : ' blur-xs')}
                />
              </div>
            </div>
            <div className="relative w-full">
              <p className="text-lg font-semibold">Profile image</p>
              <input onChange={(e) => handleProfileImageChange(e)} type="file" accept="image/*" className="file-input file-input-primary absolute bottom-0" />
            </div>
          </fieldset>

          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">

              <label htmlFor="artistName" className="label">{translations['artist_name_label']}</label>
              <input id="artistName" type="text" name="artistName" className="input w-full" placeholder="Bad Bunny" defaultValue={artist?.artistName} />

              <label htmlFor="urlIdentifier" className="label mt-2">{translations['url_identifier_label']}</label>
              <label className="input w-full">
                <span className="label">prsskit.com/</span>
                <input onChange={(e) => setUrlIdentifier(e.target.value.trim())} id="urlIdentifier" type="text" name="urlIdentifier" className="input lowercase" placeholder="badbunny" defaultValue={artist?.urlIdentifier} />
              </label>
              <label className={`${isChecking || isAvailable ? 'block' : 'hidden'}`}>
                {
                  isChecking ? 'Checking availability...' :
                    isAvailable ? urlIdentifier === artist?.urlIdentifier ? '' : <span className="text-success">This handle is available</span> : ''
                }
              </label>
              <label className={`${!isChecking && !isAvailable ? 'block' : 'hidden'} text-error`}>
                {isAvailable === false && 'Handle is already taken'}
              </label>

              <label htmlFor="biography" className="label mt-2">{translations['biography_label']}</label>
              <textarea id="biography" name="biography" className="textarea w-full resize-none" maxLength={120} placeholder="Biography" rows={4} defaultValue={artist?.biography}></textarea>

              <label htmlFor="location" className="label mt-2">{translations['location_label']}</label>
              <input id="location" name="location" onChange={onPlaceInputChange} type="text" className="input w-full" placeholder="Where you located?" list="cities" defaultValue={artist?.location} />
              <datalist id="cities">
                {places?.map(place => (
                  <option key={place.placeId} value={place.description}>{place.description}</option>
                ))}
              </datalist>
            </fieldset>

            <div className="modal-action justify-between">
              <button type="button" onClick={() => modalRef.current?.close()} className="btn btn-ghost">{translations['action_close']}</button>
              <button type="submit" className="btn btn-primary">{translations['action_save']}</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>{translations['action_close']}</button>
        </form>
      </dialog>
    </>
  )
}
