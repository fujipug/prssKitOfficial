"use client";
import { useState, useRef, useEffect } from "react";
import { FileData } from "@/app/types";
import { PiPauseCircleDuotone, PiPlayCircleDuotone, PiVinylRecordDuotone } from "react-icons/pi";

function AudioPlayer({ audio, fullWidth = false }: { audio: FileData, fullWidth?: boolean }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log("AudioPlayer mounted with audio:", audio);
    // Reset player when audio source changes
    if (audioRef.current) {
      audioRef.current.src = audio.url; // assuming FileData has a url property
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Play error:", e));
      }
    }
  }, [audio.url]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Play error:", e));
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    // setProgress(0);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      // setProgress((time / duration) * 100 || 0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      // setProgress((newTime / duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative w-full mt-12">
      {/* Vinyl record - positioned behind but visible */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <PiVinylRecordDuotone
          className={`size-52 opacity-70 text-neutral/20 ${isPlaying ? 'animate-spin' : ''}`}
          style={{ animationDuration: '2000ms' }} // Adjust speed as needed
        />
      </div>

      {/* Glass card - positioned in front but semi-transparent */}
      <div className={`card glass p-4 w-full bg-opacity-70 ${fullWidth ? 'w-full' : ''} relative z-10`}>
        <div className="flex items-center">
          <button onClick={handlePlayPause} className="self-start z-20">
            {isPlaying ? (
              <PiPauseCircleDuotone className="h-10 w-10" />
            ) : (
              <PiPlayCircleDuotone className="h-10 w-10" />
            )}
          </button>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full z-20">
            <span className="text-xs w-10 flex justify-end">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              className="range range-xs flex-1"
              onChange={handleSliderChange}
            />
            <span className="text-xs w-10">{formatTime(duration)}</span>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={audio.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleTrackEnd}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;