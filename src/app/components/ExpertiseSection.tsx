// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import img1 from "../assets/Expertise.jpg";

// const expertiseData = [
//     { id: 1, title: "Market Research", image: img1 },
//     { id: 2, title: "Strategic Brand Consulting", image: img1 },
//     { id: 3, title: "Brand Identity Creation", image: img1 },
//     { id: 4, title: "Product Launch", image: img1 },
//     { id: 5, title: "Conceptual Packaging Design", image: img1 },
//     { id: 6, title: "Advertising Campaign Design", image: img1 },
//     { id: 7, title: "Marketing Collateral Design", image: img1 },
// ];

// const ITEM_HEIGHT = 64;
// const TOTAL_ITEMS = expertiseData.length;
// const VISIBLE_COUNT = 5;
// const SLIDE_INTERVAL = 2000;

// export default function ExpertiseSection() {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [direction, setDirection] = useState(1);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setDirection(1);
//             setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
//         }, SLIDE_INTERVAL);
//         return () => clearInterval(interval);
//     }, []);

//     const getVisibleItems = () => {
//         return [0, 1, 2, 3, 4].map((offset) => {
//             const index = (activeIndex + offset + TOTAL_ITEMS) % TOTAL_ITEMS;
//             return { ...expertiseData[index], offset };
//         });
//     };

//     return (
//         <section className="relative bg-[#f5f5f3] py-16 md:py-20 xl:py-24">
//             <div className="mx-auto w-full max-w-7xl px-6 md:px-10 xl:px-16">

//                 <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-12 xl:gap-16">

//                     {/* Left Side: Heading + Image */}
//                     <div className="flex w-full lg:w-[45%] flex-col items-start gap-6">
//                         <h2 className="text-4xl md:text-5xl xl:text-6xl font-medium leading-tight text-[#4a4a4a]">
//                             Expertise
//                         </h2>
//                         <div className="relative aspect-square w-full max-w-[300px] md:max-w-[380px] xl:max-w-[440px] overflow-hidden">
//                             <AnimatePresence mode="wait">
//                                 <motion.img
//                                     key={expertiseData[activeIndex].id}
//                                     src={expertiseData[activeIndex].image.src}
//                                     alt={expertiseData[activeIndex].title}
//                                     initial={{ opacity: 0, scale: 0.95 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 1.05 }}
//                                     transition={{ duration: 0.5, ease: "easeOut" }}
//                                     className="absolute inset-0 h-full w-full object-contain p-4"
//                                 />
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                     {/* Right Side: Scrolling Text — vertically centered */}
//                     <div className="flex w-full lg:w-[55%] items-center justify-start min-w-0">
//                         <div
//                             className="relative overflow-hidden w-full"
//                             style={{
//                                 height: `${ITEM_HEIGHT * VISIBLE_COUNT}px`,
//                                 maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
//                                 WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
//                             }}
//                         >
//                             <AnimatePresence mode="popLayout" initial={false}>
//                                 {getVisibleItems().map(({ id, title, offset }) => (
//                                     <motion.div
//                                         key={`${id}-${offset}`}
//                                         initial={{ y: direction * ITEM_HEIGHT, opacity: 0 }}
//                                         animate={{ y: 0, opacity: 1 }}
//                                         exit={{ y: -direction * ITEM_HEIGHT, opacity: 0 }}
//                                         transition={{ duration: 0.45, ease: "easeInOut" }}
//                                         style={{ height: `${ITEM_HEIGHT}px` }}
//                                         className="flex items-center justify-start w-full"
//                                     >
//                                         <span
//                                             className={`block w-full text-left leading-tight whitespace-normal break-words transition-colors duration-300
//       text-xl sm:text-2xl md:text-3xl lg:text-[28px] xl:text-[34px] 2xl:text-[40px]
//       ${offset === 0 ? "text-primary" : "text-[#c0b8b8]"}`}
//                                         >
//                                             {title}
//                                         </span>
//                                     </motion.div>
//                                 ))}
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/Expertise.jpg";

const expertiseData = [
    { id: 1, title: "Market Research", image: img1 },
    { id: 2, title: "Strategic Brand Consulting", image: img1 },
    { id: 3, title: "Brand Identity Creation", image: img1 },
    { id: 4, title: "Product Launch", image: img1 },
    { id: 5, title: "Conceptual Packaging Design", image: img1 },
    { id: 6, title: "Advertising Campaign Design", image: img1 },
    { id: 7, title: "Marketing Collateral Design", image: img1 },
];

const ITEM_HEIGHT = 72;
const TOTAL_ITEMS = expertiseData.length;
const VISIBLE_COUNT = 5;
const SLIDE_INTERVAL = 2000;

export default function ExpertiseSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const getVisibleItems = () => {
        return [0, 1, 2, 3, 4].map((offset) => {
            const index = (activeIndex + offset) % TOTAL_ITEMS;
            return { ...expertiseData[index], offset };
        });
    };

    return (
        <section className="relative bg-[#f5f5f3] py-16 md:py-20 xl:py-24">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10 xl:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20">

                    {/* Left Side */}
                    <div className="w-full lg:w-[45%]">
                        <h2 className="text-5xl md:text-6xl xl:text-7xl font-medium text-[#4a4a4a] mb-10">
                            Expertise
                        </h2>

                        <div className="w-full max-w-[420px]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={expertiseData[activeIndex].id}
                                    src={expertiseData[activeIndex].image.src}
                                    alt={expertiseData[activeIndex].title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-auto object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-[55%] flex items-center">
                        <div
                            className="relative overflow-hidden w-full"
                            style={{
                                height: `${ITEM_HEIGHT * VISIBLE_COUNT}px`,
                            }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {getVisibleItems().map(({ id, title, offset }) => (
                                    <motion.div
                                        key={`${id}-${offset}`}
                                        initial={{ y: direction * ITEM_HEIGHT, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -direction * ITEM_HEIGHT, opacity: 0 }}
                                        transition={{ duration: 0.45 }}
                                        style={{ height: `${ITEM_HEIGHT}px` }}
                                        className="flex items-center"
                                    >
                                        <span
                                            className={`block w-full text-left leading-tight transition-all duration-300
                      text-[32px] md:text-[40px] xl:text-[48px]
                      ${offset === 0
                                                    ? "text-primary font-medium"
                                                    : "text-[#c8c0c0]"
                                                }`}
                                        >
                                            {title}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}