"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { apiUrl } from "../config";
import axios from "axios";

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
    <section className="relative overflow-hidden bg-[#e5e5e5] font-heading">
      <div className="relative grid min-h-[calc(100vh-120px)] grid-cols-1 lg:grid-cols-[40%_60%]">
        {/* Left Side */}
        <div className="relative z-20 flex min-h-[48vh] items-center bg-[#e5e5e5] px-6 py-10 sm:px-8 md:px-12 lg:min-h-[calc(100vh-120px)]  lg:pr-0 lg:pl-20 2xl:pl-32">
          <div
            className="w-full max-w-[620px] text-center lg:text-left"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative flex min-h-[100px] items-center justify-center sm:min-h-[115px] md:min-h-[130px] lg:justify-start">
              <AnimatePresence mode="wait">
                {!isHovered ? (
                  <motion.h1
                    key={`eyebrow-${activeSlide.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    className="whitespace-pre-line lg:whitespace-nowrap font-body text-[24px] leading-[1.05]  text-primary font-semibold sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[50px]"
                  >
                    {activeSlide.title}
                  </motion.h1>
                ) : (
                  <motion.h1
                    key={`headline-${activeSlide.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    className="whitespace-pre-line lg:whitespace-nowrap font-heading text-[24px] font-bold uppercase leading-[1.05] text-primary sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px]"
                  >
We Build Your Brand                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-5 flex justify-center lg:justify-start"
            >
              <Link
                href={activeSlide.button_url || ""}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#8f1f57]"
              >
                {activeSlide.button_title || " "}
                <span className="flex h-5 w-5 items-center justify-center rounded-full  transition-all duration-300 group-hover:-rotate-45">
                  <FaArrowRightLong size={20} className="text-white" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Side GIF */}
        <div className="relative min-h-[35vh] sm:min-h-[42vh] md:min-h-[50vh] overflow-hidden bg-[#e5e5e5] lg:min-h-[calc(100vh-120px)]">
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={`gif-${activeSlide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                 src={activeSlide.photo_url || ""}
  alt={activeSlide.title || "Banner"}
                className="h-full w-full object-cover object-right mix-blend-multiply"
              />
            </motion.div>
          </AnimatePresence> */}
          <AnimatePresence mode="wait">
  <motion.div
    key={`media-${activeSlide.id}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="absolute inset-0 h-full w-full"
  >
    {isVideo ? (
      <video
        src={mediaUrl}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover object-right mix-blend-multiply"
      />
    ) : (
      <img
        src={mediaUrl}
        alt={activeSlide.title || "Banner"}
        className="h-full w-full object-cover object-right mix-blend-multiply"
      />
    )}
  </motion.div>
</AnimatePresence>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#e5e5e5] via-[#e5e5e5]/70 to-transparent lg:block" />
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                setCurrent(index);
                resetAuto();
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-7 bg-primary"
                  : "w-3 bg-gray-400 hover:bg-primary/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
