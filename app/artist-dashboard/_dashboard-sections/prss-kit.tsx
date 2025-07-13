import Image from 'next/image';
import { Reorder } from "framer-motion";
import { useRef, useState } from 'react';
import { PiAtBold, PiDesktop, PiDeviceMobileSpeaker, PiLayout, PiMapPin, PiNotebook, PiNotePencil, PiPlusSquare } from "react-icons/pi";
import { useAuth } from '@/lib/AuthContext';
import EditProfileModal from '../_components/edit-profile-modal';
import AddElementModal from '../_components/add-element-modal';
import DeleteItemModal from '../_components/delete-item-modal';
import { Row } from '@/app/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrssKit({ translations }: { translations: any }) {
  const { artist } = useAuth();
  const constraintsRef = useRef(null)
  const [items, setItems] = useState(artist.rows ? artist.rows : []);

  const handleReorder = (rows: Row[]) => {
    setItems(rows);
    console.log("Reordered items:", rows);
  };

  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        {/* TODO: add the mb-4 probably in the layout */}
        <div className="col-span-8 md:col-span-4 lg:col-span-5 mb-4">
          <div className="card card-side bg-base-200 border-base-300 rounded-box border mb-4">
            <figure>
              <Image
                src="/login_image.jpg"
                width={140}
                height={140}
                alt="Profile Pic" />
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
                <EditProfileModal modalButtonText={translations['edit_profile']} />
              </div>
            </div>
          </div>

          <AddElementModal
            modalButtonText={translations['add_new_item']}
            translations={translations}
          />

          {/* <div className="bg-base-200 border-base-300 rounded-box border p-4 mb-4"> */}
          <Reorder.Group axis="y" values={items} onReorder={handleReorder} ref={constraintsRef}>
            <span className="space-y-4">
              {items?.map((item) => (
                <Reorder.Item key={item.id} value={item} drag dragConstraints={constraintsRef} >

                  {/* TODO: On Toggle to not show switch, change the background color to indicate that
                    you can see it on the artist page */}
                  <div className="card bg-base-200 border-base-300 border card-lg shadow">
                    <div className="card-body">
                      <div className="flex justify-between items-center">
                        <div className="flex items-baseline space-x-2">
                          <h2 className="card-title">{item.name}</h2>
                          {/* <p className="text-xs">Spotify</p> */}
                        </div>

                        <div className="flex justify-end items-center">
                          <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                        </div>
                      </div>

                      {/* Main row body */}
                      <div className="space-x-2">
                        {item.items?.map((file, index) => (
                          <div key={index} className="avatar">
                            <div className="w-24 rounded-box">
                              <Image width={96} height={96} alt="Item" src={file?.url} />
                            </div>
                          </div>
                        ))}

                        <AddElementModal rowId={item.id} translations={translations} />
                      </div>

                      <div className="card-actions justify-between">
                        <div className='space-x-2'>

                          <div className="tooltip" data-tip="Layout">
                            <button className="btn btn-square btn-soft">
                              <PiLayout size={22} />
                            </button>
                          </div>

                          <div className="tooltip" data-tip="Edit">
                            <button className="btn btn-square btn-soft">
                              <PiNotePencil size={22} />
                            </button>
                          </div>

                          <div className="tooltip" data-tip="Add">
                            <button className="btn btn-square btn-soft">
                              <PiPlusSquare size={22} />
                            </button>
                          </div>
                        </div>

                        <DeleteItemModal />
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </span>
          </Reorder.Group>
        </div>
        {/* </div> */}

        <div className="col-span-8 md:col-span-4 lg:col-span-3">
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
            <div className="h-[700px] flex items-center justify-center relative">
              <div className="absolute transform scale-70">
                <div className="mockup-phone">
                  <div className="mockup-phone-camera"></div>
                  <div className="mockup-phone-display">
                    <img alt="wallpaper" src="/register_image.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
