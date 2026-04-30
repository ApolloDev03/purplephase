// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import casestudy from "../assets/Case study-1.jpeg";
// import caseicon from "../assets/caseicon.png";

// const brandStories = [
//     {
//         id: 1,
//         brandName: "WHISKERS",
//         productImage: casestudy.src,
//         iconImage: caseicon.src,
//     },
//     {
//         id: 2,
//         brandName: "SALEXO",
//         productImage: casestudy.src,
//         iconImage: caseicon.src,
//     },
// ];

// const TOTAL = brandStories.length;

// export default function BrandPage() {
//     const sectionRef = useRef<HTMLElement | null>(null);

//     const { scrollYProgress } = useScroll({
//         target: sectionRef,
//         offset: ["start start", "end end"],
//     });

//     return (
//         <main className="bg-[#e5e5e5] font-sans py-10">
//             <section
//                 ref={sectionRef}
//                 className="relative"
//                 style={{ height: `${(TOTAL + 2) * 100}vh` }}
//             >
//                 <div className="sticky top-0 h-screen overflow-hidden px-5 py-10 md:px-10 lg:px-16">
//                     <div className="mb-6">
//                         <h2 className="text-3xl font-medium text-[#626262] md:text-5xl">
//                             Story Behind Brand Building
//                         </h2>
//                         <p className="mt-2 text-sm text-[#7b7b7b] md:text-base">
//                             Explore the process behind crafting memorable brand experiences.
//                         </p>
//                     </div>

//                     <div className="relative  h-[calc(100vh-150px)] overflow-hidden rounded-[30px] md:rounded-[42px]">
//                         {brandStories.map((item, i) => (
//                             <ScrollSlide
//                                 key={item.id}
//                                 item={item}
//                                 index={i}
//                                 total={TOTAL}
//                                 progress={scrollYProgress}
//                             />
//                         ))}
//                     </div>

//                     <div className="mt-5 flex items-center justify-center">
//                         <motion.button
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.98 }}
//                             className="flex items-center justify-center gap-2 rounded-full bg-[#A62666] px-8 py-3.5 text-sm font-bold text-white shadow-lg"
//                         >
//                             Case Studies <ArrowUpRight size={16} />
//                         </motion.button>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// }

// function ScrollSlide({ item, index, total, progress }: any) {
//     const N = total + 2;

//     const enterStart = index / N;
//     const stayStart = (index + 1) / N;
//     const stayEnd = (index + 2) / N;
//     const exitEnd = (index + 3) / N;

//     const isFirst = index === 0;
//     const isLast = index === total - 1;

//     const yInputs = isFirst
//         ? [0, stayStart, stayEnd, Math.min(exitEnd, 1)]
//         : [enterStart, stayStart, stayEnd, Math.min(exitEnd, 1)];

//     const yOutputs = isFirst
//         ? ["0%", "0%", isLast ? "0%" : "-100%", isLast ? "0%" : "-100%"]
//         : ["100%", "0%", isLast ? "0%" : "-100%", isLast ? "0%" : "-100%"];

//     const y = useTransform(progress, yInputs, yOutputs);

//     const opacityOutputs = isFirst
//         ? [1, 1, isLast ? 1 : 0, isLast ? 1 : 0]
//         : [0, 1, isLast ? 1 : 0, isLast ? 1 : 0];

//     const opacity = useTransform(progress, yInputs, opacityOutputs);

//     const scale = useTransform(
//         progress,
//         yInputs,
//         isFirst
//             ? [1, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.96]
//             : [0.96, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.96]
//     );

//     const rotate = useTransform(
//         progress,
//         yInputs,
//         isFirst
//             ? [0, 0, isLast ? 0 : -2, isLast ? 0 : -2]
//             : [2, 0, isLast ? 0 : -2, isLast ? 0 : -2]
//     );

//     return (
//         <motion.div
//             style={{ y, opacity, scale, rotate }}
//             className="absolute inset-0 overflow-hidden rounded-[30px] bg-black md:rounded-[42px]"
//         >
//             <img
//                 src={item.productImage}
//                 alt={item.brandName}
//                 className="absolute inset-0 h-full w-full object-cover"
//             />

//             <div className="absolute inset-0 bg-black/5" />

//             <img
//                 src={item.iconImage}
//                 alt={`${item.brandName} icon`}
//                 className="absolute right-6 bottom-6 w-[150px] object-contain sm:w-[180px] md:w-[220px] lg:w-[240px]"
//             />
//         </motion.div>
//     );
// }


"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import casestudy from "../assets/Case study-1.jpeg";
import caseicon from "../assets/caseicon.png";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

const brandStories = [
    {
        id: 1,
        brandName: "WHISKERS",
        description: "One of the pioneering brands in India’s male grooming segment",
        awardText: "Winner - Foxglove Award",
        productImage: casestudy.src,
        iconImage: caseicon.src,
    },
    {
        id: 2,
        brandName: "SALEXO",
        description: "A creative brand story crafted with strong visual communication",
        awardText: "Winner - Foxglove Award",
        productImage: casestudy.src,
        iconImage: caseicon.src,
    },
];

const TOTAL = brandStories.length;

export default function BrandPage() {
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="bg-[#e5e5e5] font-sans py-10">
            <section
                ref={sectionRef}
                className="relative"
                style={{ height: `${(TOTAL + 2) * 100}vh` }}
            >
                <div className="sticky top-0 h-screen overflow-hidden px-5 py-10 md:px-10 lg:px-16">
                    <div className="mb-6">
                        <h2 className="text-3xl font-medium text-[#626262] md:text-5xl">
                            Story Behind Brand Building
                        </h2>
                        <p className="mt-2 text-sm text-[#7b7b7b] md:text-base">
                            Explore the process behind crafting memorable brand experiences.
                        </p>
                    </div>

                    <div className="relative h-[calc(100vh-150px)] overflow-hidden">
                        {brandStories.map((item, i) => (
                            <ScrollSlide
                                key={item.id}
                                item={item}
                                index={i}
                                total={TOTAL}
                                progress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

function ScrollSlide({ item, index, total, progress }: any) {
    const N = total + 2;

    const enterStart = index / N;
    const stayStart = (index + 1) / N;
    const stayEnd = (index + 2) / N;
    const exitEnd = (index + 3) / N;

    const isFirst = index === 0;
    const isLast = index === total - 1;

    const yInputs = isFirst
        ? [0, stayStart, stayEnd, Math.min(exitEnd, 1)]
        : [enterStart, stayStart, stayEnd, Math.min(exitEnd, 1)];

    const yOutputs = isFirst
        ? ["0%", "0%", isLast ? "0%" : "-100%", isLast ? "0%" : "-100%"]
        : ["100%", "0%", isLast ? "0%" : "-100%", isLast ? "0%" : "-100%"];

    const y = useTransform(progress, yInputs, yOutputs);

    const opacityOutputs = isFirst
        ? [1, 1, isLast ? 1 : 0, isLast ? 1 : 0]
        : [0, 1, isLast ? 1 : 0, isLast ? 1 : 0];

    const opacity = useTransform(progress, yInputs, opacityOutputs);

    const scale = useTransform(
        progress,
        yInputs,
        isFirst
            ? [1, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.96]
            : [0.96, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.96]
    );

    const rotate = useTransform(
        progress,
        yInputs,
        isFirst
            ? [0, 0, isLast ? 0 : -2, isLast ? 0 : -2]
            : [2, 0, isLast ? 0 : -2, isLast ? 0 : -2]
    );

    return (
        <motion.div
            style={{ y, opacity, scale, rotate }}
            className="absolute inset-0"
        >
            <div className="relative h-full">
                {/* Image Area */}
                <div className="relative h-[300px]  lg:h-[380px] 2xl:h-[525px] overflow-hidden rounded-[30px] bg-black md:rounded-[42px]">
                    <img
                        src={item.productImage}
                        alt={item.brandName}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                    />

                    <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Bottom Content Area */}
                <div className="relative flex min-h-[28%] items-start justify-between px-5 pt-7 md:px-8">
                    <div>
                        <h3 className="text-2xl font-body leading-none  uppercase text-[#A62666] md:text-3xl lg:text-4xl 2xl:text-5xl" style={{fontWeight:"bold"}}>
                            {item.brandName}
                        </h3>
                        <p className="mt-1 text-sm text-[#686868] md:text-base lg:text-xl 2xl:text-2xl">
                            {item.description}
                        </p>
                    </div>

                    <div className="relative -mt-28 flex flex-col items-center md:-mt-45 2xl:-mt-45">
                        <img
                            src={item.iconImage}
                            alt={`${item.brandName} icon`}
                            className="w-[110px] object-contain sm:w-[140px] md:w-[170px]"
                        />
                        <p className="mt- text-xs text-[#686868] md:text-[20px]">
                            {item.awardText}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-[#A62666] text-white px-6 py-2 rounded-md  font-semiBold flex items-center gap-2"
                            >
                              Case Studies <HiOutlineArrowUpRight  size={14} />
                            </motion.button>
                </div>
            </div>
        </motion.div>
    );
}