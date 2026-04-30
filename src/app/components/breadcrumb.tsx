"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const slide = {
    id: 1,
    eyebrow: "From Idea to Execution",
    headline: "We Build Your Brand",
    video: "/assets/Homepage banner/Banner-1.mp4",
};

export default function Breadcrumb() {
    const [isHovered, setIsHovered] = useState(false);
    const [showCursorButton, setShowCursorButton] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            className="relative overflow-hidden bg-[#e5e5e5] py-10 font-heading cursor-none"
            onMouseEnter={() => setShowCursorButton(true)}
            onMouseLeave={() => setShowCursorButton(false)}
            onMouseMove={handleMouseMove}
        >
            <div className="relative z-10 mx-auto max-w-full px-6 md:px-10 lg:px-16">
         

                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2"
                    >
                        {/* Left content */}
                        <div
                            className="relative text-2xl lg:text-4xl"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {!isHovered ? (
                                <span className="whitespace-pre-line font-body text-[#4f4f4f]">
                                    {slide.eyebrow}
                                </span>
                            ) : (
                                <span className="font-bold font-heading text-primary">
                                    {slide.headline}
                                </span>
                            )}
                        </div>

                        {/* Right video */}
                        <div className="relative flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative aspect-square w-full max-w-62.5 overflow-hidden rounded-full bg-white shadow-[0_30px_100px_rgba(0,0,0,0.05)]"
                            >
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="h-full w-full object-cover mix-blend-multiply"
                                    style={{ filter: "contrast(1.05) brightness(1.05)" }}
                                >
                                    <source src={slide.video} type="video/mp4" />
                                </video>

                                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]" />
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Custom cursor button only inside section */}
            <AnimatePresence>
                {showCursorButton && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: cursorPos.x - 56,
                            y: cursorPos.y - 56,
                        }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                        }}
                        className="pointer-events-none absolute left-0 top-0 z-50 flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-center text-[11px] font-semibold text-white shadow-xl"
                    >
                        LET&apos;S BUILD!
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
}