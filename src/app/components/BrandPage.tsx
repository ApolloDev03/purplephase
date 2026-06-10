// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import axios from "axios";
// import { HiOutlineArrowUpRight } from "react-icons/hi2";
// import { apiUrl } from "../config";
// import Link from "next/link";

// type SectionImage = {
//     id: number;
//     mu_title: string;
//     image_1: string;
//     image_2: string;
//     image_3: string;
//     description: string;
//     sort_order: number;
// };

// type MoreImage = {
//     id: number;
//     image_url: string;
//     sort_order: number;
// };

// type CaseStudyItem = {
//     id: number;
//     slug: string;
//     title: string;
//     description: string;
//     hero_image: string;
//     meta_title: string;
//     meta_keyword: string;
//     meta_description: string;
//     head: string;
//     body: string;
//     award_title: string;
//     award_image: string;
//     section_images: SectionImage[];
//     more_images: MoreImage[];
//     created_at: string;
// };

// type CaseStudyResponse = {
//     success: boolean;
//     message: string;
//     data: CaseStudyItem[];
// };
// export default function BrandPage() {
//     const sectionRef = useRef<HTMLElement | null>(null);

//     const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     const TOTAL = brandStories.length;

//     const fetchCaseStudies = async () => {
//         try {
//             setLoading(true);

//             const res = await axios.post<CaseStudyResponse>(
//                 `${apiUrl}/caseStudyList`,
//                 {},
//                 {
//                     headers: {
//                         Accept: "application/json",
//                     },
//                 }
//             );

//             if (res.data?.success) {
//                 setBrandStories(res.data.data || []);
//             } else {
//                 setBrandStories([]);
//             }
//         } catch (error) {
//             console.error("Case study list API error:", error);
//             setBrandStories([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCaseStudies();
//     }, []);

//     const { scrollYProgress } = useScroll({
//         target: sectionRef,
//         offset: ["start start", "end end"],
//     });

//     return (
//         <main className="bg-[#e5e5e5] font-sans py-10">
//             <section
//                 ref={sectionRef}
//                 className="relative"
//                 style={{
//                     height: loading || TOTAL === 0 ? "100vh" : `${(TOTAL + 2) * 100}vh`,
//                 }}
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

//                     {loading ? (
//                         <div className="flex h-[calc(100vh-150px)] items-center justify-center">
//                             <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A62666]/20 border-t-[#A62666]" />
//                         </div>
//                     ) : TOTAL === 0 ? (
//                         <div className="flex h-[calc(100vh-150px)] items-center justify-center">
//                             <p className="text-[#626262]">No case studies found.</p>
//                         </div>
//                     ) : (
//                         <div className="relative h-[calc(100vh-150px)] overflow-hidden">
//                             {brandStories.map((item, i) => (
//                                 <ScrollSlide
//                                     key={item.id}
//                                     item={item}
//                                     index={i}
//                                     total={TOTAL}
//                                     progress={scrollYProgress}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </main>
//     );
// }
// function ScrollSlide({
//     item,
//     index,
//     total,
//     progress,
// }: {
//     item: CaseStudyItem;
//     index: number;
//     total: number;
//     progress: any;
// }) {
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
//     const detailSlug = item.slug;

//     return (
//         <motion.div
//             style={{ y, opacity, scale, rotate }}
//             className="absolute inset-0"
//         >
//             <div className="relative h-full">
//                 {/* Image Area */}
//                 <div className="relative h-[300px] lg:h-[380px] 2xl:h-[525px] overflow-hidden rounded-[30px] bg-black md:rounded-[42px]">
//                     <img
//                         src={item.hero_image}
//                         alt={item.title}
//                         className="absolute inset-0 h-full w-full object-cover object-top"
//                     />

//                     <div className="absolute inset-0 bg-black/5" />
//                 </div>

//                 {/* Bottom Content Area */}
//                 <div className="relative flex min-h-[28%] items-start justify-between px-5 pt-7 md:px-8">
//                     <div>
//                         <h3
//                             className="text-2xl font-body leading-none uppercase text-[#A62666] md:text-3xl lg:text-4xl 2xl:text-5xl"
//                             style={{ fontWeight: "bold" }}
//                         >
//                             {item.title}
//                         </h3>

//                         <p className="mt-1 text-sm text-[#686868] md:text-base lg:text-xl 2xl:text-2xl">
//                             {item.description}
//                         </p>
//                     </div>

//                     <div className="relative -mt-28 flex flex-col items-center md:-mt-45 2xl:-mt-45">
//                         <img
//                             src={item.award_image}
//                             alt={`${item.title} icon`}
//                             className="w-[110px] object-contain sm:w-[140px] md:w-[170px]"
//                         />

//                         <p className="mt- text-xs text-[#686868] md:text-[20px]">
//                             {item.award_title}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Button */}
//                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
//                     <Link
//                         href={`/case-study-detail?slug=${encodeURIComponent(
//                             detailSlug
//                         )}`}
//                         className="flex items-center gap-2 rounded-lg bg-[#A62666] px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:opacity-95 md:px-6 md:text-sm"
//                     >
//                         Case Study <HiOutlineArrowUpRight size={16} />
//                     </Link>

//                 </div>
//             </div>
//         </motion.div>
//     );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import axios from "axios";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { apiUrl } from "../config";
import Link from "next/link";

type SectionImage = {
    id: number;
    mu_title: string;
    image_1: string;
    image_2: string;
    image_3: string;
    description: string;
    sort_order: number;
};

type MoreImage = {
    id: number;
    image_url: string;
    sort_order: number;
};

type CaseStudyItem = {
    id: number;
    slug: string;
    title: string;
    description: string;
    hero_image: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    head: string;
    body: string;
    award_title: string;
    award_image: string;
    section_images: SectionImage[];
    more_images: MoreImage[];
    created_at: string;
};

type CaseStudyResponse = {
    success: boolean;
    message: string;
    data: CaseStudyItem[];
};

export default function BrandPage() {
    const sectionRef = useRef<HTMLElement | null>(null);

    const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const TOTAL = brandStories.length;

    const fetchCaseStudies = async () => {
        try {
            setLoading(true);

            const res = await axios.post<CaseStudyResponse>(
                `${apiUrl}/caseStudyList`,
                {},
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (res.data?.success) {
                setBrandStories(res.data.data || []);
            } else {
                setBrandStories([]);
            }
        } catch (error) {
            console.error("Case study list API error:", error);
            setBrandStories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 28,
        mass: 0.6,
    });

    return (
        <main className="bg-[#e5e5e5] font-sans">
            <section
                ref={sectionRef}
                className="relative"
                style={{
                    height:
                        loading || TOTAL === 0
                            ? "100vh"
                            : `${TOTAL * 115 + 100}vh`,
                }}
            >
                <div className="sticky top-0 h-screen overflow-hidden px-5 py-8 md:px-10 lg:px-16">
                    <div className="mb-6 flex items-end justify-between gap-5">
                        <div>
                            <h2 className="text-3xl font-medium text-[#626262] md:text-5xl">
                                Story Behind Brand Building
                            </h2>
                            <p className="mt-2 text-sm text-[#7b7b7b] md:text-base">
                                Explore the process behind crafting memorable brand experiences.
                            </p>
                        </div>

                        {!loading && TOTAL > 0 && (
                            <p className="hidden text-sm uppercase tracking-wider text-[#7b7b7b] md:block">
                                Scroll to explore
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A62666]/20 border-t-[#A62666]" />
                        </div>
                    ) : TOTAL === 0 ? (
                        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
                            <p className="text-[#626262]">No case studies found.</p>
                        </div>
                    ) : (
                        <div className="relative h-[calc(100vh-145px)] overflow-visible">
                            {brandStories.map((item, i) => (
                                <ScrollSlide
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    total={TOTAL}
                                    progress={smoothProgress}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

function ScrollSlide({
    item,
    index,
    total,
    progress,
}: {
    item: CaseStudyItem;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    const step = 1 / total;

    const start = index * step;
    const mid = start + step * 0.55;
    const end = start + step;

    const inputRange = [
        Math.max(0, start - step * 0.35),
        start,
        mid,
        Math.min(1, end),
    ];

    const y = useTransform(
        progress,
        inputRange,
        isFirst
            ? ["0%", "0%", isLast ? "0%" : "-12%", isLast ? "0%" : "-18%"]
            : ["115%", "0%", isLast ? "0%" : "-12%", isLast ? "0%" : "-18%"]
    );

    const scale = useTransform(
        progress,
        inputRange,
        isFirst
            ? [1, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.94]
            : [0.94, 1, isLast ? 1 : 0.96, isLast ? 1 : 0.94]
    );

    const rotate = useTransform(
        progress,
        inputRange,
        isFirst
            ? [0, 0, isLast ? 0 : -1.2, isLast ? 0 : -1.8]
            : [1.8, 0, isLast ? 0 : -1.2, isLast ? 0 : -1.8]
    );

    const opacity = useTransform(
        progress,
        inputRange,
        isFirst
            ? [1, 1, 1, isLast ? 1 : 0.92]
            : [0, 1, 1, isLast ? 1 : 0.92]
    );

    const imageScale = useTransform(
        progress,
        inputRange,
        isFirst ? [1, 1, 1.05, 1.08] : [1.08, 1, 1.05, 1.08]
    );

    return (
        <motion.div
            style={{
                y,
                scale,
                rotate,
                opacity,
                zIndex: index + 1,
            }}
            className="absolute inset-0 origin-top"
        >
            <Link
                href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
                className="group block h-full"
            >
                <div className="relative h-full overflow-hidden rounded-[30px] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:rounded-[42px]">
                    {/* Background Image */}
                    <motion.img
                        src={item.hero_image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        style={{
                            scale: imageScale,
                        }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />

                    {/* Upper Title + Arrow */}
                    <div className="absolute left-0 right-0 top-0 flex items-start justify-between gap-4 p-5 md:p-7 lg:p-8">
                        <h3 className="max-w-[75%] text-xl font-bold uppercase leading-tight text-white md:text-3xl lg:text-4xl 2xl:text-5xl">
                            {item.title}
                        </h3>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#A62666] transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 group-hover:bg-[#A62666] group-hover:text-white md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <HiOutlineArrowUpRight size={22} />
                        </div>
                    </div>         </div>
            </Link>
        </motion.div>
    );
}