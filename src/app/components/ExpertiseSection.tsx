// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type ServiceItem = {
//   id: number;
//   service_name: string;
//   image: string | null;
// };

// const ITEM_HEIGHT = 74;
// const ITEM_GAP = 5;
// const HEADER_HEIGHT = 88; // change this if your sticky header height is different
// const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

// export default function ExpertiseSection() {
//   const [expertiseData] = useState<ServiceItem[]>([
//     {
//       id: 1,
//       service_name: "Market Research",
//       image: null,
//     },
//     {
//       id: 2,
//       service_name: "Strategic Brand Consulting",
//       image: null,
//     },
//     {
//       id: 3,
//       service_name: "Brand Identity Creation",
//       image: null,
//     },
//     {
//       id: 4,
//       service_name: "Conceptual Packaging Design",
//       image: null,
//     },
//     {
//       id: 5,
//       service_name: "Advertising Campaign Design",
//       image: null,
//     },
//   ]);

//   const [activeIndex, setActiveIndex] = useState(0);

//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current || expertiseData.length === 0) return;

//       const section = sectionRef.current;
//       const rect = section.getBoundingClientRect();

//       const totalScrollHeight =
//         section.offsetHeight - window.innerHeight + HEADER_HEIGHT;

//       if (totalScrollHeight <= 0) return;

//       const scrollProgress = Math.min(
//         Math.max((-rect.top + HEADER_HEIGHT) / totalScrollHeight, 0),
//         1
//       );

//       const newIndex = Math.round(scrollProgress * (expertiseData.length - 1));

//       setActiveIndex(newIndex);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [expertiseData.length]);

//   const visibleItems = useMemo(() => {
//     if (expertiseData.length === 0) return [];

//     return VISIBLE_OFFSETS.map((offset) => {
//       const index = activeIndex + offset;

//       if (index < 0 || index >= expertiseData.length) {
//         return null;
//       }

//       return {
//         ...expertiseData[index],
//         offset,
//         index,
//       };
//     }).filter(Boolean) as Array<
//       ServiceItem & {
//         offset: number;
//         index: number;
//       }
//     >;
//   }, [activeIndex, expertiseData]);

// return (
//   <section
//     ref={sectionRef}
//     className="relative bg-white"
//     style={{
//       height: `calc(100vh + ${(expertiseData.length - 1) * 22}vh)`,
//     }}
//   >
//     <div
//       className="
//         sticky
//         top-[90px]
//         flex
//         h-[calc(100vh-90px)]
//         items-center
//         overflow-hidden
//         bg-white
//       "
//     >
//       <div
//         className="
//           mx-auto
//           grid
//           w-full
//           max-w-full
//           grid-cols-1
//           items-center
//           gap-4
//           px-8
//           md:px-16
//           lg:grid-cols-[58%_42%]
//           xl:px-24
//           2xl:px-32
//         "
//       >
//         {/* Left Content */}
//         <div className="flex w-full -translate-y-6 flex-col justify-center">
//           <h2 className="mb-8 leading-none text-primary">
//             Expertise
//           </h2>

//           <div className="relative w-full max-w-[760px] overflow-hidden">
//             <div
//               className="relative"
//               style={{
//                 height: `${(ITEM_HEIGHT + ITEM_GAP) * VISIBLE_OFFSETS.length}px`,
//               }}
//             >
//               <AnimatePresence initial={false}>
//                 {visibleItems.map(({ id, service_name, offset, index }) => {
//                   const isActive = offset === 0;
//                   const distance = Math.abs(offset);

//                   return (
//                     <motion.div
//                       key={id}
//                       onClick={() => setActiveIndex(index)}
//                       initial={false}
//                       animate={{
//                         y:
//                           offset * (ITEM_HEIGHT + ITEM_GAP) +
//                           (ITEM_HEIGHT + ITEM_GAP) * 2,
//                         opacity:
//                           distance === 0
//                             ? 1
//                             : distance === 1
//                             ? 0.45
//                             : 0.12,
//                       }}
//                       transition={{
//                         duration: 0.35,
//                         ease: "easeOut",
//                       }}
//                       style={{
//                         height: ITEM_HEIGHT + ITEM_GAP,
//                       }}
//                       className="absolute left-0 top-0 flex w-full cursor-pointer items-center justify-center"
//                     >
//                       <motion.span
//                         layout
//                         className={`inline-flex h-[68px] min-w-[680px] items-center justify-center rounded-full uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-300 ${
//                           isActive
//                             ? "bg-gradient-to-r from-[#C22C86] to-[#760052] text-white text-[24px] lg:text-[26px] 2xl:text-[30px] font-semibold shadow-lg"
//                             : "text-[#D8D8D8] text-[24px] lg:text-[26px] 2xl:text-[30px] font-semibold"
//                         }`}
//                       >
//                         {service_name}
//                       </motion.span>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>

//             <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent" />
//             <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
//           </div>
//         </div>

//         {/* Right GIF */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="
//             relative
//             flex
//             h-full
//             -translate-y-2
//             items-center
//             justify-end
//           "
//         >
//           <img
//             src="/assets/Homepage banner/Expertisegif1.gif"
//             alt="Expertise Animation"
//             className="
//               h-auto
//               w-full
//               max-w-[300px]
//               object-contain
//               2xl:max-w-[350px]
//             "
//           />
//         </motion.div>
//       </div>
//     </div>
//   </section>
// );
// }

// "use client";

// import { useMemo, useRef, useState } from "react";
// import { motion } from "framer-motion";

// type ServiceItem = {
//   id: number;
//   service_name: string;
//   image: string | null;
// };

// const ITEM_HEIGHT = 55;
// const ITEM_GAP = 10;
// const ITEM_STEP = ITEM_HEIGHT + ITEM_GAP;
// const LIST_HEIGHT = 300;

// export default function ExpertiseSection() {
//   const [expertiseData] = useState<ServiceItem[]>([
//     {
//       id: 1,
//       service_name: "Market Research",
//       image: null,
//     },
//     {
//       id: 2,
//       service_name: "Strategic Brand Consulting",
//       image: null,
//     },
//     {
//       id: 3,
//       service_name: "Brand Identity Creation",
//       image: null,
//     },
//     {
//       id: 4,
//       service_name: "Conceptual Packaging Design",
//       image: null,
//     },
//     {
//       id: 5,
//       service_name: "Advertising Campaign Design",
//       image: null,
//     },
//   ]);

//   const [activeIndex, setActiveIndex] = useState(0);

//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const wheelLockRef = useRef(false);

//   const listPadding = useMemo(() => {
//     return (LIST_HEIGHT - ITEM_HEIGHT) / 2;
//   }, []);

//   const handleScroll = () => {
//     if (!scrollRef.current) return;

//     const scrollTop = scrollRef.current.scrollTop;
//     const newIndex = Math.round(scrollTop / ITEM_STEP);

//     const safeIndex = Math.min(
//       Math.max(newIndex, 0),
//       expertiseData.length - 1
//     );

//     setActiveIndex(safeIndex);
//   };

//   const scrollToItem = (index: number) => {
//     const safeIndex = Math.min(Math.max(index, 0), expertiseData.length - 1);

//     setActiveIndex(safeIndex);

//     scrollRef.current?.scrollTo({
//       top: safeIndex * ITEM_STEP,
//       behavior: "smooth",
//     });
//   };

//   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     e.preventDefault();

//     if (wheelLockRef.current) return;

//     wheelLockRef.current = true;

//     const direction = e.deltaY > 0 ? 1 : -1;

//     const nextIndex = Math.min(
//       Math.max(activeIndex + direction, 0),
//       expertiseData.length - 1
//     );

//     scrollToItem(nextIndex);

//     setTimeout(() => {
//       wheelLockRef.current = false;
//     }, 420);
//   };

//   return (
//     <section className="relative flex items-center overflow-hidden bg-white py-16">
//       <div
//         className="
//           mx-auto
//           grid
//           w-full
//           max-w-full
//           grid-cols-1
//           items-center
//           gap-4
//           px-8
//           md:px-16
//           lg:grid-cols-[60%_40%]
//           xl:px-24
//           2xl:px-32
//         "
//       >
//         {/* Left Content */}
//         <div className="flex w-full flex-col justify-center">
//           <h2 className="mb-10 leading-none text-primary">Expertise</h2>

//           <div className="relative w-full max-w-[760px] overflow-hidden">
//             <div
//               ref={scrollRef}
//               onScroll={handleScroll}
//               onWheel={handleWheel}
//               className="
//                 expertise-scroll
//                 relative
//                 w-full
//                 overflow-y-auto
//                 overflow-x-hidden
//                 pr-2
//                 scroll-smooth
//               "
//               style={{
//                 height: `${LIST_HEIGHT}px`,
//                 scrollSnapType: "y mandatory",
//               }}
//             >
//               <div
//                 style={{
//                   paddingTop: `${listPadding}px`,
//                   paddingBottom: `${listPadding}px`,
//                 }}
//               >
//                 {expertiseData.map((item, index) => {
//                   const isActive = activeIndex === index;
//                   const distance = Math.abs(activeIndex - index);

//                   return (
//                     <motion.button
//                       key={item.id}
//                       type="button"
//                       onClick={() => scrollToItem(index)}
//                       animate={{
//                         opacity:
//                           distance === 0
//                             ? 1
//                             : distance === 1
//                             ? 0.45
//                             : 0.18,
//                         scale: isActive ? 1 : 0.96,
//                         y: isActive ? 0 : distance * 2,
//                       }}
//                       transition={{
//                         duration: 0.45,
//                         ease: [0.22, 1, 0.36, 1],
//                       }}
//                       className="
//                         mb-[10px]
//                         flex
//                         w-full
//                         cursor-pointer
//                         items-center
//                         justify-center
//                         border-0
//                         bg-transparent
//                         p-0
//                       "
//                       style={{
//                         height: `${ITEM_HEIGHT}px`,
//                         scrollSnapAlign: "center",
//                       }}
//                     >
//                       <span
//                         className={`
//                           inline-flex
//                           h-[55px]
//                           min-w-[680px]
//                           items-center
//                           justify-center
//                           rounded-full
//                           px-8
//                           text-center
//                           uppercase
//                           tracking-[0.08em]
//                           whitespace-nowrap
//                           transition-all
//                           duration-500
//                           ease-out
//                           ${
//                             isActive
//                               ? "bg-gradient-to-r from-[#C22C86] to-[#760052] text-[22px] font-semibold text-white shadow-lg lg:text-[24px] 2xl:text-[28px]"
//                               : "text-[22px] font-semibold text-[#ababab] lg:text-[24px] 2xl:text-[28px]"
//                           }
//                         `}
//                       >
//                         {item.service_name}
//                       </span>
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
//             <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
//           </div>
//         </div>

//         {/* Right GIF */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{
//             duration: 0.8,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="
//             relative
//             flex
//             h-full
//             items-center
//             justify-end
//             lg:-translate-x-10
//           "
//         >
//           <img
//             src="/assets/Homepage banner/Expertisegif1.gif"
//             alt="Expertise Animation"
//             className="
//               h-auto
//               w-full
//               max-w-[300px]
//               object-contain
//               2xl:max-w-[350px]
//             "
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { apiUrl } from "../config";

// type ExpertiseItem = {
//   id: number;
//   expertise_name: string;
//   short_description?: string;
//   image: string | null;
//   sequence_number?: number;
//   show_home_page?: number;
//   status?: number;
//   meta_title?: string;
//   meta_keyword?: string;
//   meta_description?: string;
//   head?: string;
//   body?: string;
//   created_at?: string;
// };

// const ITEM_HEIGHT = 55;
// const ITEM_GAP = 10;
// const ITEM_STEP = ITEM_HEIGHT + ITEM_GAP;
// const LIST_HEIGHT = 300;

// export default function ExpertiseSection() {
//   const [expertiseData, setExpertiseData] = useState<ExpertiseItem[]>([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const wheelLockRef = useRef(false);

//   const listPadding = useMemo(() => {
//     return (LIST_HEIGHT - ITEM_HEIGHT) / 2;
//   }, []);

//   const fetchExpertiseList = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${apiUrl}/expertiseList`,
//         {},
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data?.success && Array.isArray(res.data?.data)) {
//         const sortedData = [...res.data.data]
//           .filter((item) => Number(item.status) === 1)
//           .sort(
//             (a, b) =>
//               Number(a.sequence_number || 0) - Number(b.sequence_number || 0)
//           );

//         setExpertiseData(sortedData);
//         setActiveIndex(0);
//       } else {
//         setExpertiseData([]);
//       }
//     } catch (error) {
//       console.error("Expertise List API Error:", error);
//       setExpertiseData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpertiseList();
//   }, []);

//   const handleScroll = () => {
//     if (!scrollRef.current || expertiseData.length === 0) return;

//     const scrollTop = scrollRef.current.scrollTop;
//     const newIndex = Math.round(scrollTop / ITEM_STEP);

//     const safeIndex = Math.min(
//       Math.max(newIndex, 0),
//       expertiseData.length - 1
//     );

//     setActiveIndex(safeIndex);
//   };

//   const scrollToItem = (index: number) => {
//     if (expertiseData.length === 0) return;

//     const safeIndex = Math.min(Math.max(index, 0), expertiseData.length - 1);

//     setActiveIndex(safeIndex);

//     scrollRef.current?.scrollTo({
//       top: safeIndex * ITEM_STEP,
//       behavior: "smooth",
//     });
//   };

//   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     e.preventDefault();

//     if (expertiseData.length === 0) return;
//     if (wheelLockRef.current) return;

//     wheelLockRef.current = true;

//     const direction = e.deltaY > 0 ? 1 : -1;

//     const nextIndex = Math.min(
//       Math.max(activeIndex + direction, 0),
//       expertiseData.length - 1
//     );

//     scrollToItem(nextIndex);

//     setTimeout(() => {
//       wheelLockRef.current = false;
//     }, 420);
//   };

//   return (
//     <section className="relative flex items-center overflow-hidden bg-white py-16">
//       <div
//         className="
//           mx-auto
//           grid
//           w-full
//           max-w-full
//           grid-cols-1
//           items-center
//           gap-4
//           px-8
//           md:px-16
//           lg:grid-cols-[60%_40%]
//           xl:px-24
//           2xl:px-32
//         "
//       >
//         {/* Left Content */}
//         <div className="flex w-full flex-col justify-center">
//           <h2 className="mb-10 leading-none text-primary">Expertise</h2>

//           <div className="relative w-full max-w-[760px] overflow-hidden">
//             {loading ? (
//               <div className="flex h-[300px] items-center justify-center text-[22px] font-semibold text-[#ababab]">
//                 Loading...
//               </div>
//             ) : expertiseData.length === 0 ? (
//               <div className="flex h-[300px] items-center justify-center text-[22px] font-semibold text-[#ababab]">
//                 No expertise found
//               </div>
//             ) : (
//               <>
//                 <div
//                   ref={scrollRef}
//                   onScroll={handleScroll}
//                   onWheel={handleWheel}
//                   className="
//                     expertise-scroll
//                     relative
//                     w-full
//                     overflow-y-auto
//                     overflow-x-hidden
//                     pr-2
//                     scroll-smooth
//                   "
//                   style={{
//                     height: `${LIST_HEIGHT}px`,
//                     scrollSnapType: "y mandatory",
//                   }}
//                 >
//                   <div
//                     style={{
//                       paddingTop: `${listPadding}px`,
//                       paddingBottom: `${listPadding}px`,
//                     }}
//                   >
//                     {expertiseData.map((item, index) => {
//                       const isActive = activeIndex === index;
//                       const distance = Math.abs(activeIndex - index);

//                       return (
//                         <motion.button
//                           key={item.id}
//                           type="button"
//                           onClick={() => scrollToItem(index)}
//                           animate={{
//                             opacity:
//                               distance === 0
//                                 ? 1
//                                 : distance === 1
//                                 ? 0.45
//                                 : 0.18,
//                             scale: isActive ? 1 : 0.96,
//                             y: isActive ? 0 : distance * 2,
//                           }}
//                           transition={{
//                             duration: 0.45,
//                             ease: [0.22, 1, 0.36, 1],
//                           }}
//                           className="
//                             mb-[10px]
//                             flex
//                             w-full
//                             cursor-pointer
//                             items-center
//                             justify-center
//                             border-0
//                             bg-transparent
//                             p-0
//                           "
//                           style={{
//                             height: `${ITEM_HEIGHT}px`,
//                             scrollSnapAlign: "center",
//                           }}
//                         >
//                           <span
//                             className={`
//                               inline-flex
//                               h-[55px]
//                               min-w-[680px]
//                               items-center
//                               justify-center
//                               rounded-full
//                               px-8
//                               text-center
//                               uppercase
//                               tracking-[0.08em]
//                               whitespace-nowrap
//                               transition-all
//                               duration-500
//                               ease-out
//                               ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-[#C22C86] to-[#760052] text-[22px] font-semibold text-white shadow-lg lg:text-[24px] 2xl:text-[28px]"
//                                   : "text-[22px] font-semibold text-[#ababab] lg:text-[24px] 2xl:text-[28px]"
//                               }
//                             `}
//                           >
//                             {item.expertise_name}
//                           </span>
//                         </motion.button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
//                 <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
//               </>
//             )}
//           </div>
//         </div>

//         {/* Right GIF - fixed old GIF */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{
//             duration: 0.8,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="
//             relative
//             flex
//             h-full
//             items-center
//             justify-end
//             lg:-translate-x-10
//           "
//         >
//           <img
//             src="/assets/Homepage banner/Expertisegif1.gif"
//             alt="Expertise Animation"
//             className="
//               h-auto
//               w-full
//               max-w-[300px]
//               object-contain
//               2xl:max-w-[350px]
//             "
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import axios from "axios";
// import { apiUrl } from "../config";

// type ExpertiseItem = {
//   id: number;
//   expertise_name: string;
//   short_description?: string;
//   image: string | null;
//   sequence_number?: number;
//   show_home_page?: number;
//   status?: number;
//   meta_title?: string;
//   meta_keyword?: string;
//   meta_description?: string;
//   head?: string;
//   body?: string;
//   created_at?: string;
// };

// const ITEM_HEIGHT = 74;
// const ITEM_GAP = 5;
// const ITEM_STEP = ITEM_HEIGHT + ITEM_GAP;

// const HEADER_HEIGHT = 90;
// const INNER_LIST_HEIGHT = ITEM_STEP * 5;
// const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];
// const LIST_HEIGHT = 300;
// export default function ExpertiseSection() {
//   const [expertiseData, setExpertiseData] = useState<ExpertiseItem[]>([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const sectionRef = useRef<HTMLElement | null>(null);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const wheelLockRef = useRef(false);

//   const listPadding = useMemo(() => {
//     return (LIST_HEIGHT - ITEM_HEIGHT) / 2;
//   }, []);
//   const fetchExpertiseList = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${apiUrl}/expertiseList`,
//         {},
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data?.success && Array.isArray(res.data?.data)) {
//         const sortedData = [...res.data.data]
//           .filter((item) => Number(item.status) === 1)
//           .sort(
//             (a, b) =>
//               Number(a.sequence_number || 0) - Number(b.sequence_number || 0)
//           );

//         setExpertiseData(sortedData);
//         setActiveIndex(0);
//       } else {
//         setExpertiseData([]);
//       }
//     } catch (error) {
//       console.error("Expertise List API Error:", error);
//       setExpertiseData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpertiseList();
//   }, []);

//   useEffect(() => {
//     const handleWindowScroll = () => {
//       if (!sectionRef.current || expertiseData.length === 0) return;

//       const section = sectionRef.current;
//       const rect = section.getBoundingClientRect();

//       const totalScrollHeight =
//         section.offsetHeight - window.innerHeight + HEADER_HEIGHT;

//       if (totalScrollHeight <= 0) return;

//       const scrollProgress = Math.min(
//         Math.max((-rect.top + HEADER_HEIGHT) / totalScrollHeight, 0),
//         1
//       );

//       const newIndex = Math.round(scrollProgress * (expertiseData.length - 1));

//       const safeIndex = Math.min(
//         Math.max(newIndex, 0),
//         expertiseData.length - 1
//       );

//       setActiveIndex(safeIndex);
//     };

//     window.addEventListener("scroll", handleWindowScroll, { passive: true });
//     handleWindowScroll();

//     return () => {
//       window.removeEventListener("scroll", handleWindowScroll);
//     };
//   }, [expertiseData.length]);

//   const scrollToItem = (index: number) => {
//     if (!sectionRef.current || expertiseData.length === 0) return;

//     const safeIndex = Math.min(Math.max(index, 0), expertiseData.length - 1);

//     setActiveIndex(safeIndex);

//     const section = sectionRef.current;
//     const sectionTop = window.scrollY + section.getBoundingClientRect().top;

//     const totalScrollHeight =
//       section.offsetHeight - window.innerHeight + HEADER_HEIGHT;

//     const progress =
//       expertiseData.length > 1 ? safeIndex / (expertiseData.length - 1) : 0;

//     const targetScrollTop =
//       sectionTop - HEADER_HEIGHT + progress * totalScrollHeight;

//     window.scrollTo({
//       top: targetScrollTop,
//       behavior: "smooth",
//     });
//   };

//   const visibleItems = useMemo(() => {
//     if (expertiseData.length === 0) return [];

//     return VISIBLE_OFFSETS.map((offset) => {
//       const index = activeIndex + offset;

//       if (index < 0 || index >= expertiseData.length) {
//         return null;
//       }

//       return {
//         ...expertiseData[index],
//         offset,
//         index,
//       };
//     }).filter(Boolean) as Array<
//       ExpertiseItem & {
//         offset: number;
//         index: number;
//       }
//     >;
//   }, [activeIndex, expertiseData]);
// const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//   if (expertiseData.length === 0) return;
//   if (wheelLockRef.current) return;

//   const direction = e.deltaY > 0 ? 1 : -1;

//   const nextIndex = Math.min(
//     Math.max(activeIndex + direction, 0),
//     expertiseData.length - 1
//   );

//   if (nextIndex === activeIndex) return;

//   e.preventDefault();

//   wheelLockRef.current = true;

//   scrollToItem(nextIndex);

//   setTimeout(() => {
//     wheelLockRef.current = false;
//   }, 420);
// };
// const handleScroll = () => {
//   if (!scrollRef.current || expertiseData.length === 0) return;

//   const scrollTop = scrollRef.current.scrollTop;
//   const newIndex = Math.round(scrollTop / ITEM_STEP);

//   const safeIndex = Math.min(
//     Math.max(newIndex, 0),
//     expertiseData.length - 1
//   );

//   setActiveIndex(safeIndex);
// };
//  return (
//   <section className="relative h-[780px] w-full overflow-hidden bg-white">
//     <div
//       className="
//         mx-auto
//         grid
//         h-full
//         w-full
//         max-w-full
//         grid-cols-1
//         items-center
//         gap-4
//         px-8
//         md:px-16
//         lg:grid-cols-[60%_40%]
//         xl:px-24
//         2xl:px-32
//       "
//     >
//       {/* Left Content */}
//       <div className="flex h-full w-full flex-col justify-center">
//         <h2 className="mb-10 leading-none text-primary">Expertise</h2>

//         {/* Inner fixed height scroll area */}
//         <div className="relative w-full overflow-hidden">
//           {loading ? (
//             <div className="flex h-[300px] w-full items-center justify-center text-[22px] font-semibold text-[#ababab]">
//               Loading...
//             </div>
//           ) : expertiseData.length === 0 ? (
//             <div className="flex h-[300px] w-full items-center justify-center text-[22px] font-semibold text-[#ababab]">
//               No expertise found
//             </div>
//           ) : (
//             <>
//               <div
//                 ref={scrollRef}
//                 onScroll={handleScroll}
//                 onWheel={handleWheel}
//                 className="
//                   expertise-scroll
//                   relative
//                   h-[300px]
//                   w-full
//                   overflow-y-auto
//                   overflow-x-hidden
//                   scroll-smooth
//                 "
//                 style={{
//                   scrollSnapType: "y mandatory",
//                 }}
//               >
//                 <div
//                   className="w-full"
//                   style={{
//                     paddingTop: `${listPadding}px`,
//                     paddingBottom: `${listPadding}px`,
//                   }}
//                 >
//                   {expertiseData.map((item, index) => {
//                     const isActive = activeIndex === index;
//                     const distance = Math.abs(activeIndex - index);

//                     return (
//                       <motion.button
//                         key={item.id}
//                         type="button"
//                         onClick={() => scrollToItem(index)}
//                         animate={{
//                           opacity:
//                             distance === 0
//                               ? 1
//                               : distance === 1
//                               ? 0.45
//                               : 0.18,
//                           scale: isActive ? 1 : 0.96,
//                           y: isActive ? 0 : distance * 2,
//                         }}
//                         transition={{
//                           duration: 0.45,
//                           ease: [0.22, 1, 0.36, 1],
//                         }}
//                         className="
//                           mb-[10px]
//                           flex
//                           w-full
//                           cursor-pointer
//                           items-center
//                           justify-center
//                           border-0
//                           bg-transparent
//                           p-0
//                         "
//                         style={{
//                           height: `${ITEM_HEIGHT}px`,
//                           scrollSnapAlign: "center",
//                         }}
//                       >
//                         <span
//                           className={`
//                             inline-flex
//                             h-[55px]
//                             w-full
//                             max-w-[760px]
//                             items-center
//                             justify-center
//                             rounded-full
//                             px-8
//                             text-center
//                             uppercase
//                             tracking-[0.08em]
//                             whitespace-nowrap
//                             transition-all
//                             duration-500
//                             ease-out
//                             ${
//                               isActive
//                                 ? "bg-gradient-to-r from-[#C22C86] to-[#760052] text-[22px] font-semibold text-white shadow-lg lg:text-[24px] 2xl:text-[28px]"
//                                 : "text-[22px] font-semibold text-[#ababab] lg:text-[24px] 2xl:text-[28px]"
//                             }
//                           `}
//                         >
//                           {item.expertise_name}
//                         </span>
//                       </motion.button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
//               <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right GIF */}
//       <motion.div
//         initial={{ opacity: 0, x: 60 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{
//           duration: 0.8,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="
//           relative
//           flex
//           h-full
//           w-full
//           items-center
//           justify-end
//           lg:-translate-x-10
//         "
//       >
//         <img
//           src="/assets/Homepage banner/Expertisegif1.gif"
//           alt="Expertise Animation"
//           className="
//             h-auto
//             w-full
//             max-w-[300px]
//             object-contain
//             2xl:max-w-[350px]
//           "
//         />
//       </motion.div>
//     </div>
//   </section>
// );
// }

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { apiUrl } from "../config";

type ExpertiseItem = {
  id: number;
  expertise_name: string;
  short_description?: string;
  image: string | null;
  sequence_number?: number;
  show_home_page?: number;
  status?: number;
  meta_title?: string;
  meta_keyword?: string;
  meta_description?: string;
  head?: string;
  body?: string;
  created_at?: string;
};

const ITEM_HEIGHT = 55;
const ITEM_GAP = 10;
const ITEM_STEP = ITEM_HEIGHT + ITEM_GAP;

const SECTION_HEIGHT = 720;
const INNER_HEIGHT = 650;
const LIST_HEIGHT = 430;

export default function ExpertiseSection() {
  const [expertiseData, setExpertiseData] = useState<ExpertiseItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const wheelLockRef = useRef(false);

  const listPadding = useMemo(() => {
    return (LIST_HEIGHT - ITEM_HEIGHT) / 2;
  }, []);

  const fetchExpertiseList = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${apiUrl}/expertiseList`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success && Array.isArray(res.data?.data)) {
        const sortedData = [...res.data.data]
          .filter((item) => Number(item.status) === 1)
          .sort(
            (a, b) =>
              Number(a.sequence_number || 0) - Number(b.sequence_number || 0)
          );

        setExpertiseData(sortedData);
        setActiveIndex(0);

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            top: 0,
            behavior: "auto",
          });
        }, 0);
      } else {
        setExpertiseData([]);
      }
    } catch (error) {
      console.error("Expertise List API Error:", error);
      setExpertiseData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertiseList();
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current || expertiseData.length === 0) return;

    const scrollTop = scrollRef.current.scrollTop;
    const newIndex = Math.round(scrollTop / ITEM_STEP);

    const safeIndex = Math.min(
      Math.max(newIndex, 0),
      expertiseData.length - 1
    );

    setActiveIndex(safeIndex);
  };

  const scrollToItem = (index: number) => {
    if (expertiseData.length === 0) return;

    const safeIndex = Math.min(Math.max(index, 0), expertiseData.length - 1);

    setActiveIndex(safeIndex);

    scrollRef.current?.scrollTo({
      top: safeIndex * ITEM_STEP,
      behavior: "smooth",
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (expertiseData.length === 0) return;
    if (wheelLockRef.current) return;

    const direction = e.deltaY > 0 ? 1 : -1;

    const nextIndex = Math.min(
      Math.max(activeIndex + direction, 0),
      expertiseData.length - 1
    );

    if (nextIndex === activeIndex) return;

    e.preventDefault();

    wheelLockRef.current = true;

    scrollToItem(nextIndex);

    setTimeout(() => {
      wheelLockRef.current = false;
    }, 420);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
     
    >
      {/* Inner div height 650px and full width */}
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-full
          grid-cols-1
          items-center
          gap-4
          overflow-hidden
          px-8
          md:px-16
          lg:grid-cols-[60%_40%]
          xl:px-24
          2xl:px-32
          mt-16
        "
      
      >
        {/* Left Content */}
        <div className="flex h-full w-full flex-col justify-center">
          <h2 className="mb-10 leading-none text-primary">Expertise</h2>

          <div className="relative w-full overflow-hidden">
            {loading ? (
              <div
                className="flex w-full items-center justify-center text-[22px] font-semibold text-[#ababab]"
                style={{
                  height: `${LIST_HEIGHT}px`,
                }}
              >
                Loading...
              </div>
            ) : expertiseData.length === 0 ? (
              <div
                className="flex w-full items-center justify-center text-[22px] font-semibold text-[#ababab]"
                style={{
                  height: `${LIST_HEIGHT}px`,
                }}
              >
                No expertise found
              </div>
            ) : (
              <>
                {/* Scroll div full width */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  onWheel={handleWheel}
                  className="
                    expertise-scroll
                    relative
                    w-full
                    overflow-y-auto
                    overflow-x-hidden
                    scroll-smooth
                  "
                  style={{
                    height: `${LIST_HEIGHT}px`,
                    scrollSnapType: "y mandatory",
                  }}
                >
                  <div
                    className="w-full"
                    style={{
                      paddingTop: `${listPadding}px`,
                      paddingBottom: `${listPadding}px`,
                    }}
                  >
                    {expertiseData.map((item, index) => {
                      const isActive = activeIndex === index;
                      const distance = Math.abs(activeIndex - index);

                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToItem(index)}
                          animate={{
                            opacity:
                              distance === 0
                                ? 1
                                : distance === 1
                                ? 0.45
                                : 0.18,
                            scale: isActive ? 1 : 0.96,
                            y: isActive ? 0 : distance * 2,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="
                            mb-[10px]
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            justify-center
                            border-0
                            bg-transparent
                            p-0
                          "
                          style={{
                            height: `${ITEM_HEIGHT}px`,
                            scrollSnapAlign: "center",
                          }}
                        >
                          <span
                            className={`
                              inline-flex
                              h-[55px]
                              w-full
                              max-w-[760px]
                              items-center
                              justify-center
                              rounded-full
                              px-8
                              text-center
                              uppercase
                              tracking-[0.08em]
                              whitespace-nowrap
                              transition-all
                              duration-500
                              ease-out
                              ${
                                isActive
                                  ? "bg-gradient-to-r from-[#C22C86] to-[#760052] text-[22px] font-semibold text-white shadow-lg lg:text-[24px] 2xl:text-[28px]"
                                  : "text-[22px] font-semibold text-[#ababab] lg:text-[24px] 2xl:text-[28px]"
                              }
                            `}
                          >
                            {item.expertise_name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </>
            )}
          </div>
        </div>

        {/* Right GIF */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            flex
            h-full
            w-full
            items-center
            justify-end
            lg:-translate-x-10
          "
        >
          <img
            src="/assets/Homepage banner/Expertisegif1.gif"
            alt="Expertise Animation"
            className="
              h-auto
              w-full
              max-w-[300px]
              object-contain
              2xl:max-w-[350px]
            "
          />
        </motion.div>
      </div>
    </section>
  );
}