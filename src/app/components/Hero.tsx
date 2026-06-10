// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion, type Variants } from "framer-motion";
// import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
// import { BsArrowUpRightCircleFill } from "react-icons/bs";
// import logo from "../assets/ppc-combined-logo.png";
// import { useSidebar } from "./SidebarContext";
// import { RotateCcw } from "lucide-react";

// const navItems = [
//     { label: "Home", href: "/" },
//     { label: "About Us", href: "about" },
//     { label: "Case Studies", href: "CaseStudies" },
//     { label: "Portfolio", href: "Portfolio" },
//     { label: "Career", href: "Career" },
//     { label: "Knowledge Corner", href: "KnowledgeCorner" },
//     { label: "Contact", href: "contact" },
// ];

// const slides = [
//     {
//         id: 1,
//         eyebrow: "From Idea to Execution",
//         headline: "We Build Your Brand",
//         video: "/assets/Homepage banner/Banner-1.mp4",
//     },
//     {
//         id: 2,
//         eyebrow: "Win every\nmoment of truth",
//         headline: "We Build Your Brand",
//         video: "/assets/Homepage banner/Banner-2.mp4",
//     },
//     {
//         id: 3,
//         eyebrow: "Don't chase\nyour customers",
//         headline: "We Build Your Brand",
//         video: "/assets/Homepage banner/Banner-3.mp4",
//     },
//     {
//         id: 4,
//         eyebrow: "Create an\nimpactful moat",
//         headline: "We Build Your Brand",
//         video: "/assets/Homepage banner/Banner-4.mp4",
//     },
// ];

// const TOTAL = slides.length;

// const sidebarVariants: Variants = {
//     hidden: {
//         x: "100%",
//         transition: { type: "spring", stiffness: 260, damping: 28 },
//     },
//     visible: {
//         x: 0,
//         transition: { type: "spring", stiffness: 260, damping: 28 },
//     },
//     exit: {
//         x: "100%",
//         transition: { type: "spring", stiffness: 260, damping: 28 },
//     },
// };

// const linkVariants: Variants = {
//     hidden: {
//         x: 30,
//         opacity: 0,
//     },
//     visible: (i: number = 0) => ({
//         x: 0,
//         opacity: 1,
//         transition: {
//             delay: 0.12 + i * 0.08,
//             duration: 0.45,
//             ease: "easeOut",
//         },
//     }),
// };

// export default function HeaderHero() {
//     const [isHovered, setIsHovered] = useState(false);
//     const [current, setCurrent] = useState(0);
//     const [showCursorButton, setShowCursorButton] = useState(false);
//     const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

//     const timerRef = useRef<NodeJS.Timeout | null>(null);

//     const resetAuto = useCallback(() => {
//         if (timerRef.current) clearInterval(timerRef.current);

//         timerRef.current = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % TOTAL);
//         }, 5500);
//     }, []);

//     useEffect(() => {
//         resetAuto();

//         return () => {
//             if (timerRef.current) clearInterval(timerRef.current);
//         };
//     }, [resetAuto]);

//     const activeSlide = slides[current];

//     const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
//         const rect = e.currentTarget.getBoundingClientRect();

//         setCursorPos({
//             x: e.clientX - rect.left,
//             y: e.clientY - rect.top,
//         });
//     };


//     return (
//         <div className="bg-[#e5e5e5]">
//             <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#e5e5e5] font-heading">


//                 {/* Hero Section */}
//                 <div
//                     // className="relative z-10 flex flex-1 w-full cursor-none items-center px-6 pb-10 md:px-12 lg:px-16 2xl:pb-16"
//                     className={`relative z-10 flex flex-1 w-full items-center px-6 pb-10 md:px-12 lg:px-16 2xl:pb-16 ${isHovered ? "cursor-auto" : "cursor-none"
//                         }`}
//                     onMouseEnter={() => setShowCursorButton(true)}
//                     onMouseLeave={() => setShowCursorButton(false)}
//                     onMouseMove={handleMouseMove}
//                 >
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={activeSlide.id}
//                             initial={{ opacity: 0, y: 24 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -24 }}
//                             transition={{ duration: 0.6, ease: "easeOut" }}
//                             className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] xl:gap-12"
//                         >
//                             <div
//                                 className="relative text-4xl leading-tight sm:text-5xl md:text-6xl 2xl:text-7xl"
//                                 onMouseEnter={() => setIsHovered(true)}
//                                 onMouseLeave={() => setIsHovered(false)}
//                             >
//                                 <div className="flex min-h-[160px] items-center">
//                                     {!isHovered ? (
//                                         <h1 className="whitespace-pre-line font-body lg:whitespace-nowrap">
//                                             {activeSlide.eyebrow}
//                                         </h1>
//                                     ) : (
//                                         <h1 className="font-heading font-bold uppercase text-primary lg:whitespace-nowrap">
//                                             {activeSlide.headline}
//                                         </h1>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="relative flex justify-center lg:justify-end">
//                                 <motion.div
//                                     initial={{ opacity: 0, scale: 0.9 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.7, ease: "easeOut" }}
//                                     className="
//       relative aspect-square overflow-hidden rounded-full
//       w-[230px]
//       sm:w-[250px]
//       md:w-[300px]
//       lg:w-[350px]
//       xl:w-[400px]
//       2xl:w-[520px]
//     "
//                                 >
//                                     <video
//                                         key={activeSlide.video}
//                                         autoPlay
//                                         loop
//                                         muted
//                                         playsInline
//                                         className="h-full w-full rounded-full object-cover mix-blend-multiply"
//                                     >
//                                         <source src={activeSlide.video} type="video/mp4" />
//                                     </video>
//                                 </motion.div>
//                             </div>
//                         </motion.div>
//                     </AnimatePresence>

//                     {/* Let's Build Cursor */}
//                     <AnimatePresence>
//                         {showCursorButton && !isHovered && (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0 }}
//                                 animate={{
//                                     opacity: 1,
//                                     scale: 1,
//                                     x: cursorPos.x - 48,
//                                     y: cursorPos.y - 48,
//                                 }}
//                                 transition={{
//                                     type: "spring",
//                                     stiffness: 160,
//                                     damping: 22,
//                                     mass: 0.45,
//                                 }}
//                                 exit={{ opacity: 0, scale: 0 }}
//                                 className="pointer-events-none absolute left-0 top-0 z-[55] hidden h-24 w-24 items-center justify-center rounded-full bg-secondary text-center text-[11px] font-bold uppercase tracking-wide text-white shadow-2xl lg:flex"
//                             >
//                                 LET&apos;S BUILD!
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* Slider Dots */}
//                     <div className="absolute bottom-8 left-1/2 z-[50] flex -translate-x-1/2 items-center gap-3">
//                         {slides.map((slide, index) => (
//                             <button
//                                 key={slide.id}
//                                 onClick={() => {
//                                     setCurrent(index);
//                                     resetAuto();
//                                 }}
//                                 className={`h-2 rounded-full transition-all duration-300 ${current === index
//                                     ? "w-5 bg-primary"
//                                     : "w-3 bg-gray-400 hover:bg-primary/70"
//                                     }`}
//                                 aria-label={`Go to slide ${index + 1}`}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </section>


//         </div>
//     );
// }


"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";

const slides = [
    {
        id: 1,
        eyebrow: "From Idea to Execution",
        headline: "We Build Your Brand",
        gif: "/assets/Homepage banner/Idea_to_brand_execution_animation.gif",
    },
    {
        id: 2,
        eyebrow: "Win every\nmoment of truth",
        headline: "We Build Your Brand",
        gif: "/assets/Homepage banner/Idea_to_brand_execution_animation.gif",
    },
    {
        id: 3,
        eyebrow: "Don't chase\nyour customers",
        headline: "We Build Your Brand",
        gif: "/assets/Homepage banner/Idea_to_brand_execution_animation.gif",
    },
    {
        id: 4,
        eyebrow: "Create an\nimpactful moat",
        headline: "We Build Your Brand",
        gif: "/assets/Homepage banner/Idea_to_brand_execution_animation.gif",
    },
];

const TOTAL = slides.length;

export default function HeaderHero() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

 const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const resetAuto = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % TOTAL);
        }, 5500);
    }, []);

    useEffect(() => {
        resetAuto();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resetAuto]);

    const activeSlide = slides[current];

    return (
        <section className="relative overflow-hidden bg-[#e5e5e5] font-heading">
            <div className="relative grid min-h-[calc(100vh-120px)] grid-cols-1 lg:grid-cols-[40%_60%]">
                {/* Left Side */}
                <div className="relative z-20 flex min-h-[48vh] items-center bg-[#e5e5e5] px-6 py-10 sm:px-8 md:px-12 lg:min-h-[calc(100vh-120px)] lg:pl-14 lg:pr-0 xl:pl-20">
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
                    className="whitespace-nowrap font-body text-[24px] leading-[1.05] text-[#3f3f3f] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px]"
                >
                    {activeSlide.eyebrow}
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
                    className="whitespace-nowrap font-heading text-[24px] font-bold uppercase leading-[1.05] text-primary sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px]"
                >
                    {activeSlide.headline}
                </motion.h1>
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
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#8f1f57]"
                            >
                                Let&apos;s Build

                                <span className="flex h-5 w-5 items-center justify-center rounded-full  transition-all duration-300 group-hover:-rotate-45">
                                    <FaArrowRightLong
                                        size={20}
                                        className="text-white"
                                    />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side GIF */}
                <div className="relative min-h-[52vh] overflow-hidden bg-[#e5e5e5] lg:min-h-[calc(100vh-120px)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`gif-${activeSlide.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="absolute inset-0 h-full w-full"
                        >
                            <img
                                src={activeSlide.gif}
                                alt={activeSlide.eyebrow}
                                className="h-full w-full object-cover object-right mix-blend-multiply"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#e5e5e5] via-[#e5e5e5]/70 to-transparent lg:block" />
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
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