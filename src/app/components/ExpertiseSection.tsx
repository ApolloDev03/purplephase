

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

const getResponsiveSizes = (): ResponsiveSizes => {
  const createSize = (itemHeight: number, itemGap: number): ResponsiveSizes => ({
    itemHeight,
    itemGap,
    listHeight: itemHeight * 3 + itemGap * 2, // only 3 listing show
  });

  if (typeof window === "undefined") {
    return createSize(52, 16);
  }

  const width = window.innerWidth;

  if (width < 640) return createSize(42, 10);
  if (width < 768) return createSize(46, 12);
  if (width < 1024) return createSize(50, 14);

  return createSize(52, 16);
};

export default function ExpertiseSection() {
  const [expertiseData, setExpertiseData] = useState<ExpertiseItem[]>([]);
  // const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
// const [sizes, setSizes] = useState<ResponsiveSizes>({
//   itemHeight: 52,
//   itemGap: 16,
//   listHeight: 188, // 52 * 3 + 16 * 2
// });
  // const scrollRef = useRef<HTMLDivElement | null>(null);

const [trackIndex, setTrackIndex] = useState(0);
const [trackAnimationEnabled, setTrackAnimationEnabled] = useState(true);

const [sizes, setSizes] = useState<ResponsiveSizes>({
  itemHeight: 52,
  itemGap: 16,
  listHeight: 188,
});

const itemStep = sizes.itemHeight + sizes.itemGap;

const listPadding = useMemo(() => {
  return (sizes.listHeight - sizes.itemHeight) / 2;
}, [sizes.listHeight, sizes.itemHeight]);

// Three copies provide seamless looping without jumping or flashing.
const repeatedExpertiseData = useMemo(() => {
  if (expertiseData.length <= 1) {
    return expertiseData;
  }

  return [
    ...expertiseData,
    ...expertiseData,
    ...expertiseData,
  ];
}, [expertiseData]);
  // const itemStep = sizes.itemHeight + sizes.itemGap;

  // const listPadding = useMemo(() => {
  //   return (sizes.listHeight - sizes.itemHeight) / 2;
  // }, [sizes.listHeight, sizes.itemHeight]);

  // useEffect(() => {
  //   const updateSizes = () => {
  //     setSizes(getResponsiveSizes());
  //   };

  //   updateSizes();

  //   let resizeFrame: number | null = null;

  //   const handleResize = () => {
  //     if (resizeFrame) cancelAnimationFrame(resizeFrame);

  //     resizeFrame = requestAnimationFrame(() => {
  //       updateSizes();
  //     });
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     if (resizeFrame) cancelAnimationFrame(resizeFrame);
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   scrollRef.current?.scrollTo({
  //     top: activeIndex * itemStep,
  //     behavior: "auto",
  //   });
  // }, [itemStep]);
useEffect(() => {
  let resizeFrame: number | null = null;
  let enableAnimationFrame: number | null = null;

  const updateSizes = () => {
    // Prevent the list from animating during responsive size changes.
    setTrackAnimationEnabled(false);
    setSizes(getResponsiveSizes());

    enableAnimationFrame = requestAnimationFrame(() => {
      enableAnimationFrame = requestAnimationFrame(() => {
        setTrackAnimationEnabled(true);
      });
    });
  };

  updateSizes();

  const handleResize = () => {
    if (resizeFrame !== null) {
      cancelAnimationFrame(resizeFrame);
    }

    resizeFrame = requestAnimationFrame(updateSizes);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    if (resizeFrame !== null) {
      cancelAnimationFrame(resizeFrame);
    }

    if (enableAnimationFrame !== null) {
      cancelAnimationFrame(enableAnimationFrame);
    }

    window.removeEventListener("resize", handleResize);
  };
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
  .sort((a, b) => {
    const seqA = Number(a.sequence_number ?? 9999);
    const seqB = Number(b.sequence_number ?? 9999);

    if (seqA !== seqB) return seqA - seqB;

    return Number(a.id) - Number(b.id);
  });

      setTrackAnimationEnabled(false);
setExpertiseData(sortedData);

// Start from the middle copy for seamless infinite looping.
setTrackIndex(sortedData.length > 1 ? sortedData.length : 0);

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setTrackAnimationEnabled(true);
  });
});
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



  // const scrollToItem = (index: number) => {
  //   if (expertiseData.length === 0) return;

  //   const safeIndex = Math.min(Math.max(index, 0), expertiseData.length - 1);

  //   setActiveIndex(safeIndex);

  //   scrollRef.current?.scrollTo({
  //     top: safeIndex * itemStep,
  //     behavior: "smooth",
  //   });
  // };
//   useEffect(() => {
//   if (expertiseData.length <= 1) return;

//   const interval = setInterval(() => {
//     setActiveIndex((prevIndex) => {
//       const nextIndex =
//         prevIndex >= expertiseData.length - 1 ? 0 : prevIndex + 1;

//       scrollRef.current?.scrollTo({
//         top: nextIndex * itemStep,
//         behavior: "smooth",
//       });

//       return nextIndex;
//     });
//   }, 2500);

//   return () => clearInterval(interval);
// }, [expertiseData.length, itemStep]);
const scrollToItem = (originalIndex: number) => {
  const length = expertiseData.length;

  if (length === 0) return;

  if (length === 1) {
    setTrackIndex(0);
    return;
  }

  setTrackIndex((currentTrackIndex) => {
    const possibleIndexes = [
      originalIndex,
      originalIndex + length,
      originalIndex + length * 2,
    ];

    return possibleIndexes.reduce((nearest, current) => {
      const currentDistance = Math.abs(current - currentTrackIndex);
      const nearestDistance = Math.abs(nearest - currentTrackIndex);

      return currentDistance < nearestDistance ? current : nearest;
    });
  });
};

useEffect(() => {
  if (expertiseData.length <= 1) return;

  const interval = window.setInterval(() => {
    setTrackIndex((previousIndex) => previousIndex + 1);
  }, 2500);

  return () => {
    window.clearInterval(interval);
  };
}, [expertiseData.length]);

const handleTrackAnimationComplete = () => {
  const length = expertiseData.length;

  if (length <= 1) return;

  // Reset from the third copy to the middle copy.
  // Both positions display identical surrounding items,
  // so the reset is visually invisible.
  if (trackIndex >= length * 2) {
    setTrackAnimationEnabled(false);
    setTrackIndex(length);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTrackAnimationEnabled(true);
      });
    });
  }
};
const handleExpertiseWheel = (event:any) => {
  window.scrollBy({
    top: event.deltaY,
    behavior: "auto",
  });
};

  return (
  <section className="relative w-full overflow-hidden bg-white pt-10 lg:pt-16 pb-0  2xl:py-[85px] ">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-full
          grid-cols-1
          items-center
          gap-8
          overflow-hidden
          px-4
          md:grid-cols-[58%_42%]
          lg:gap-6
          lg:px-6
          xl:grid-cols-[60%_40%]
          xl:px-10
          2xl:px-32
        "
      >
      {/* Left Content */}
{/* Left Content */}
<div className="flex h-full w-full flex-col items-start justify-center lg:justify-start">
  <div className="w-full 2xl:max-w-[722px]">
    <h2 className="mb-4 text-left leading-none text-primary 2xl:mb-10">
      Expertise
    </h2>

    {/* Fixed left side height as per Figma */}
    <div
      className="
        relative
        flex
        h-[200px]
        w-full
        items-center
        justify-center
        overflow-hidden
        md:h-[320px]
         lg:h-[360px]
      "
    >
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
//         <div
//           ref={scrollRef}
//             onWheel={handleExpertiseWheel}
//           className="expertise-scroll relative mx-auto w-full overflow-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//           style={{
//             height: `${sizes.listHeight}px`,
//             scrollSnapType: "y mandatory",
//           }}
//         >
//           <div
//             className="w-full"
//             style={{
//               paddingTop: `${listPadding}px`,
//               paddingBottom: `${listPadding}px`,
//             }}
//           >
//             {expertiseData.map((item, index) => {
//               const isActive = activeIndex === index;
//               const distance = Math.abs(activeIndex - index);

//               return (
//   <motion.button
//   key={item.id}
//   type="button"
//   onClick={() => scrollToItem(index)}
//   animate={{
//     opacity:
//       distance === 0
//         ? 1
//         : distance === 1
//         ? 0.65
//         : distance === 2
//         ? 0.22
//         : 0,
//     scale: isActive ? 1 : 0.96,
//   }}
//   transition={{
//     duration: 0.45,
//     ease: [0.22, 1, 0.36, 1],
//   }}
//   className="flex w-full cursor-pointer items-center justify-start border-0 bg-transparent p-0"
//   style={{
//     height: `${sizes.itemHeight}px`,
//     marginBottom: `${sizes.itemGap}px`,
//     scrollSnapAlign: "center",
//     pointerEvents: distance > 2 ? "none" : "auto",
//   }}
// >
//   <span
//     className={`
//       inline-flex
//       h-full
//       w-full
//       max-w-[632px]
//       min-w-0
//       items-center
//       justify-center
//       rounded-full
//       px-6
//       text-center
//       text-[15px]
//       font-semibold
//       uppercase
//       leading-none
   
//       transition-all
//       duration-500
//       ease-out
//       sm:text-[16px]
//       md:text-[18px]
//       lg:text-[20px]
//       xl:text-[25px]
//       2xl:text-[30px]
//       ${
//         isActive
//           ? "bg-primary text-white shadow-sm"
//           : "bg-transparent text-[#BDBDBD]"
//       }
//     `}
//   >
//     <span className="block w-full truncate">
//       {item.expertise_name}
//     </span>
//   </span>
// </motion.button>
//               );
//             })}
//           </div>
//         </div>
<div
  className="relative mx-auto w-full overflow-hidden"
  style={{
    height: `${sizes.listHeight}px`,
  }}
>
  <motion.div
    animate={{
      y: -(trackIndex * itemStep),
    }}
    transition={
      trackAnimationEnabled
        ? {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }
        : {
            duration: 0,
          }
    }
    onAnimationComplete={handleTrackAnimationComplete}
    className="w-full"
    style={{
      paddingTop: `${listPadding}px`,
      paddingBottom: `${listPadding}px`,
      willChange: "transform",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    }}
  >
    {repeatedExpertiseData.map((item, renderedIndex) => {
      const originalIndex =
        expertiseData.length > 0
          ? renderedIndex % expertiseData.length
          : 0;

      const distance = Math.abs(trackIndex - renderedIndex);
      const isActive = distance === 0;

      return (
        <motion.button
          key={`${item.id}-${renderedIndex}`}
          type="button"
          onClick={() => scrollToItem(originalIndex)}
          animate={{
            opacity:
              distance === 0
                ? 1
                : distance === 1
                ? 0.65
                : distance === 2
                ? 0.22
                : 0,
            scale: isActive ? 1 : 0.96,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-start
            border-0
            bg-transparent
            p-0
          "
          style={{
            height: `${sizes.itemHeight}px`,
            marginBottom: `${sizes.itemGap}px`,
            pointerEvents: distance > 2 ? "none" : "auto",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <span
            className={`
              inline-flex
              h-full
              w-full
              max-w-[550px]
              xl:max-w-[632px]
              min-w-0
              items-center
              justify-center
              rounded-full
              px-6
              text-center
              text-[15px]
              font-semibold
              uppercase
              leading-none
              transition-colors
              duration-300
              ease-out
              sm:text-[16px]
              md:text-[18px]
              lg:text-[20px]
              xl:text-[25px]
              2xl:text-[30px]
              ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-transparent text-[#BDBDBD]"
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
  </motion.div>
</div>
      )}
    </div>
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
    md:pt-0
    lg:justify-end
    xl:-translate-x-20
    2xl:-translate-x-28
  "
>
  <a
    href="tel:+919998610505"
    aria-label="Call 99986 10505"
    className="inline-block cursor-pointer"
  >
    <img
      src="/assets/Homepage banner/Expertisegif1.gif"
      alt="Call 99986 10505"
      className="
        h-auto
        w-full
        max-w-[180px]
        object-contain
        sm:max-w-[220px]
        md:max-w-[260px]
        lg:max-w-[280px]
        xl:max-w-[300px]
        2xl:max-w-[360px]
      "
    />
  </a>
</motion.div>
      </div>
    </section>
  );
}
