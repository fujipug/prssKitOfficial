'use client';
import BackgroundPlayer from 'next-video/background-player';
import Link from 'next/link';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/prsskit.firebasestorage.app/o/prss_kit_videos%2Fsebas_wolf_slide.mp4?alt=media&token=440c79d4-7ef5-491e-9635-dc20fbaacd9f',
    // title: 'Slide 1',
    // description: 'Description for Slide 1',
  },
  {
    id: 2,
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/prsskit.firebasestorage.app/o/prss_kit_videos%2Fdie_hekss_slide.mp4?alt=media&token=78394e2f-9dbf-46d4-8f8b-bda5330201ae',
  },
];

export default function ArtistCarousel({ textOverlay, actionButtonText }: { textOverlay?: string, actionButtonText?: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="carousel w-full relative overflow-x-visible">
        <div className="carousel-item relative w-full">
          <div className='bg-base-200 border-base-300 rounded-box border p-4'>
            <BackgroundPlayer
              src={slides[currentSlide].videoSrc}
              className='-mt-10 rounded-box'>
            </BackgroundPlayer>
            <div className="cardtext-primary-content w-full">
              <div className="card-body glass rounded-box -bottom-5 -left-5 absolute w-1/2">
                <p className='sm:text-md md:text-lg lg:text-2xl font-bold text-white'>{textOverlay}</p>
                <div className="card-actions justify-end mt-2">
                  <Link href="/onboard" role="button" className="btn sm:btn-sm md:btn-md lg:btn-md btn-primary">{actionButtonText}</Link>
                </div>
              </div>

              <div className="mockup-phone border-error absolute -bottom-5 right-20 scale-30 sm:scale-45 md:scale-50 lg:scale-55 origin-bottom-right shadow-2xl">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <img alt="wallpaper" src="/register_image.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Mock */}
        {/* <div className="mockup-phone border-error scale-10 sm:scale-30 md:scale-50 lg:scale-70 absolute bottom-0 right-0">
          <div className="mockup-phone-camera"></div>
          <div className="mockup-phone-display">
            <img alt="wallpaper" src="/register_image.jpg" />
          </div>
        </div> */}

        {/* Navigation Buttons */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={goToPrevious} className="btn btn-circle">❮</button>
          <button onClick={goToNext} className="btn btn-circle">❯</button>
        </div>
      </div>

    </>
  );
}