import { useAuth } from '@/lib/AuthContext';
import Image from 'next/image';
import { FileData } from '@/app/types';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

export default function MobilePreview({ selectedPreviewItem }: { selectedPreviewItem: (item: FileData) => void }) {
  const { artist } = useAuth();

  return (
    <div className="bg-gray-200 min-h-screen">
      <PiDotsThreeVerticalBold size={36} className='fixed top-10 right-10 cursor-pointer z-50' />
      <div className="relative">
        <Image src={artist?.profileImage?.url || '/default-profile.png'}
          alt={artist?.profileImage?.url || 'Artist Image'}
          width={300}
          height={300}
          className="w-full h-96 object-cover" />

        <div className="absolute inset-0 flex items-end justify-center mb-4">
          <div className='mx-auto text-center space-y-4'>
            <p className='font-sans font-light text-white text-5xl'>{artist?.artistName}</p>
            <p className='font-sans font-light text-white text-md'>{artist?.location}</p>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-4">
        <div className={`${artist?.biography ? 'bg-white rounded-md p-4' : 'hidden'}`}>
          <p className='font-sans text-black text-md'>{artist?.biography}</p>
        </div>

        {artist?.rows && artist.rows.length > 0 ? (
          <div className="space-y-4 w-full">
            {artist.rows.map((row, index) => (
              <div key={index} className={`${row.isShown ? 'bg-white rounded-md p-4' : 'hidden'}`}>
                <h3 className="font-sans font-semibold text-2xl text-black">{row.name}</h3>

                {row.items && row.items.length > 0 ? (
                  <ul className="my-4 flex space-x-4 overflow-x-auto snap-x snap-mandatory">
                    {row.items.map((item, itemIndex) => (
                      <li key={itemIndex} onClick={() => selectedPreviewItem(item)} className="flex-shrink-0 snap-start cursor-pointer">
                        {item.type.includes('image') && (
                          <Image
                            src={item.thumbnail?.url || item.url}
                            alt={item.name}
                            width={400}
                            height={400}
                            className="size-48 object-cover rounded-md"
                          />
                        )}

                        {item.type.includes('video') && (
                          <video
                            src={item.url}
                            controls
                            className="size-48 object-cover rounded-md"
                          />
                        )}

                        {item.type.includes('audio') && (
                          <audio
                            src={item.url}
                            controls
                            className="size-48 object-cover rounded-md"
                          />
                        )}

                        {item.type.includes('application') && (
                          <iframe
                            src={item.url}
                            height="100%"
                            width="100%"
                            allowFullScreen={true}
                            className="overflow-hidden pointer-events-none border-none rounded-md"
                          ></iframe>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-sans text-sm text-gray-600">No items to display.</p>
                )}
              </div>

            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md p-4">
            <p className="font-sans text-sm text-gray-600">No items to display.</p>
          </div>
        )}
      </div>

      <div className="w-fit mx-auto">
        <div className="torn-paper text-black">
          <h1 className="font-bold text-xl">PRSS KIT</h1>
        </div>
      </div>
    </div >
  );
}