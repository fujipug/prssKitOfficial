import Image from 'next/image';
import { Reorder } from "framer-motion";
import { useState } from 'react';
import { PiAtBold, PiDesktop, PiDeviceMobileSpeaker, PiLayout, PiListPlusBold, PiMapPin, PiNotebook, PiNotePencil, PiPlusSquare, PiTrash, PiUserList } from "react-icons/pi";
import { useAuth } from '@/lib/AuthContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrssKit({ translations }: { translations: any }) {
  const { profile } = useAuth();
  const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];
  const [items, setItems] = useState(initialItems);

  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-4 lg:col-span-5">
          <div className="card card-side bg-base-200 border-base-300 rounded-box border mb-4">
            <figure>
              <Image
                src="/login_image.jpg"
                width={140}
                height={140}
                alt="Profile Pic" />
            </figure>
            <div className="card-body">
              <p className='font-bold text-3xl'>{profile?.artistName}</p>
              <div className="font-semibold flex items-center space-x-1">
                <PiAtBold />
                <p>/{profile?.urlIdentifier}</p>
              </div>
              <div className={`flex items-center space-x-1 ${profile?.biography ? '' : 'text-info/60 italic'}`}>
                <PiNotebook />
                <p>{profile?.biography || translations['biography_placeholder']}</p>
              </div>
              <div className={`flex items-center space-x-1 ${profile?.location ? '' : 'text-info/60 italic'}`}>
                <PiMapPin />
                <p>{profile?.location || translations['location_placeholder']}</p>
              </div>
              <div className="card-actions justify-start">
                <button className="btn btn-primary btn-wide">
                  <PiUserList size={22} />
                  <span className="ml-1">{translations['edit_profile']}</span>
                </button>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-lg btn-block mb-4">
            <PiListPlusBold size={22} />
            <span className="ml-1">{translations['add_new_item']}</span>
          </button>

          <div className="bg-base-200 border-base-300 rounded-box border p-4 mb-4">
            <h1 className="text-2xl font-bold mb-1">{translations['title']}</h1>
            <p className="text-sm mb-4">{translations['subtitle']}</p>

            <Reorder.Group axis="y" values={items} onReorder={setItems} >
              <span className="space-y-4">
                {items.map((item) => (
                  <Reorder.Item key={item} value={item}>

                    {/* TODO: On Toggle to not show switch, change the background color to indicate that
                    you can see it on the artist page */}
                    <div className="card bg-base-100 card-lg shadow">
                      <div className="card-body">
                        <div className="flex justify-between items-center">
                          <div className="flex items-baseline space-x-2">
                            <h2 className="card-title">{item}</h2>
                            <p className="text-xs">Spotify</p>
                          </div>

                          <div className="flex justify-end items-center">
                            <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                          </div>
                        </div>

                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
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

                          <div className="tooltip tooltip-error" data-tip="Delete">
                            <button className="btn btn-square btn-error btn-soft">
                              <PiTrash size={22} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </span>
            </Reorder.Group>
          </div>
        </div>

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
