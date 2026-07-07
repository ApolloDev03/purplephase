// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { apiUrl } from "../config";
// import axios from "axios";
//import { LuMoveUpRight } from "react-icons/lu";
// import { useRouter } from "next/navigation";

// export default function HeaderHero() {
//   const [current, setCurrent] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [slides, setSlides] = useState<any[]>([]);

//   const router = useRouter();
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     const fetchHeaderBanner = async () => {
//       try {
//         const res = await axios.post(`${apiUrl}/headerBannerList`);

//         if (res.data?.success) {
//           setSlides(res.data.data || []);
//           setCurrent(0);
//         }
//       } catch (error) {
//         console.error("Header Banner Error:", error);
//       }
//     };

//     fetchHeaderBanner();
//   }, []);

//   const resetAuto = useCallback(() => {
//     if (timerRef.current) clearInterval(timerRef.current);

//     if (!slides.length) return;

//     timerRef.current = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 7000);
//   }, [slides]);

//   useEffect(() => {
//     if (!slides.length) return;

//     resetAuto();

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [slides, resetAuto]);

//   const activeSlide = slides[current] || {};

//   const mediaVideo =
//     activeSlide?.media_video ||
//     activeSlide?.mediaVideo ||
//     activeSlide?.video_url ||
//     "";

//   const mediaUrl =
//     activeSlide?.media_url ||
//     activeSlide?.mediaUrl ||
//     activeSlide?.photo_url ||
//     activeSlide?.image_url ||
//     "";

//   const finalMedia = mediaVideo || mediaUrl;

//   const isVideo =
//     Boolean(mediaVideo) || /\.(mp4|webm|ogg|mov)$/i.test(finalMedia);

//   return (
//     <section className="relative h-[calc(100vw*720/1920)] min-h-[420px] max-h-[720px] w-full overflow-hidden bg-[#e5e5e5] font-heading">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={`bg-${activeSlide.id || current}`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="absolute inset-0 z-0 h-full w-full "
//         >
//           {isVideo && finalMedia ? (
//             <video
//               src={finalMedia}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="absolute inset-0 h-full w-full  object-cover "
//             />
//           ) : (
//             <div
//               className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: finalMedia ? `url(${finalMedia})` : "none",
//               }}
//             />
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* Overlay */}
//       <div className="absolute inset-0 z-10 bg-white/5" />

//       {/* Text Content */}
//       <div className="absolute left-0 top-1/2 z-20 w-full -translate-y-1/2 px-6 sm:px-8 lg:px-20 2xl:px-32">
//         <div
//           className="max-w-[760px]"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <AnimatePresence mode="wait">
//             {!isHovered ? (
//               <motion.h1
//                 key={`title-${activeSlide.id || current}`}
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -24 }}
//                 transition={{ duration: 0.45, ease: "easeOut" }}
//                 className="whitespace-pre-line font-body text-[30px] font-semibold leading-[1.15] text-primary sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[58px]"
//               >
//                 {activeSlide.title}
//               </motion.h1>
//             ) : (
//               <motion.h1
//                 key={`headline-${activeSlide.id || current}`}
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -24 }}
//                 transition={{ duration: 0.45, ease: "easeOut" }}
//                 className="whitespace-pre-line font-heading text-[30px] font-bold uppercase leading-[1.15] text-primary sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[58px]"
//               >
//                 We Build Your Brand
//               </motion.h1>
//             )}
//           </AnimatePresence>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.25 }}
//             className="mt-8 flex justify-start"
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 if (activeSlide.button_url) {
//                   router.push(activeSlide.button_url);
//                 }
//               }}
//               className="motion-shine group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30"
//             >
//               {activeSlide.button_title || "Let's Build"}

//               <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//                 <LuMoveUpRight className="h-5 w-5" />
//               </span>
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
//         {slides.map((slide, index) => (
//           <button
//             key={slide.id || index}
//             type="button"
//             onClick={() => {
//               setCurrent(index);
//               resetAuto();
//             }}
//             className={`h-2 rounded-full transition-all duration-300 ${
//               current === index
//                 ? "w-8 bg-primary"
//                 : "w-3 bg-gray-400 hover:bg-primary/70"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apiUrl } from "../config";
import axios from "axios";
import { LuMoveUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function HeaderHero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchHeaderBanner = async () => {
      try {
        const res = await axios.post(`${apiUrl}/headerBannerList`);

        if (res.data?.success) {
          setSlides(res.data.data || []);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Header Banner Error:", error);
      }
    };

    fetchHeaderBanner();
  }, []);

  const resetAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!slides.length) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
  }, [slides]);

  useEffect(() => {
    if (!slides.length) return;

    resetAuto();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides, resetAuto]);

  const activeSlide = slides[current] || {};

  const mediaVideo =
    activeSlide?.media_video ||
    activeSlide?.mediaVideo ||
    activeSlide?.video_url ||
    "";

  const mediaUrl =
    activeSlide?.media_url ||
    activeSlide?.mediaUrl ||
    activeSlide?.photo_url ||
    activeSlide?.image_url ||
    "";

  const finalMedia = mediaVideo || mediaUrl;

  const isVideo =
    Boolean(mediaVideo) || /\.(mp4|webm|ogg|mov)$/i.test(finalMedia);

  return (
    <section className="relative h-[calc(100vw*720/425)] min-h-[420px] max-h-[620px] w-full overflow-hidden bg-[#e5e5e5] font-heading sm:h-[620px] md:h-[680px] lg:h-[calc(100vw*720/1920)] lg:min-h-[520px] lg:max-h-[720px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeSlide.id || current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
        {isVideo && finalMedia ? (
  <video
    src={finalMedia}
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover object-[center_center] lg:object-center"
  />
) : (
  <div
    className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: finalMedia ? `url(${finalMedia})` : "none",
    }}
  />
)}
        </motion.div>
      </AnimatePresence>

      {/* Responsive Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/85 via-white/45 to-white/10 md:from-white/65 md:via-white/25 md:to-transparent" />
      <div className="absolute inset-0 z-10 bg-black/5" />

      {/* Text Content */}
      <div className="absolute inset-x-0 top-1/2 z-20 w-full -translate-y-1/2 px-5 sm:px-8 md:px-12 lg:px-20 2xl:px-32">
        <div
          className="max-w-[92%] sm:max-w-[620px] lg:max-w-[760px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.h1
                key={`title-${activeSlide.id || current}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="whitespace-pre-line break-words font-body text-[32px] font-semibold leading-[1.12] text-primary sm:text-[40px] md:text-[48px] lg:text-[54px] xl:text-[58px]"
              >
                {activeSlide.title}
              </motion.h1>
            ) : (
              <motion.h1
                key={`headline-${activeSlide.id || current}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="whitespace-pre-line break-words font-heading text-[32px] font-bold uppercase leading-[1.12] text-primary sm:text-[40px] md:text-[48px] lg:text-[54px] xl:text-[58px]"
              >
                We Build Your Brand
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 flex justify-start sm:mt-8"
          >
            <button
              type="button"
              onClick={() => {
                if (activeSlide.button_url) {
                  router.push(activeSlide.button_url);
                }
              }}
              className="motion-shine group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 sm:px-7 sm:py-3 sm:text-[15px]"
            >
              {activeSlide.button_title || "Let's Build"}

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <LuMoveUpRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 sm:bottom-8 sm:gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id || index}
              type="button"
              onClick={() => {
                setCurrent(index);
                resetAuto();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-7 bg-primary sm:w-8"
                  : "w-2.5 bg-gray-400 hover:bg-primary/70 sm:w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}