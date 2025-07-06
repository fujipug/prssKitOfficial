import Image from 'next/image';
import { Reorder } from "framer-motion";
import { useState } from 'react';
import { PiLayout, PiNotePencil, PiPlusSquare, PiTrash } from "react-icons/pi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrssKit({ translations }: { translations: any }) {
  const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

  const [items, setItems] = useState(initialItems);

  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-5">
          <div className="card lg:card-side bg-base-200 border-base-300 rounded-box border p-4 mb-4">
            <figure>
              <Image
                src="/login_image.jpg"
                width={190}
                height={190}
                alt="Profile Pic" />
            </figure>
            <div className="card-body">
              <p className='font-semibold'>{translations.artist_name}:</p>
              <p className='font-semibold'>{translations.location}:</p>
              <p className='font-semibold'>{translations.profile_url}:</p>
              <p className='font-semibold'>{translations.biography}:</p>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div> */}
            </div>
          </div>

          <div className="bg-base-200 border-base-300 rounded-box border p-4 mb-4">
            <h1 className="text-2xl font-bold mb-1">{translations.title}</h1>
            <p className="text-sm mb-4">{translations.subtitle}</p>

            <Reorder.Group axis="y" values={items} onReorder={setItems} >
              <span className="space-y-4">
                {items.map((item) => (
                  <Reorder.Item key={item} value={item}>
                    <div className="card bg-base-100 card-lg shadow-sm">
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
                            <button className="btn btn-square btn-soft">
                              <PiLayout size={22} />
                            </button>
                            <button className="btn btn-square btn-soft">
                              <PiNotePencil size={22} />
                            </button>
                            <button className="btn btn-square btn-soft">
                              <PiPlusSquare size={22} />
                            </button>
                          </div>

                          <button className="btn btn-square btn-soft">
                            <PiTrash size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </span>
            </Reorder.Group>
          </div>
        </div>

        <div className="col-span-8 md:col-span-3">
          <div className="bg-base-200 border-base-300 rounded-box border p-4">
            <div className="flex justify-center items-center space-x-2">
              <button className="btn btn-square btn-soft">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
              </button>

              <button className="btn btn-square btn-soft">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
              </button>
            </div>

            {/* Phone Mock */}
            <div className="h-[700px] flex items-center justify-center relative">
              <div className="absolute transform scale-75">
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
    </div>
  );
}
