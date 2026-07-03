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

// const SECTION_HEIGHT = 720;
// const INNER_HEIGHT = 650;
// const LIST_HEIGHT = 430;

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

//         setTimeout(() => {
//           scrollRef.current?.scrollTo({
//             top: 0,
//             behavior: "auto",
//           });
//         }, 0);
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
//     if (expertiseData.length === 0) return;
//     if (wheelLockRef.current) return;

//     const direction = e.deltaY > 0 ? 1 : -1;

//     const nextIndex = Math.min(
//       Math.max(activeIndex + direction, 0),
//       expertiseData.length - 1
//     );

//     if (nextIndex === activeIndex) return;

//     e.preventDefault();

//     wheelLockRef.current = true;

//     scrollToItem(nextIndex);

//     setTimeout(() => {
//       wheelLockRef.current = false;
//     }, 420);
//   };

//   return (
//     <section
//       className="relative w-full overflow-hidden bg-white"
     
//     >
//       {/* Inner div height 650px and full width */}
//       <div
//         className="
//           mx-auto
//           grid
//           w-full
//           max-w-full
//           grid-cols-1
//           items-center
//           gap-4
//           overflow-hidden
//           px-8
//           md:px-16
//           lg:grid-cols-[60%_40%]
//           xl:px-24
//           2xl:px-32
//           mt-16
//         "
      
//       >
//         {/* Left Content */}
//         <div className="flex h-full w-full flex-col justify-center">
//           <h2 className="mb-10 leading-none text-primary">Expertise</h2>

//           <div className="relative w-full overflow-hidden">
//             {loading ? (
//               <div
//                 className="flex w-full items-center justify-center text-[22px] font-semibold text-[#ababab]"
//                 style={{
//                   height: `${LIST_HEIGHT}px`,
//                 }}
//               >
//                 Loading...
//               </div>
//             ) : expertiseData.length === 0 ? (
//               <div
//                 className="flex w-full items-center justify-center text-[22px] font-semibold text-[#ababab]"
//                 style={{
//                   height: `${LIST_HEIGHT}px`,
//                 }}
//               >
//                 No expertise found
//               </div>
//             ) : (
//               <>
//                 {/* Scroll div full width */}
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
//                     scroll-smooth
//                   "
//                   style={{
//                     height: `${LIST_HEIGHT}px`,
//                     scrollSnapType: "y mandatory",
//                   }}
//                 >
//                   <div
//                     className="w-full"
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
//                               w-full
//                               max-w-[760px]
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
//             w-full
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

type ResponsiveSizes = {
  itemHeight: number;
  itemGap: number;
  listHeight: number;
};

// const getResponsiveSizes = (): ResponsiveSizes => {
//   if (typeof window === "undefined") {
//     return {
//       itemHeight: 55,
//       itemGap: 10,
//       listHeight: 430,
//     };
//   }

//   const width = window.innerWidth;

//   // Mobile
//   if (width < 640) {
//     return {
//       itemHeight: 44,
//       itemGap: 8,
//       listHeight: 265,
//     };
//   }

//   // Small tablet
//   if (width < 768) {
//     return {
//       itemHeight: 48,
//       itemGap: 8,
//       listHeight: 310,
//     };
//   }

//   // Tablet
//   if (width < 1024) {
//     return {
//       itemHeight: 52,
//       itemGap: 10,
//       listHeight: 360,
//     };
//   }

//   // Laptop
//   if (width < 1536) {
//     return {
//       itemHeight: 55,
//       itemGap: 10,
//       listHeight: 430,
//     };
//   }

//   // Large / 1920 screen
//   return {
//     itemHeight: 60,
//     itemGap: 12,
//     listHeight: 460,
//   };
// };
const getResponsiveSizes = (): ResponsiveSizes => {
  if (typeof window === "undefined") {
    return {
      itemHeight: 55,
      itemGap: 10,
      listHeight: 430,
    };
  }

  const width = window.innerWidth;

  // Mobile
  if (width < 640) {
    return {
      itemHeight: 44,
      itemGap: 6,
      listHeight: 155, // ✅ mobile height small
    };
  }

  // Small tablet
  if (width < 768) {
    return {
      itemHeight: 48,
      itemGap: 8,
      listHeight: 200,
    };
  }

  // Tablet
  if (width < 1024) {
    return {
      itemHeight: 52,
      itemGap: 10,
      listHeight: 300,
    };
  }

  // Laptop
  if (width < 1536) {
    return {
      itemHeight: 55,
      itemGap: 10,
      listHeight: 430,
    };
  }

  return {
    itemHeight: 60,
    itemGap: 12,
    listHeight: 460,
  };
};
export default function ExpertiseSection() {
  const [expertiseData, setExpertiseData] = useState<ExpertiseItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState<ResponsiveSizes>({
    itemHeight: 55,
    itemGap: 10,
    listHeight: 430,
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const wheelLockRef = useRef(false);

  const itemStep = sizes.itemHeight + sizes.itemGap;

  const listPadding = useMemo(() => {
    return (sizes.listHeight - sizes.itemHeight) / 2;
  }, [sizes.listHeight, sizes.itemHeight]);

  useEffect(() => {
    const updateSizes = () => {
      setSizes(getResponsiveSizes());
    };

    updateSizes();

    let resizeFrame: number | null = null;

    const handleResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);

      resizeFrame = requestAnimationFrame(() => {
        updateSizes();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: activeIndex * itemStep,
      behavior: "auto",
    });
  }, [itemStep]);

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
    const newIndex = Math.round(scrollTop / itemStep);

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
      top: safeIndex * itemStep,
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
  <section className="relative w-full overflow-hidden bg-white py-6 sm:py-10 md:py-14 lg:py-16">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1680px]
          grid-cols-1
          items-center
          gap-8
          overflow-hidden
          px-4
          sm:px-6
          md:px-10
          lg:grid-cols-[58%_42%]
          lg:gap-6
          lg:px-16
          xl:grid-cols-[60%_40%]
          xl:px-24
          2xl:px-32
        "
      >
        {/* Left Content */}
        <div className="flex h-full w-full flex-col justify-center">
        <h2 className="mb-4 text-center text-[30px] leading-none text-primary sm:mb-6 sm:text-[42px] md:text-[58px] lg:text-left lg:text-[70px] xl:text-[82px] 2xl:mb-10 2xl:text-[96px]">
  Expertise
</h2>

          <div className="relative w-full overflow-hidden">
            {loading ? (
              <div
                className="flex w-full items-center justify-center text-[18px] font-semibold text-[#ababab] sm:text-[20px] lg:text-[22px]"
                style={{
                  height: `${sizes.listHeight}px`,
                }}
              >
                Loading...
              </div>
            ) : expertiseData.length === 0 ? (
              <div
                className="flex w-full items-center justify-center text-[18px] font-semibold text-[#ababab] sm:text-[20px] lg:text-[22px]"
                style={{
                  height: `${sizes.listHeight}px`,
                }}
              >
                No expertise found
              </div>
            ) : (
              <>
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
                    height: `${sizes.listHeight}px`,
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
                            height: `${sizes.itemHeight}px`,
                            marginBottom: `${sizes.itemGap}px`,
                            scrollSnapAlign: "center",
                          }}
                        >
                          <span
                            className={`
                              inline-flex
                              h-full
                              w-full
                              max-w-[760px]
                              min-w-0
                              items-center
                              justify-center
                              rounded-full
                              px-4
                              text-center
                              text-[14px]
                              uppercase
                              leading-tight
                              tracking-[0.04em]
                              transition-all
                              duration-500
                              ease-out
                              sm:px-6
                              sm:text-[17px]
                              sm:tracking-[0.06em]
                              md:text-[20px]
                              lg:px-8
                              lg:text-[22px]
                              xl:text-[24px]
                              2xl:text-[28px]
                              ${
                                isActive
                                  ? "bg-gradient-to-r from-[#C22C86] to-[#760052] font-semibold text-white shadow-lg"
                                  : "font-semibold text-[#ababab]"
                              }
                            `}
                          >
                            <span className="block w-full truncate">
                              {item.expertise_name}
                            </span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent sm:h-12" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent sm:h-12" /> */}
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
            justify-center
            pt-2
            lg:justify-end
            lg:pt-0
            xl:-translate-x-6
          "
        >
          <img
            src="/assets/Homepage banner/Expertisegif1.gif"
            alt="Expertise Animation"
            className="
              h-auto
              w-full
              max-w-[180px]
              object-contain
              sm:max-w-[220px]
              md:max-w-[260px]
              lg:max-w-[280px]
              xl:max-w-[300px]
              2xl:max-w-[350px]
            "
          />
        </motion.div>
      </div>
    </section>
  );
}