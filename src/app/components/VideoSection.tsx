"use client";

import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

const VideoSection = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = async () => {
        if (!videoRef.current) return;

        await videoRef.current.play();
        setIsPlaying(true);
    };

    return (
        <section className="relative flex w-full flex-col items-center ">
            <div               
                className="relative aspect-video w-full overflow-hidden bg-primary"
            >
            <video
  ref={videoRef}
  className="absolute inset-0 h-full w-full object-cover"
  muted
  loop
  playsInline
  preload="auto"
>
  <source
    src="/assets/Homepage banner/PPC-ideology.mp4"
    type="video/mp4"
  />
</video>

           {!isPlaying && (
  <div className="absolute inset-0 z-20 flex items-center justify-center">
    <button
      onClick={handlePlay}
      aria-label="Play video"
      className="group flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition-transform duration-300 hover:scale-110"
    >
      <FaPlay className="ml-1 text-2xl text-black" />
    </button>
  </div>
)}
            </div>
        </section>
    );
};

export default VideoSection;