// // //   "use client";

// // //   import {
// // //     type CSSProperties,
// // //     useEffect,
// // //     useRef,
// // //     useState,
// // //   } from "react";

// // //   import {
// // //     motion,
// // //     type MotionValue,
// // //     useScroll,
// // //     useSpring,
// // //     useTransform,
// // //   } from "framer-motion";

// // //   import axios from "axios";
// // //   import Link from "next/link";
// // //   import { useRouter } from "next/navigation";
// // //   import { LuMoveUpRight } from "react-icons/lu";

// // //   import { apiUrl } from "../config";

// // //   type SectionImage = {
// // //     id: number;
// // //     mu_title: string;
// // //     image_1: string;
// // //     image_2: string;
// // //     image_3: string;
// // //     description: string;
// // //     sort_order: number;
// // //   };

// // //   type MoreImage = {
// // //     id: number;
// // //     image_url: string;
// // //     sort_order: number;
// // //   };

// // //   type CaseStudyItem = {
// // //     id: number;
// // //     slug: string;
// // //     title: string;
// // //     description: string;
// // //     hero_image: string;
// // //     meta_title: string;
// // //     meta_keyword: string;
// // //     meta_description: string;
// // //     head: string;
// // //     body: string;
// // //     award_title: string;
// // //     award_image: string;
// // //     section_images: SectionImage[];
// // //     more_images: MoreImage[];
// // //     created_at: string;
// // //   };

// // //   type CaseStudyResponse = {
// // //     success: boolean;
// // //     message: string;
// // //     data: CaseStudyItem[];
// // //   };

// // //   type ScrollDistanceStyles = CSSProperties & {
// // //     "--mobile-scroll-distance": string;
// // //     "--tablet-scroll-distance": string;
// // //     "--desktop-scroll-distance": string;
// // //     "--wide-scroll-distance": string;
// // //     "--full-hd-scroll-distance": string;
// // //   };
// // //   export default function BrandPage() {
// // //     const sectionRef = useRef<HTMLElement | null>(null);
// // //     const router = useRouter();

// // //     const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
// // //     const [loading, setLoading] = useState(true);

// // //     const total = brandStories.length;
// // //     const transitionCount = Math.max(total - 1, 0);

    
// // //   const scrollDistanceStyle: ScrollDistanceStyles = {
// // //     "--mobile-scroll-distance":
// // //       loading || total <= 1
// // //         ? "0px"
// // //         : `${transitionCount * 35}svh`,

// // //     "--tablet-scroll-distance":
// // //       loading || total <= 1
// // //         ? "0px"
// // //         : `${transitionCount * 58}svh`,

// // //     "--desktop-scroll-distance":
// // //       loading || total <= 1
// // //         ? "0px"
// // //         : `${transitionCount * 70}svh`,

// // //     "--wide-scroll-distance":
// // //       loading || total <= 1
// // //         ? "0px"
// // //         : `${transitionCount * 82}dvh`,

// // //     "--full-hd-scroll-distance":
// // //       loading || total <= 1
// // //         ? "0px"
// // //         : `${transitionCount * 88}dvh`,
// // //   };

// // //     useEffect(() => {
// // //       const fetchCaseStudies = async () => {
// // //         try {
// // //           setLoading(true);

// // //           const response = await axios.post<CaseStudyResponse>(
// // //             `${apiUrl}/caseStudyList`,
// // //             {},
// // //             {
// // //               headers: {
// // //                 Accept: "application/json",
// // //               },
// // //             },
// // //           );

// // //           if (response.data?.success) {
// // //             setBrandStories(response.data.data ?? []);
// // //           } else {
// // //             setBrandStories([]);
// // //           }
// // //         } catch (error) {
// // //           console.error("Case study list API error:", error);
// // //           setBrandStories([]);
// // //         } finally {
// // //           setLoading(false);
// // //         }
// // //       };

// // //       fetchCaseStudies();
// // //     }, []);

// // //     const { scrollYProgress } = useScroll({
// // //       target: sectionRef,
// // //       offset: ["start start", "end end"],
// // //     });

// // //     const smoothProgress = useSpring(scrollYProgress, {
// // //       stiffness: 45,
// // //       damping: 30,
// // //       mass: 1,
// // //     });

// // //     return (
// // //       <main
// // //         className="
// // //           overflow-visible
// // //           bg-[#f6f6f6]
// // //           px-4
// // //           pb-0
// // //           pt-6
// // //           font-sans

// // //           md:px-6
// // //           md:pt-8

// // //           min-[1440px]:px-10
// // //       min-[1440px]:pt-[50px]

// // //       min-[1680px]:px-16
// // //       min-[1920px]:px-20
// // //       min-[1920px]:pt-[60px]
// // //         "
// // //       >
// // //       <section
// // //     ref={sectionRef}
// // //     style={scrollDistanceStyle}
// // //     className="brand-scroll-section mx-auto w-full"
// // //   >
// // //   <div className="brand-sticky-shell">
// // //     <div className="brand-sticky-grid">
// // //       {/* Heading */}
// // //       <div className="shrink-0">
// // //         <h2
// // //           className="
// // //             text-[28px]
// // //             font-bold
// // //             leading-[1.05]
// // //             text-primary

// // //             sm:text-[32px]
// // //             md:text-[38px]
// // //             lg:text-[44px]
// // //             min-[1440px]:text-[48px]
// // //             min-[1920px]:text-[54px]
// // //           "
// // //         >
// // //           Story Behind Brand Building
// // //         </h2>

// // //         <p
// // //           className="
// // //             mt-2
// // //             max-w-[900px]
// // //             text-[14px]
// // //             leading-relaxed
// // //             text-black

// // //             sm:text-[16px]
// // //             md:text-[18px]
// // //             lg:text-[20px]
// // //             min-[1440px]:text-[22px]
// // //             min-[1920px]:text-[24px]
// // //           "
// // //         >
// // //           Explore the process behind crafting memorable brand experiences.
// // //         </p>
// // //       </div>

// // //       {loading ? (
// // //         <div className="flex min-h-[360px] items-center justify-center">
// // //           <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
// // //         </div>
// // //       ) : total === 0 ? (
// // //         <div className="flex min-h-[360px] items-center justify-center">
// // //           <p className="text-[#626262]">No case studies found.</p>
// // //         </div>
// // //       ) : (
// // //         <div className="   brand-image-stage
// // //       relative
// // //       w-full
// // //       aspect-[16/10]
// // //       md:aspect-auto">
// // //           {brandStories.map((item, index) => (
// // //             <ScrollSlide
// // //               key={item.id}
// // //               item={item}
// // //               index={index}
// // //               total={total}
// // //               progress={smoothProgress}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}

// // //       {!loading && total > 0 && (
// // //         <div className="brand-action-row">
// // //           <button
// // //             type="button"
// // //             onClick={() => router.push("/CaseStudies")}
// // //             className="
// // //               brand-case-study-button
// // //               group
// // //               inline-flex
// // //               items-center
// // //               justify-center
// // //               gap-3
// // //               rounded-full
// // //               bg-primary
// // //               px-5
// // //               py-2.5
// // //               text-[14px]
// // //               font-bold
// // //               text-white
// // //               shadow-lg
// // //               shadow-primary/20
// // //               transition-all
// // //               duration-300

// // //               hover:-translate-y-1
// // //               hover:bg-[#7a1f50]
// // //               hover:shadow-xl

// // //               sm:px-6
// // //               sm:py-3
// // //               sm:text-[16px]

// // //               lg:gap-5
// // //               lg:px-7
// // //               lg:text-[18px]

// // //               min-[1440px]:gap-6
// // //               min-[1440px]:px-8
// // //               min-[1440px]:text-[20px]

// // //               min-[1920px]:px-9
// // //               min-[1920px]:text-[22px]
// // //             "
// // //           >
// // //             Case Studies

// // //             <LuMoveUpRight
// // //               className="
// // //                 h-4
// // //                 w-4
// // //                 transition-transform
// // //                 duration-300
// // //                 group-hover:translate-x-1
// // //                 group-hover:-translate-y-1

// // //                 lg:h-5
// // //                 lg:w-5
// // //               "
// // //             />
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   </div>

// // //   {!loading && total > 1 && (
// // //   <div
// // //     className="brand-scroll-spacer"
// // //     aria-hidden="true"
// // //   />
// // // )}
// // //   </section>
// // //       </main>
// // //     );
// // //   }

// // //   // function ScrollSlide({
// // //   //   item,
// // //   //   index,
// // //   //   total,
// // //   //   progress,
// // //   // }: {
// // //   //   item: CaseStudyItem;
// // //   //   index: number;
// // //   //   total: number;
// // //   //   progress: MotionValue<number>;
// // //   // }) {
// // //   //   const isFirst = index === 0;
// // //   // const isLast = index === total - 1;

// // //   // const step = total > 1 ? 1 / (total - 1) : 1;

// // //   // let inputRange: number[];
// // //   // let yOutput: string[];
// // //   // let scaleOutput: number[];

// // //   // if (total === 1) {
// // //   //   inputRange = [0, 1];
// // //   //   yOutput = ["0%", "0%"];
// // //   //   scaleOutput = [1, 1];
// // //   // } else if (isFirst) {
// // //   //   inputRange = [0, Math.min(1, step)];
// // //   //   yOutput = ["0%", "-5%"];
// // //   //   scaleOutput = [1, 0.97];
// // //   // } else if (isLast) {
// // //   //   inputRange = [
// // //   //     Math.max(0, 1 - step * 0.75),
// // //   //     1,
// // //   //   ];

// // //   //   yOutput = ["100%", "0%"];
// // //   //   scaleOutput = [0.97, 1];
// // //   // } else {
// // //   //   const center = index * step;

// // //   //   inputRange = [
// // //   //     Math.max(0, center - step * 0.7),
// // //   //     center,
// // //   //     Math.min(1, center + step * 0.7),
// // //   //   ];

// // //   //   yOutput = ["100%", "0%", "-5%"];
// // //   //   scaleOutput = [0.97, 1, 0.97];
// // //   // }

// // //   // const y = useTransform(
// // //   //   progress,
// // //   //   inputRange,
// // //   //   yOutput,
// // //   // );

// // //   // const scale = useTransform(
// // //   //   progress,
// // //   //   inputRange,
// // //   //   scaleOutput,
// // //   // );



// // //   //   return (
// // //   //  <motion.article
// // //   //   style={{
// // //   //     y,
// // //   //     scale,
// // //   //     zIndex: index + 1,
// // //   //   }}
// // //   //   className="
// // //   //     absolute
// // //   //     inset-0
// // //   //     origin-top
// // //   //     overflow-hidden
// // //   //     rounded-lg
// // //   //     sm:rounded-xl
// // //   //     lg:rounded-2xl
// // //   //   "
// // //   // >
// // //   //   <Link
// // //   //     href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
// // //   //     aria-label={`View case study: ${item.title}`}
// // //   //     className="group relative block h-full w-full overflow-hidden"
// // //   //   >
// // //   //     <img
// // //   //       src={item.hero_image}
// // //   //       alt={item.title}
// // //   //       draggable={false}
// // //   //       className="
// // //   //        absolute
// // //   //     inset-0
// // //   //     block
// // //   //     h-full
// // //   //     w-full
// // //   //     max-w-none
// // //   //     bg-white
// // //   //     object-contain
// // //   //     object-center

// // //   //     md:bg-transparent
// // //   //     md:object-cover
// // //   //       "
// // //   //     />

// // //   //     {/* Title position */}
// // //   //     <div
// // //   //       className="
// // //   //         absolute
// // //   //         inset-x-0
// // //   //         top-0
// // //   //         z-10
// // //   //         p-2.5
// // //   //         sm:p-3
// // //   //         md:p-5
// // //   //         lg:p-7
// // //   //         min-[1410px]:p-8
// // //   //       "
// // //   //     >
// // //   //       {/* Title box */}
// // //   //       <div
// // //   //         className="
// // //   //           inline-block
// // //   //           max-w-[85%]
// // //   //           rounded-lg
// // //   //           border
// // //   //           border-white/25
// // //   //           bg-black/45
// // //   //           px-3
// // //   //           py-2
// // //   //           shadow-[0_6px_20px_rgba(0,0,0,0.18)]
// // //   //           backdrop-blur-md
// // //   //           sm:max-w-[80%]
// // //   //           sm:rounded-xl
// // //   //           sm:px-4
// // //   //           sm:py-2.5
// // //   //           md:max-w-[75%]
// // //   //           md:px-5
// // //   //           md:py-3
// // //   //           lg:max-w-[78%]
// // //   //           lg:rounded-2xl
// // //   //           lg:px-7
// // //   //           lg:py-4
// // //   //           min-[1410px]:rounded-[20px]
// // //   //           min-[1410px]:px-8
// // //   //           min-[1410px]:py-5
// // //   //         "
// // //   //       >
// // //   //         <h3
// // //   //           className="
// // //   //             !m-0
// // //   //             !capitalize
// // //   //             font-bold
// // //   //             leading-tight
// // //   //             text-white

// // //   //             text-[16px]
// // //   //             sm:text-[18px]
// // //   //             md:text-[24px]
// // //   //             lg:text-[36px]
// // //   //             xl:text-[42px]
// // //   //             min-[1410px]:text-[48px]
// // //   //           "
// // //   //         >
// // //   //           {item.title}
// // //   //         </h3>
// // //   //       </div>
// // //   //     </div>
// // //   //   </Link>
// // //   // </motion.article>
// // //   //   );
// // //   // }

// // // function ScrollSlide({
// // //   item,
// // //   index,
// // //   total,
// // //   progress,
// // // }: {
// // //   item: CaseStudyItem;
// // //   index: number;
// // //   total: number;
// // //   progress: MotionValue<number>;
// // // }) {
// // //   const isFirst = index === 0;
// // //   const transitionCount = Math.max(total - 1, 1);

// // //   /*
// // //    * Image 1 stays visible at the beginning.
// // //    * Each next image enters from the bottom.
// // //    */
// // //   const enterStart = isFirst
// // //     ? 0
// // //     : (index - 1) / transitionCount;

// // //   const enterEnd = isFirst
// // //     ? 1
// // //     : index / transitionCount;

// // //   const y = useTransform(
// // //     progress,
// // //     isFirst ? [0, 1] : [enterStart, enterEnd],
// // //     isFirst ? ["0%", "0%"] : ["100%", "0%"],
// // //     {
// // //       clamp: true,
// // //     },
// // //   );

// // //   const opacity = useTransform(
// // //     progress,
// // //     isFirst
// // //       ? [0, 1]
// // //       : [
// // //           enterStart,
// // //           Math.min(enterStart + 0.03, enterEnd),
// // //         ],
// // //     isFirst ? [1, 1] : [0, 1],
// // //     {
// // //       clamp: true,
// // //     },
// // //   );

// // //   /*
// // //    * Scale the image underneath when the next image enters.
// // //    */
// // //   const scaleStart = index / transitionCount;
// // //   const scaleEnd = Math.min(
// // //     1,
// // //     scaleStart + 1 / transitionCount,
// // //   );

// // //   const scale = useTransform(
// // //     progress,
// // //     isFirst
// // //       ? [0, Math.min(1, 1 / transitionCount)]
// // //       : [scaleStart, scaleEnd],
// // //     [1, 0.97],
// // //     {
// // //       clamp: true,
// // //     },
// // //   );

// // //   return (
// // //     <motion.article
// // //       style={{
// // //         y,
// // //         opacity,
// // //         scale,
// // //         zIndex: index + 1,
// // //       }}
// // //       className="
// // //         absolute
// // //         inset-0
// // //         origin-top
// // //         overflow-hidden
// // //         rounded-lg
// // //         sm:rounded-xl
// // //         lg:rounded-2xl
// // //       "
// // //     >
// // //       <Link
// // //         href={`/case-study-detail?slug=${encodeURIComponent(
// // //           item.slug,
// // //         )}`}
// // //         aria-label={`View case study: ${item.title}`}
// // //         className="group relative block h-full w-full overflow-hidden"
// // //       >
// // //         <img
// // //           src={item.hero_image}
// // //           alt={item.title}
// // //           draggable={false}
// // //           className="
// // //             absolute
// // //             inset-0
// // //             block
// // //             h-full
// // //             w-full
// // //             max-w-none
// // //             bg-white
// // //             object-contain
// // //             object-center

// // //             md:bg-transparent
// // //             md:object-cover
// // //           "
// // //         />

// // //         <div
// // //           className="
// // //             absolute
// // //             inset-x-0
// // //             top-0
// // //             z-10
// // //             p-2.5
// // //             sm:p-3
// // //             md:p-5
// // //             lg:p-7
// // //             min-[1410px]:p-8
// // //           "
// // //         >
// // //           <div
// // //             className="
// // //               inline-block
// // //               max-w-[85%]
// // //               rounded-lg
// // //               border
// // //               border-white/25
// // //               bg-black/45
// // //               px-3
// // //               py-2
// // //               shadow-[0_6px_20px_rgba(0,0,0,0.18)]
// // //               backdrop-blur-md

// // //               sm:max-w-[80%]
// // //               sm:rounded-xl
// // //               sm:px-4
// // //               sm:py-2.5

// // //               md:max-w-[75%]
// // //               md:px-5
// // //               md:py-3

// // //               lg:max-w-[78%]
// // //               lg:rounded-2xl
// // //               lg:px-7
// // //               lg:py-4

// // //               min-[1410px]:rounded-[20px]
// // //               min-[1410px]:px-8
// // //               min-[1410px]:py-5
// // //             "
// // //           >
// // //             <h3
// // //               className="
// // //                 !m-0
// // //                 !capitalize
// // //                 text-[16px]
// // //                 font-bold
// // //                 leading-tight
// // //                 text-white

// // //                 sm:text-[18px]
// // //                 md:text-[24px]
// // //                 lg:text-[36px]
// // //                 xl:text-[42px]
// // //                 min-[1410px]:text-[48px]
// // //               "
// // //             >
// // //               {item.title}
// // //             </h3>
// // //           </div>
// // //         </div>
// // //       </Link>
// // //     </motion.article>
// // //   );
// // // }


// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import {
// //   motion,
// //   type MotionValue,
// //   useScroll,
// //   useSpring,
// //   useTransform,
// // } from "framer-motion";
// // import axios from "axios";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { LuMoveUpRight } from "react-icons/lu";

// // import { apiUrl } from "../config";

// // type SectionImage = {
// //   id: number;
// //   mu_title: string;
// //   image_1: string;
// //   image_2: string;
// //   image_3: string;
// //   description: string;
// //   sort_order: number;
// // };

// // type MoreImage = {
// //   id: number;
// //   image_url: string;
// //   sort_order: number;
// // };

// // type CaseStudyItem = {
// //   id: number;
// //   slug: string;
// //   title: string;
// //   description: string;
// //   hero_image: string;
// //   meta_title: string;
// //   meta_keyword: string;
// //   meta_description: string;
// //   head: string;
// //   body: string;
// //   award_title: string;
// //   award_image: string;
// //   section_images: SectionImage[];
// //   more_images: MoreImage[];
// //   created_at: string;
// // };

// // type CaseStudyResponse = {
// //   success: boolean;
// //   message: string;
// //   data: CaseStudyItem[];
// // };

// // export default function BrandPage() {
// //   // const stackSectionRef = useRef<HTMLElement | null>(null);
// //   const router = useRouter();

// //   const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const total = brandStories.length;


// //   useEffect(() => {
// //     const fetchCaseStudies = async () => {
// //       try {
// //         setLoading(true);

// //         const response = await axios.post<CaseStudyResponse>(
// //           `${apiUrl}/caseStudyList`,
// //           {},
// //           {
// //             headers: {
// //               Accept: "application/json",
// //             },
// //           },
// //         );

// //         if (response.data?.success) {
// //           setBrandStories(response.data.data ?? []);
// //         } else {
// //           setBrandStories([]);
// //         }
// //       } catch (error) {
// //         console.error("Case study list API error:", error);
// //         setBrandStories([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCaseStudies();
// //   }, []);

// //   /*
// //    * Tracks the complete dynamic card section.
// //    * No manually calculated scroll spacer is required because every card
// //    * already contributes one viewport of scroll height.
// //    */
 


// //   return (
// //     <main
// //       className="
// //         overflow-visible
// //         bg-[#f6f6f6]
// //         px-4
// //         pb-0
// //         pt-6
// //         font-sans

// //         md:px-6
// //         md:pt-8

// //         min-[1440px]:px-10
// //         min-[1440px]:pt-[50px]

// //         min-[1680px]:px-16
// //         min-[1920px]:px-20
// //         min-[1920px]:pt-[60px]
// //       "
// //     >
// //       {/* Main section heading remains unchanged. */}
// //       <div className="mx-auto w-full max-w-full">
// //         <div className="shrink-0">
// //           <h2
// //             className="
// //               text-[28px]
// //               font-bold
// //               leading-[1.05]
// //               text-primary

// //               sm:text-[32px]
// //               md:text-[38px]
// //               lg:text-[44px]
// //               min-[1440px]:text-[48px]
// //               min-[1920px]:text-[54px]
// //             "
// //           >
// //             Story Behind Brand Building
// //           </h2>

// //           <p
// //             className="
// //               mt-2
// //               max-w-[900px]
// //               text-[14px]
// //               leading-relaxed
// //               text-black

// //               sm:text-[16px]
// //               md:text-[18px]
// //               lg:text-[20px]
// //               min-[1440px]:text-[22px]
// //               min-[1920px]:text-[24px]
// //             "
// //           >
// //             Explore the process behind crafting memorable brand experiences.
// //           </p>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="flex min-h-[520px] items-center justify-center">
// //           <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
// //         </div>
// //       ) : total === 0 ? (
// //         <div className="flex min-h-[520px] items-center justify-center">
// //           <p className="text-[#626262]">No case studies found.</p>
// //         </div>
// //       ) : (
// //       <CaseStudyStack brandStories={brandStories} />
// //       )}

// //       {!loading && total > 0 && (
// //         <div className="mx-auto flex w-full max-w-[1800px] justify-center pb-10 pt-4 sm:pb-14 lg:pb-20">
// //           <button
// //             type="button"
// //             onClick={() => router.push("/CaseStudies")}
// //             className="
// //               brand-case-study-button
// //               group
// //               inline-flex
// //               items-center
// //               justify-center
// //               gap-3
// //               rounded-full
// //               bg-primary
// //               px-5
// //               py-2.5
// //               text-[14px]
// //               font-bold
// //               text-white
// //               shadow-lg
// //               shadow-primary/20
// //               transition-all
// //               duration-300

// //               hover:-translate-y-1
// //               hover:bg-[#7a1f50]
// //               hover:shadow-xl

// //               sm:px-6
// //               sm:py-3
// //               sm:text-[16px]

// //               lg:gap-5
// //               lg:px-7
// //               lg:text-[18px]

// //               min-[1440px]:gap-6
// //               min-[1440px]:px-8
// //               min-[1440px]:text-[20px]

// //               min-[1920px]:px-9
// //               min-[1920px]:text-[22px]
// //             "
// //           >
// //             Case Studies

// //             <LuMoveUpRight
// //               className="
// //                 h-4
// //                 w-4
// //                 transition-transform
// //                 duration-300
// //                 group-hover:translate-x-1
// //                 group-hover:-translate-y-1

// //                 lg:h-5
// //                 lg:w-5
// //               "
// //             />
// //           </button>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }


// // function CaseStudyStack({
// //   brandStories,
// // }: {
// //   brandStories: CaseStudyItem[];
// // }) {
// //   const stackSectionRef = useRef<HTMLElement | null>(null);
// //   const total = brandStories.length;

// //   const { scrollYProgress } = useScroll({
// //     target: stackSectionRef,
// //     offset: ["start start", "end end"],
// //   });

// //   const smoothProgress = useSpring(scrollYProgress, {
// //     stiffness: 70,
// //     damping: 30,
// //     mass: 0.8,
// //   });

// //   return (
// //     <section
// //       ref={stackSectionRef}
// //       className="mx-auto mt-4 w-full max-w-[1800px] sm:mt-6 lg:mt-8"
// //     >
// //       {brandStories.map((item, index) => {
// //         const rangeStart = total > 1 ? index / total : 0;

// //         const targetScale = Math.max(
// //           0.76,
// //           1 - (total - index) * 0.05,
// //         );

// //         return (
// //           <StackingCaseStudyCard
// //             key={item.id}
// //             item={item}
// //             index={index}
// //             progress={smoothProgress}
// //             range={[rangeStart, 1]}
// //             targetScale={targetScale}
// //           />
// //         );
// //       })}
// //     </section>
// //   );
// // }

// // type StackingCaseStudyCardProps = {
// //   item: CaseStudyItem;
// //   index: number;
// //   progress: MotionValue<number>;
// //   range: [number, number];
// //   targetScale: number;
// // };

// // function StackingCaseStudyCard({
// //   item,
// //   index,
// //   progress,
// //   range,
// //   targetScale,
// // }: StackingCaseStudyCardProps) {
// //   const cardRef = useRef<HTMLDivElement | null>(null);

// //   /*
// //    * Creates the image zoom-out effect used by the reference card.
// //    */
// //   const { scrollYProgress: cardScrollProgress } = useScroll({
// //     target: cardRef,
// //     offset: ["start end", "start start"],
// //   });

// //   const imageScale = useTransform(
// //     cardScrollProgress,
// //     [0, 1],
// //     [2, 1],
// //     { clamp: true },
// //   );

// //   /*
// //    * Older cards shrink while newer cards stack above them.
// //    */
// //   const cardScale = useTransform(
// //     progress,
// //     range,
// //     [1, targetScale],
// //     { clamp: true },
// //   );

// //   return (
// //     <div
// //       ref={cardRef}
// //       className="sticky top-0 flex h-screen items-center justify-center"
// //     >
// //       <motion.article
// //         style={{
// //           scale: cardScale,
// //           top: `calc(-5vh + ${index * 25}px)`,
// //           zIndex: index + 1,
// //         }}
// //         className="
// //           relative
// //           -top-[10%]
// //           h-[clamp(330px,58vh,720px)]
// //           w-full
// //           origin-top
// //           overflow-hidden
// //           rounded-lg
// //           bg-white
// //           shadow-[0_22px_70px_rgba(0,0,0,0.18)]

// //           sm:h-[clamp(390px,62vh,760px)]
// //           sm:rounded-xl

// //           md:w-[92%]
// //           lg:w-[86%]
// //           lg:rounded-2xl

// //           min-[1440px]:w-[82%]
// //         "
// //       >
// //         <Link
// //           href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
// //           aria-label={`View case study: ${item.title}`}
// //           className="group relative block h-full w-full overflow-hidden"
// //         >
// //           <motion.div
// //             style={{ scale: imageScale }}
// //             className="absolute inset-0 h-full w-full will-change-transform"
// //           >
// //             <img
// //               src={item.hero_image}
// //               alt={item.title}
// //               draggable={false}
// //               className="
// //                 block
// //                 h-full
// //                 w-full
// //                 max-w-none
// //                 bg-white
// //                 object-contain
// //                 object-center

// //                 md:bg-transparent
// //                 md:object-cover
// //               "
// //             />
// //           </motion.div>

// //           {/* Existing title position and title box kept unchanged. */}
// //           <div
// //             className="
// //               absolute
// //               inset-x-0
// //               top-0
// //               z-10
// //               p-2.5
// //               sm:p-3
// //               md:p-5
// //               lg:p-7
// //               min-[1410px]:p-8
// //             "
// //           >
// //             <div
// //               className="
// //                 inline-block
// //                 max-w-[85%]
// //                 rounded-lg
// //                 border
// //                 border-white/25
// //                 bg-black/45
// //                 px-3
// //                 py-2
// //                 shadow-[0_6px_20px_rgba(0,0,0,0.18)]
// //                 backdrop-blur-md

// //                 sm:max-w-[80%]
// //                 sm:rounded-xl
// //                 sm:px-4
// //                 sm:py-2.5

// //                 md:max-w-[75%]
// //                 md:px-5
// //                 md:py-3

// //                 lg:max-w-[78%]
// //                 lg:rounded-2xl
// //                 lg:px-7
// //                 lg:py-4

// //                 min-[1410px]:rounded-[20px]
// //                 min-[1410px]:px-8
// //                 min-[1410px]:py-5
// //               "
// //             >
// //               <h3
// //                 className="
// //                   !m-0
// //                   !capitalize
// //                   text-[16px]
// //                   font-bold
// //                   leading-tight
// //                   text-white

// //                   sm:text-[18px]
// //                   md:text-[24px]
// //                   lg:text-[36px]
// //                   xl:text-[42px]
// //                   min-[1410px]:text-[48px]
// //                 "
// //               >
// //                 {item.title}
// //               </h3>
// //             </div>
// //           </div>
// //         </Link>
// //       </motion.article>
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   motion,
//   type MotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { LuMoveUpRight } from "react-icons/lu";

// import { apiUrl } from "../config";

// type SectionImage = {
//   id: number;
//   mu_title: string;
//   image_1: string;
//   image_2: string;
//   image_3: string;
//   description: string;
//   sort_order: number;
// };

// type MoreImage = {
//   id: number;
//   image_url: string;
//   sort_order: number;
// };

// type CaseStudyItem = {
//   id: number;
//   slug: string;
//   title: string;
//   description: string;
//   hero_image: string;
//   meta_title: string;
//   meta_keyword: string;
//   meta_description: string;
//   head: string;
//   body: string;
//   award_title: string;
//   award_image: string;
//   section_images: SectionImage[];
//   more_images: MoreImage[];
//   created_at: string;
// };

// type CaseStudyResponse = {
//   success: boolean;
//   message: string;
//   data: CaseStudyItem[];
// };

// export default function BrandPage() {
//   // const stackSectionRef = useRef<HTMLElement | null>(null);
//   const router = useRouter();

//   const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const total = brandStories.length;


//   useEffect(() => {
//     const fetchCaseStudies = async () => {
//       try {
//         setLoading(true);

//         const response = await axios.post<CaseStudyResponse>(
//           `${apiUrl}/caseStudyList`,
//           {},
//           {
//             headers: {
//               Accept: "application/json",
//             },
//           },
//         );

//         if (response.data?.success) {
//           setBrandStories(response.data.data ?? []);
//         } else {
//           setBrandStories([]);
//         }
//       } catch (error) {
//         console.error("Case study list API error:", error);
//         setBrandStories([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseStudies();
//   }, []);

//   /*
//    * Tracks the complete dynamic card section.
//    * No manually calculated scroll spacer is required because every card
//    * already contributes one viewport of scroll height.
//    */
 


//   return (
//     <main
//       className="
//         overflow-visible
//         bg-[#f6f6f6]
      
//         font-sans    

//        px-4 py-[20px] lg:py-[30px] 2xl:py-[85px] lg:px-6 xl:px-10 2xl:px-32
//       "
//     >
//       {/* Main section heading remains unchanged. */}
//       <div className="mx-auto w-full max-w-full ">
//         <div className="shrink-0">
//           <h2
//             className="
//               text-[28px]
//               font-bold
//               leading-[1.05]
//               text-primary

//               sm:text-[32px]
//               md:text-[38px]
//               lg:text-[44px]
//               min-[1440px]:text-[48px]
//               min-[1920px]:text-[54px]
//             "
//           >
//             Story Behind Brand Building
//           </h2>

//           <p
//             className="
//               mt-2
//               max-w-[900px]
//               text-[14px]
//               leading-relaxed
//               text-black

//               sm:text-[16px]
//               md:text-[18px]
//               lg:text-[20px]
//               min-[1440px]:text-[22px]
//               min-[1920px]:text-[24px]
//             "
//           >
//             Explore the process behind crafting memorable brand experiences.
//           </p>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex min-h-[520px] items-center justify-center">
//           <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
//         </div>
//       ) : total === 0 ? (
//         <div className="flex min-h-[520px] items-center justify-center">
//           <p className="text-[#626262]">No case studies found.</p>
//         </div>
//       ) : (
//       <CaseStudyStack brandStories={brandStories} />
//       )}

//       {!loading && total > 0 && (
//         <div className="mx-auto flex w-full max-w-[1800px] justify-center pb-10 pt-4 sm:pb-14 lg:pb-20">
//           <button
//             type="button"
//             onClick={() => router.push("/CaseStudies")}
//             className="
//               brand-case-study-button
//               group
//               inline-flex
//               items-center
//               justify-center
//               gap-3
//               rounded-full
//               bg-primary
//               px-5
//               py-2.5
//               text-[14px]
//               font-bold
//               text-white
//               shadow-lg
//               shadow-primary/20
//               transition-all
//               duration-300

//               hover:-translate-y-1
//               hover:bg-[#7a1f50]
//               hover:shadow-xl

//               sm:px-6
//               sm:py-3
//               sm:text-[16px]

//               lg:gap-5
//               lg:px-7
//               lg:text-[18px]

//               min-[1440px]:gap-6
//               min-[1440px]:px-8
//               min-[1440px]:text-[20px]

//               min-[1920px]:px-9
//               min-[1920px]:text-[22px]
//             "
//           >
//             Case Studies

//             <LuMoveUpRight
//               className="
//                 h-4
//                 w-4
//                 transition-transform
//                 duration-300
//                 group-hover:translate-x-1
//                 group-hover:-translate-y-1

//                 lg:h-5
//                 lg:w-5
//               "
//             />
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }


// function CaseStudyStack({
//   brandStories,
// }: {
//   brandStories: CaseStudyItem[];
// }) {
//   const stackSectionRef = useRef<HTMLElement | null>(null);
//   const total = brandStories.length;

//   const { scrollYProgress } = useScroll({
//     target: stackSectionRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 70,
//     damping: 30,
//     mass: 0.8,
//   });

//   return (
//     <section
//       ref={stackSectionRef}
//       className="mt-4 w-full max-w-full sm:mt-6 lg:mt-8"
//     >
//       {brandStories.map((item, index) => {
//         const rangeStart = total > 1 ? index / total : 0;

//         const targetScale = Math.max(
//           0.76,
//           1 - (total - index) * 0.05,
//         );

//         return (
//           <StackingCaseStudyCard
//             key={item.id}
//             item={item}
//             index={index}
//             progress={smoothProgress}
//             range={[rangeStart, 1]}
//             targetScale={targetScale}
//           />
//         );
//       })}
//     </section>
//   );
// }

// type StackingCaseStudyCardProps = {
//   item: CaseStudyItem;
//   index: number;
//   progress: MotionValue<number>;
//   range: [number, number];
//   targetScale: number;
// };

// function StackingCaseStudyCard({
//   item,
//   index,
//   progress,
//   range,
//   targetScale,
// }: StackingCaseStudyCardProps) {
//   const cardRef = useRef<HTMLDivElement | null>(null);

//   /*
//    * Zoom the complete outside card when it enters the viewport.
//    * The image itself remains at scale 1.
//    */
//   const { scrollYProgress: cardScrollProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "start start"],
//   });

//   const entryScale = useTransform(
//     cardScrollProgress,
//     [0, 1],
//     [0.9, 1],
//     { clamp: true },
//   );

//   /*
//    * Older cards shrink while newer cards stack above them.
//    */
//   const stackScale = useTransform(
//     progress,
//     range,
//     [1, targetScale],
//     { clamp: true },
//   );

//   /*
//    * Combines the card-entry zoom with the stacking scale.
//    */
//   const cardScale = useTransform(
//     [entryScale, stackScale],
//     ([entry, stack]) => Number(entry) * Number(stack),
//   );

//   return (
//     <div
//       ref={cardRef}
//       className="sticky top-0 flex h-[100svh] max-w-full w-full items-center justify-center"
//     >
//       <motion.article
//         style={{
//           scale: cardScale,
//           top: `${index * 12}px`,
//           zIndex: index + 1,
//         }}
//         className="
//           relative
//           h-[calc(100svh-24px)]
//           w-full
//           origin-center
//           overflow-hidden
//           rounded-lg
//           bg-white
//           shadow-[0_22px_70px_rgba(0,0,0,0.18)]
//           will-change-transform

//           sm:h-[calc(100svh-32px)]
//           sm:rounded-xl

//           md:h-[calc(100svh-40px)]

//           lg:h-[calc(100dvh-48px)]
//           lg:rounded-2xl

//           min-[1440px]:h-[calc(100dvh-56px)]

//           min-[1920px]:h-[calc(100dvh-72px)]
//         "
//       >
//         <Link
//           href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
//           aria-label={`View case study: ${item.title}`}
//           className="group relative block h-full w-full overflow-hidden"
//         >
//           <div className="absolute inset-0 h-full w-full">
//             <img
//               src={item.hero_image}
//               alt={item.title}
//               draggable={false}
//               className="
//                 block
//                 h-full
//                 w-full
//                 max-w-none
//                 bg-white
//                    object-contain
//             object-center

//              md:bg-transparent
//              md:object-cover
//               "
//             />
//           </div>

//           {/* Existing title position and title box kept unchanged. */}
//           <div
//             className="
//               absolute
//               inset-x-0
//               top-0
//               z-10
//               p-2.5
//               sm:p-3
//               md:p-5
//               lg:p-7
//               min-[1410px]:p-8
//             "
//           >
//             <div
//               className="
//                 inline-block
//                 max-w-[85%]
//                 rounded-lg
//                 border
//                 border-white/25
//                 bg-black/45
//                 px-3
//                 py-2
//                 shadow-[0_6px_20px_rgba(0,0,0,0.18)]
//                 backdrop-blur-md

//                 sm:max-w-[80%]
//                 sm:rounded-xl
//                 sm:px-4
//                 sm:py-2.5

//                 md:max-w-[75%]
//                 md:px-5
//                 md:py-3

//                 lg:max-w-[78%]
//                 lg:rounded-2xl
//                 lg:px-7
//                 lg:py-4

//                 min-[1410px]:rounded-[20px]
//                 min-[1410px]:px-8
//                 min-[1410px]:py-5
//               "
//             >
//               <h3
//                 className="
//                   !m-0
//                   !capitalize
//                   text-[16px]
//                   font-bold
//                   leading-tight
//                   text-white

//                   sm:text-[18px]
//                   md:text-[24px]
//                   lg:text-[36px]
//                   xl:text-[42px]
//                   min-[1410px]:text-[48px]
//                 "
//               >
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         </Link>
//       </motion.article>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuMoveUpRight } from "react-icons/lu";

import { apiUrl } from "../config";

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
  const router = useRouter();

  const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const total = brandStories.length;


  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);

        const response = await axios.post<CaseStudyResponse>(
          `${apiUrl}/caseStudyList`,
          {},
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (response.data?.success) {
          setBrandStories(response.data.data ?? []);
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

    fetchCaseStudies();
  }, []);

  /*
   * Tracks the complete dynamic card section.
   * No manually calculated scroll spacer is required because every card
   * already contributes one viewport of scroll height.
   */
 


  return (
    <main
      className="
        overflow-visible
        bg-[#f6f6f6]
        px-4
        pb-0
        pt-6
        font-sans

        md:px-6
        md:pt-8

        min-[1440px]:px-10
        min-[1440px]:pt-[50px]

        min-[1680px]:px-16
        min-[1920px]:px-32
        min-[1920px]:pt-[60px]
      "
    >
      {/* Main section heading remains unchanged. */}
      <div className="mx-auto w-full max-w-full">
        <div className="shrink-0">
          <h2
            className="
              text-[28px]
              font-bold
              leading-[1.05]
              text-primary

              sm:text-[32px]
              md:text-[38px]
              lg:text-[44px]
              min-[1440px]:text-[48px]
              min-[1920px]:text-[54px]
            "
          >
            Story Behind Brand Building
          </h2>

          <p
            className="
              mt-2
              max-w-[900px]
              text-[14px]
              leading-relaxed
              text-black

              sm:text-[16px]
              md:text-[18px]
              lg:text-[20px]
              min-[1440px]:text-[22px]
              min-[1920px]:text-[24px]
            "
          >
            Explore the process behind crafting memorable brand experiences.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[520px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
        </div>
      ) : total === 0 ? (
        <div className="flex min-h-[520px] items-center justify-center">
          <p className="text-[#626262]">No case studies found.</p>
        </div>
      ) : (
      <CaseStudyStack brandStories={brandStories} />
      )}

      {!loading && total > 0 && (
        <div className="mx-auto flex w-full max-w-[1800px] justify-center pb-10 pt-4 sm:pb-14 lg:pb-20">
          <button
            type="button"
            onClick={() => router.push("/CaseStudies")}
            className="
              brand-case-study-button
              group
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-full
              bg-primary
              px-5
              py-2.5
              text-[14px]
              font-bold
              text-white
              shadow-lg
              shadow-primary/20
              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-[#7a1f50]
              hover:shadow-xl

              sm:px-6
              sm:py-3
              sm:text-[16px]

              lg:gap-5
              lg:px-7
              lg:text-[18px]

              min-[1440px]:gap-6
              min-[1440px]:px-8
              min-[1440px]:text-[20px]

              min-[1920px]:px-9
              min-[1920px]:text-[22px]
            "
          >
            Case Studies

            <LuMoveUpRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1

                lg:h-5
                lg:w-5
              "
            />
          </button>
        </div>
      )}
    </main>
  );
}


function CaseStudyStack({
  brandStories,
}: {
  brandStories: CaseStudyItem[];
}) {
  const stackSectionRef = useRef<HTMLElement | null>(null);
  const total = brandStories.length;

  const { scrollYProgress } = useScroll({
    target: stackSectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    mass: 0.8,
  });

  return (
    <section
      ref={stackSectionRef}
      className="mx-auto mt-4 w-full max-w-none sm:mt-6 lg:mt-8"
    >
      {brandStories.map((item, index) => {
        const rangeStart = total > 1 ? index / total : 0;

        const targetScale = Math.max(
          0.76,
          1 - (total - index) * 0.05,
        );

        return (
          <StackingCaseStudyCard
            key={item.id}
            item={item}
            index={index}
            progress={smoothProgress}
            range={[rangeStart, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}

type StackingCaseStudyCardProps = {
  item: CaseStudyItem;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function StackingCaseStudyCard({
  item,
  index,
  progress,
  range,
  targetScale,
}: StackingCaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  /*
   * The first card is fully visible at its correct size by default.
   * Every following card moves upward and settles into the sticky stack.
   */
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const entryScale = useTransform(
    cardScrollProgress,
    [0, 1],
    index === 0 ? [1, 1] : [0.96, 1],
    { clamp: true },
  );

  const entryY = useTransform(
    cardScrollProgress,
    [0, 1],
    index === 0 ? ["0vh", "0vh"] : ["12vh", "0vh"],
    { clamp: true },
  );

  const entryOpacity = useTransform(
    cardScrollProgress,
    [0, 1],
    index === 0 ? [1, 1] : [0.88, 1],
    { clamp: true },
  );

  /*
   * Cards already in the stack become slightly smaller while the next
   * case-study card moves over them.
   */
  const stackScale = useTransform(
    progress,
    range,
    [1, targetScale],
    { clamp: true },
  );

  const cardScale = useTransform(
    [entryScale, stackScale],
    ([entry, stack]) => Number(entry) * Number(stack),
  );

  return (
    <div
      ref={cardRef}
      className="
        sticky
        top-0
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        py-3
max-w-full
        sm:py-4
        lg:min-h-[100dvh]
        lg:py-6
      "
    >
      <motion.article
        style={{
          scale: cardScale,
          y: entryY,
          opacity: entryOpacity,
          zIndex: index + 1,
        }}
        className="
          relative
          aspect-[4/5]
          w-full
          max-w-full
          origin-center
          overflow-hidden
          rounded-lg
          bg-white
          shadow-[0_22px_70px_rgba(0,0,0,0.18)]
          will-change-transform

          sm:aspect-[4/3]
          sm:w-[96%]
          sm:rounded-xl

          md:w-[94%]

          lg:aspect-[16/9]
          lg:w-[92%]
          lg:rounded-2xl

          min-[1440px]:w-[94%]
          min-[1920px]:w-[100%]
        "
      >
        <Link
          href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
          aria-label={`View case study: ${item.title}`}
          className="group relative block h-full w-full overflow-hidden"
        >
          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white">
            <img
              src={item.hero_image}
              alt={item.title}
              draggable={false}
              className="
                block
                h-full
                w-full
                max-w-none
                object-cover
                object-center
              "
            />
          </div>

          {/* Existing title position and title box kept unchanged. */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              z-10
              p-2.5
              sm:p-3
              md:p-5
              lg:p-7
              min-[1410px]:p-8
            "
          >
            <div
              className="
                inline-block
                max-w-[85%]
                rounded-lg
                border
                border-white/25
                bg-black/45
                px-3
                py-2
                shadow-[0_6px_20px_rgba(0,0,0,0.18)]
                backdrop-blur-md

                sm:max-w-[80%]
                sm:rounded-xl
                sm:px-4
                sm:py-2.5

                md:max-w-[75%]
                md:px-5
                md:py-3

                lg:max-w-[78%]
                lg:rounded-2xl
                lg:px-7
                lg:py-4

                min-[1410px]:rounded-[20px]
                min-[1410px]:px-8
                min-[1410px]:py-5
              "
            >
              <h3
                className="
                  !m-0
                  !capitalize
                  text-[16px]
                  font-bold
                  leading-tight
                  text-white

                  sm:text-[18px]
                  md:text-[24px]
                  lg:text-[36px]
                  xl:text-[42px]
                  min-[1410px]:text-[48px]
                "
              >
                {item.title}
              </h3>
            </div>
          </div>
        </Link>
      </motion.article>
    </div>
  );
} 