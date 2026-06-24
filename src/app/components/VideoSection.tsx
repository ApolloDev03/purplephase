// "use client";

// import { motion } from "framer-motion";

// const VideoSection = () => {
//     return (
//         <section className="relative w-full flex flex-col items-center">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="relative w-full aspect-video overflow-hidden shadow-2xl bg-black"
//             >
//                 <video
//                     className="absolute inset-0 h-full w-full object-cover"
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     preload="auto"
//                 >
//                     <source src="assets/Homepage banner/PPC-ideology.mp4" type="video/mp4" />
//                 </video>
//             </motion.div>
//         </section>
//     );
// };

// export default VideoSection;

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
        <section className="relative flex w-full flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative aspect-video w-full overflow-hidden bg-black shadow-2xl"
            >
                <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    // autoPlay
                    preload="auto"
                >
                    <source src="/assets/Homepage banner/PPC-ideology.mp4" type="video/mp4" />
                </video>

                {!isPlaying && (
                    <button
                        onClick={handlePlay}
                        className="absolute inset-0 z-10 flex items-center justify-center transition "
                        aria-label="Play video"
                    >
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-2xl transition duration-300 hover:scale-110">
                            <FaPlay className="ml-1 text-2xl" />
                        </span>
                    </button>
                )}
            </motion.div>
        </section>
    );
};

export default VideoSection;