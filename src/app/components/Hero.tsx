"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apiUrl } from "../config";
import axios from "axios";
import { HiArrowUpRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";

// const slides = [
//   {
//     id: 1,
//     eyebrow: "From Idea to Execution",
//     headline: "We Build Your Brand",
//     gif: "/assets/Homepage banner/lightbulb.gif",
//   },
//   {
//     id: 2,
//     eyebrow: "Win every\nmoment of truth",
//     headline: "We Build Your Brand",
//     gif: "/assets/Homepage banner/homebanner2.gif",
//   },
//   {
//     id: 3,
//     eyebrow: "Don't chase\nyour customers",
//     headline: "We Build Your Brand",
//     gif: "/assets/Homepage banner/homebanner3.gif",
//   },
//   {
//     id: 4,
//     eyebrow: "Create an\nimpactful moat",
//     headline: "We Build Your Brand",
//     gif: "/assets/Homepage banner/homebanner4.gif",
//   },
// ];

// const TOTAL = slides.length;

export default function HeaderHero() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);
const router=useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const fetchHeaderBanner = async () => {
      try {
        const res = await axios.post(
          `${apiUrl}/headerBannerList`
        );
  
        if (res.data.success) {
          setSlides(res.data.data);
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
const TOTAL = slides.length || 1;
const activeSlide = slides[current] || {};
const mediaUrl = activeSlide?.photo_url || "";

const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(mediaUrl);

return (
  <section className="relative w-full overflow-hidden bg-[#e5e5e5] font-heading h-[calc(100vw*720/1900)] max-h-[720px] min-h-[420px]">
    <AnimatePresence mode="wait">
      <motion.div
        key={`media-${activeSlide.id || current}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {isVideo ? (
          <video
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-fill"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={activeSlide.title || "Banner"}
            className="h-full w-full object-fill"
          />
        )}
      </motion.div>
    </AnimatePresence>

    <div className="absolute inset-0 z-10 bg-white/5" />

    <div className="relative z-20 flex h-full w-full items-center px-6 sm:px-8 lg:px-20 2xl:px-32">
      <div
        className="max-w-[760px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.h1
              key={`eyebrow-${activeSlide.id || current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="whitespace-pre-line font-body text-[30px] font-semibold leading-[1.15] text-primary sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[58px]"
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
              className="whitespace-pre-line font-heading text-[30px] font-bold uppercase leading-[1.15] text-primary sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[58px]"
            >
              We Build Your Brand
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          onClick={() => {
            if (activeSlide.button_url) router.push(activeSlide.button_url);
          }}
          className="mt-8 flex justify-start"
        >
          <button className="motion-shine group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
            {activeSlide.button_title || "Let's Build"}

            <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <HiArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          onClick={() => {
            setCurrent(index);
            resetAuto();
          }}
          className={`h-2 rounded-full transition-all duration-300 ${
            current === index
              ? "w-8 bg-primary"
              : "w-3 bg-gray-400 hover:bg-primary/70"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </section>
);
}
