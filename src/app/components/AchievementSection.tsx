"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import client1 from "../assets/sachin-thakkar.jpg";
import { FaQuoteRight } from 'react-icons/fa';

// --- Animated Counter Logic ---
const CounterItem = ({ value, label, color }: { value: string; label: string; color: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const numericTarget = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericTarget, {
                duration: 2,
                ease: "easeOut",
            });

            const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));

            return () => {
                controls.stop();
                unsubscribe();
            };
        }
    }, [isInView, numericTarget, count, rounded]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center text-center">
            <p
                className="font-heading text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-semibold not-italic mb-1 scale-y-110"
                style={{ color }}
            >
                {displayValue}
                {suffix}
            </p>
            {/* <p className="text-[#666666] font-bold text-[10px] 2xl:text-2xl md:text-xs uppercase tracking-[0.2em] leading-tight not-italic">
                {label}
            </p> */}
            <p className="text-[#666666]  text-[10px] 2xl:text-2xl md:text-xs uppercase tracking-[2px] leading-tight not-italic">
                {label}
            </p>
        </div>
    );
};

const testimonials = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        client: "Client Name",
        image: client1.src,
    },
    {
        id: 2,
        text: "Another brilliant project delivered on time. The team handled branding, strategy, and execution with great attention to detail. Their communication and creative direction were excellent throughout the project.",
        client: "Nirali Kotak",
        image: client1.src,
    },
];

export default function AchievementSection() {
    const [testIndex, setTestIndex] = useState(0);

    return (
        <section className="py-20 bg-[#e5e5e5] font-sans">
            <div className="max-w-full mx-auto px-6 md:px-10">


                <div className="bg-white  rounded-[20px] md:rounded-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 mb-16 md:mb-24 py-10 md:pt-16 md:pb-10  shadow-sm">
                    <CounterItem value="15+" label="Successful Years" color="#A62666" />
                    <CounterItem value="20+" label="Industries Served" color="#999999" />
                    <CounterItem value="500+" label="Satisfied Clients" color="#F58220" />
                    <CounterItem value="3000+" label="Completed Projects" color="#999999" />
                </div>

                <div className="relative">
                    <h2 className="text-[40px]  font-medium text-[#666666] mb-10 tracking-tight">
                        Pat on the Back
                    </h2>

                    <div className="relative">
                        {/* Main Card Container */}
                        <div className="relative">
                            {/* Top Content Box */}
                            <div className="bg-white rounded-[30px] rounded-bl-[50px] rounded-br-none p-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-start">
                                <div className="flex justify-center md:justify-start">
                                    <img
                                        src={testimonials[testIndex].image}
                                        alt="logo"
                                        className=" grayscale opacity-70"
                                    />
                                </div>

                                <div className="relative overflow-hidden min-h-35">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={testimonials[testIndex].id}
                                            initial={{ opacity: 0, x: 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -40 }}

                                            transition={{ duration: 0.4 }}
                                            className="text-[#666666]  leading-8  text-lg"
                                        >
                                            {testimonials[testIndex].text}
                                        </motion.p>
                                    </AnimatePresence>

                                </div>
                            </div>

                            {/* Bottom Row: Quote and Name */}
                            <div className="flex justify-center md:justify-start items-start ">
                                {/* Quote Box */}
                                <div className="relative bg-white w-24 h-20 md:w-32 md:h-24 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#e5e5e5] rounded-tr-[20px]"></div>
                                    <FaQuoteRight className="relative text-[#F58220] text-6xl font-bold" />
                                </div>

                                {/* Client Name Box */}
                                <div className="flex-1 bg-white h-20 flex items-center px-6 md:px-28 rounded-bl-[20px] rounded-br-[30px] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.h4
                                            key={`client-${testimonials[testIndex].id}`}
                                            initial={{ opacity: 0, x: 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -40 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-[#A62666]  text-3xl leading-none "
                                        >
                                            {testimonials[testIndex].client}
                                        </motion.h4>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex justify-center gap-2 ">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTestIndex(i)}
                                    className={`h-2 w-2 rounded-full transition-all ${i === testIndex ? "bg-[#A62666] w-4" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}