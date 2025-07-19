import Image from 'next/image';
import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from 'react';
import { PiAtBold, PiDesktop, PiDeviceMobileSpeaker, PiMapPin, PiNotebook, PiNotePencil, PiPencilSimpleLineDuotone, PiRowsPlusBottom } from "react-icons/pi";
import { useAuth } from '@/lib/AuthContext';
import EditProfileModal from '../_components/edit-profile-modal';
import AddElementModal from '../_components/add-element-modal';
import DeleteElementModal from '../_components/delete-element-modal';
import { FileData, Row } from '@/app/types';
import WelcomeAboardSvg from '@/utils/welcome-aboard-svg';
import MobilePreview from '../_components/mobile-preview';
import TestModal from '../_components/test-modal';
import { updateArtist } from '@/network/firebase';
import useClickOutside from '@/lib/useClickOutside';
import Dock from '../_components/dock';
import RowInstance from '../_components/row-instance';
import RowInfoModal from '../_components/row-info-modal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrssKit({ translations, editProfileModalTranslations }: { translations: any, editProfileModalTranslations: any }) {
  const { artist } = useAuth();
  const constraintsRef = useRef(null);
  const inputRef = useRef(null);
  let addElementModalRef = useRef<HTMLDialogElement | null>(null);
  const [items, setItems] = useState(artist.rows ? artist.rows : []);
  const [mobilePreviewItem, setMobilePreviewItem] = useState<FileData | null>(null);
  const [editRowNameMode, setEditRowNameMode] = useState<string | null>(null);
  const [editRowItemsMode, setEditRowItemsMode] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useClickOutside(inputRef, async () => {
    if (editRowNameMode) {
      setEditRowNameMode(null);
      return;
    }
  });

  // useClickOutside(editRowRef, () => {
  //   setEditRowItemsMode(null);
  // });

  useEffect(() => {
    if (artist.rows) {
      setItems(artist.rows);
    }
  }, [artist]);

  const handleArtistUpdate = async () => {
    await updateArtist({
      ...artist,
      rows: items.map((item) => {
        if (item.id === editRowNameMode) {
          return { ...item, name: inputValue };
        }
        return item;
      })
    });

    setEditRowNameMode(null);
  }

  const handleReorder = async (rows: Row[]) => {
    const newIndexRows = rows.map((row, index) => ({
      ...row,
      index
    }));

    await updateArtist({ ...artist, rows: newIndexRows });

    setItems(newIndexRows);
  };

  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        {/* TODO: add the mb-4 probably in the layout */}
        <div className="col-span-8 lg:col-span-5 mb-4">
          <div className="card card-side bg-base-200 border-base-300 rounded-box border mb-4">
            <figure>
              {artist?.profileImage && artist?.profileImage.url ? (
                <Image
                  src={artist.profileImage.url}
                  width={140}
                  height={140}
                  alt="Profile Pic"
                />
              ) : (
                <WelcomeAboardSvg className="w-48 h-72 rounded-2xl" />
              )}

            </figure>
            <div className="card-body">
              <p className='font-bold text-3xl'>{artist?.artistName}</p>
              <div className="font-semibold flex items-center space-x-1">
                <PiAtBold />
                <p>/{artist?.urlIdentifier}</p>
              </div>
              <div className={`flex items-center space-x-1 ${artist?.biography ? '' : 'text-info/60 italic'}`}>
                <PiNotebook />
                <p>{artist?.biography || translations['biography_placeholder']}</p>
              </div>
              <div className={`flex items-center space-x-1 ${artist?.location ? '' : 'text-info/60 italic'}`}>
                <PiMapPin />
                <p>{artist?.location || translations['location_placeholder']}</p>
              </div>
              <div className="card-actions justify-start">
                <EditProfileModal artist={artist} modalButtonText={translations['edit_profile']} translations={editProfileModalTranslations} />
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <AddElementModal dialogRef={(ref) => addElementModalRef = ref} translations={translations}>
              <button onClick={() => addElementModalRef.current?.showModal()} className="btn btn-primary btn-lg btn-block mb-4">
                <PiRowsPlusBottom size={22} />
                <span className="ml-1">{translations['add_new_item']}</span>
              </button>
            </AddElementModal>
          </div>

          {/* <div className="bg-base-200 border-base-300 rounded-box border p-4 mb-4"> */}
          <Reorder.Group axis="y" values={items} onReorder={handleReorder} ref={constraintsRef}>
            <span className="space-y-4">
              {items?.map((item: Row) => (
                <Reorder.Item key={item.id} value={item} drag dragConstraints={constraintsRef} >

                  {/* TODO: On Toggle to not show switch, change the background color to indicate that
                    you can see it on the artist page */}
                  <div className="card bg-base-200 border-base-300 border card-lg shadow">
                    <div className="card-body">
                      <div className="grid grid-cols-10 items-center">
                        {editRowNameMode !== item.id ? (
                          <div className='col-span-8 flex items-center space-x-1'>
                            <h2 className="card-title line-clamp-1">
                              {item.name}
                            </h2>
                            <PiPencilSimpleLineDuotone
                              className='cursor-pointer flex-shrink-0'
                              onClick={() => setEditRowNameMode(item.id)}
                              size={22} />
                          </div>
                        ) : (
                          <input ref={inputRef}
                            type="text"
                            name={item.id}
                            autoFocus
                            defaultValue={item.name}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleArtistUpdate()}
                            placeholder="Type here"
                            className="input input-ghost card-title p-0 col-span-8" />
                        )}

                        <div className="col-span-2 flex justify-end items-center">
                          <input type="checkbox"
                            defaultChecked={item.isShown}
                            onChange={async (e) => {
                              const updatedItem = { ...item, isShown: e.target.checked };
                              const updatedRows = items.map(row => row.id === item.id ? updatedItem : row);
                              await updateArtist({ ...artist, rows: updatedRows });
                              setItems(updatedRows);
                            }}
                            className="toggle toggle-primary" />
                        </div>
                      </div>

                      {/* Main row body */}
                      <RowInstance
                        item={item}
                        editRowItemsMode={editRowItemsMode}
                        translations={translations}
                        setEditRowItemsMode={setEditRowItemsMode}
                      />

                      <div className="card-actions justify-between">
                        <div className='space-x-2'>
                          <RowInfoModal row={item} />

                          <div className="tooltip" data-tip="Edit">
                            <button onClick={() => setEditRowItemsMode(item.id)} className="btn btn-square btn-soft">
                              <PiNotePencil size={22} />
                            </button>
                          </div>

                          {/* <div className="tooltip" data-tip="Add">
                            <button className="btn btn-square btn-soft">
                              <PiPlusSquare size={22} />
                            </button>
                          </div> */}
                        </div>

                        <DeleteElementModal row={item} />
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </span>
          </Reorder.Group>
        </div>
        {/* </div> */}

        <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-26 lg:h-screen">
          <div className="bg-base-200 border-base-300 rounded-box border p-4">
            <div className="flex justify-center items-center space-x-2">
              <button className="btn btn-soft btn-primary btn-active">
                <PiDeviceMobileSpeaker size={22} />
              </button>

              <button className="btn btn-soft btn-primary">
                <PiDesktop size={22} />
              </button>
            </div>

            {/* Phone Mock */}
            <div className="h-[700px] flex items-center justify-center">
              <div className="absolute transform scale-70">
                <div className="mockup-phone">
                  <div className="mockup-phone-camera"></div>
                  <div className={`mockup-phone-display relative ${mobilePreviewItem ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
                    <MobilePreview selectedPreviewItem={setMobilePreviewItem} />
                    {mobilePreviewItem && (
                      <TestModal
                        item={mobilePreviewItem}
                        onClose={() => setMobilePreviewItem(null)}
                      />
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Dock translations={translations} />
    </div >
  );
}
