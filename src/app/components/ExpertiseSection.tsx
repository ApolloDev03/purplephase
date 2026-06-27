"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceItem = {
  id: number;
  service_name: string;
  image: string | null;
};

const ITEM_HEIGHT = 74;
const ITEM_GAP = 5;
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

export default function ExpertiseSection() {
  const [expertiseData] = useState<ServiceItem[]>([
    {
      id: 1,
      service_name: "Market Research",
      image: null,
    },
    {
      id: 2,
      service_name: "Strategic Brand Consulting",
      image: null,
    },
    {
      id: 3,
      service_name: "Brand Identity Creation",
      image: null,
    },
    {
      id: 4,
      service_name: "Conceptual Packaging Design",
      image: null,
    },
    {
      id: 5,
      service_name: "Advertising Campaign Design",
      image: null,
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || expertiseData.length === 0) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const totalScrollHeight = section.offsetHeight - window.innerHeight;

      if (totalScrollHeight <= 0) return;

      const scrollProgress = Math.min(
        Math.max(-rect.top / totalScrollHeight, 0),
        1
      );

      const newIndex = Math.round(scrollProgress * (expertiseData.length - 1));

      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [expertiseData.length]);

  const visibleItems = useMemo(() => {
    if (expertiseData.length === 0) return [];

    return VISIBLE_OFFSETS.map((offset) => {
      const index = activeIndex + offset;

      if (index < 0 || index >= expertiseData.length) {
        return null;
      }

      return {
        ...expertiseData[index],
        offset,
        index,
      };
    }).filter(Boolean) as Array<
      ServiceItem & {
        offset: number;
        index: number;
      }
    >;
  }, [activeIndex, expertiseData]);

return (
  <section
    ref={sectionRef}
    className="relative bg-white"
    style={{
      height: `${expertiseData.length * 60}vh`,
    }}
  >
    <div
      ref={stickyRef}
      className="sticky top-0 flex pt-20 pb-16 items-center overflow-hidden bg-white"
    >
    <div
  className="
    mx-auto
    w-full
    max-w-full
    grid
    grid-cols-1
    lg:grid-cols-[55%_45%]
    items-center
    gap-10
    px-8
    md:px-16
    xl:px-24
    2xl:px-32
  "
>
        {/* Left Content */}
        <div className="flex w-full flex-col justify-center ">
          <h2
           
           className="
mb-10
leading-none
text-primary
"
          >
            Expertise
          </h2>

         <div className="relative w-full max-w-[760px] overflow-hidden">
            
           <div
  className="relative"
  style={{
    height: `${(ITEM_HEIGHT + ITEM_GAP) * VISIBLE_OFFSETS.length}px`,
  }}
>
              <AnimatePresence initial={false}>
                {visibleItems.map(({ id, service_name, offset, index }) => {
                  const isActive = offset === 0;
                  const distance = Math.abs(offset);

                  return (
                   <motion.div
  key={id}
 
  onClick={() => setActiveIndex(index)}
  initial={false}
  animate={{
    y:
      offset * (ITEM_HEIGHT + ITEM_GAP) +
      (ITEM_HEIGHT + ITEM_GAP) * 2,
    opacity:
      distance === 0
        ? 1
        : distance === 1
        ? 0.45
        : 0.12,
  }}
  transition={{
    duration: 0.35,
    ease: "easeOut",
  }}
  style={{
    height: ITEM_HEIGHT + ITEM_GAP,
  }}
  className="absolute left-0 top-0 flex w-full items-center justify-center"
>
  <motion.span
    layout
    className={`inline-flex h-[74px] min-w-[720px] items-center justify-center rounded-full uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-[#C22C86] to-[#760052] text-white text-[26px] lg:text-[28px] 2xl:text-[32px] font-semibold shadow-lg"
        : "text-[#CFCFCF] text-[26px] lg:text-[28px] 2xl:text-[32px] font-semibold"
    }`}
  >
    {service_name}
  </motion.span>
</motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>

        {/* Right GIF */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex h-full items-center justify-end"
        >
          <img
            src="/assets/Homepage banner/Expertisegif1.gif"
            alt="Expertise Animation"
         className="
w-full
max-w-[300px]
2xl:max-w-[350px]
h-auto
object-contain
"
          />
        </motion.div>
      </div>
    </div>
  </section>
);
//   return (
   
//     <section
//   ref={sectionRef}
//   className="relative bg-white"
//   style={{
//     height: `${expertiseData.length * 60}vh`, // Faster scroll & less whitespace
//   }}
// >
//   <div
//     ref={stickyRef}
//     className="sticky top-0 flex h-screen items-center overflow-hidden bg-white"
//   >
//     <div
//       className="
//         mx-auto
//         w-full
//         max-w-full
//         grid
//         grid-cols-1
//         lg:grid-cols-[56%_44%]
//         items-center
//         gap-6
//         lg:gap-8
//         px-6
//         md:px-10
//         xl:px-12
//       "
//     >
//       {/* Left Content */}
//       <div className="flex w-full flex-col justify-center lg:-translate-y-10">
//         <motion.h2
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="mb-10 text-[34px] sm:text-[42px] md:text-[48px] lg:text-[58px] font-semibold leading-none text-primary"
//         >
//           Expertise
//         </motion.h2>

//         <div className="relative w-full max-w-[620px] overflow-hidden">
//           <div
//             className="relative"
//             style={{
//               height: `${ITEM_HEIGHT * VISIBLE_OFFSETS.length}px`,
//             }}
//           >
//             <AnimatePresence initial={false}>
//               {visibleItems.map(({ id, service_name, offset, index }) => {
//                 const isActive = offset === 0;
//                 const distance = Math.abs(offset);

//                 return (
//                   <motion.button
//                     key={id}
//                     type="button"
//                     onClick={() => setActiveIndex(index)}
//                     initial={false}
//                     animate={{
//                       y: offset * ITEM_HEIGHT + ITEM_HEIGHT * 2,
//                       opacity:
//                         distance === 0
//                           ? 1
//                           : distance === 1
//                           ? 0.45
//                           : 0.12,
//                     }}
//                     transition={{
//                       duration: 0.35,
//                       ease: "easeOut",
//                     }}
//                     style={{
//                       height: ITEM_HEIGHT,
//                     }}
//                     className="absolute left-0 top-0 flex w-full items-center"
//                   >
//                     <motion.span
//                       layout
//                       className={`inline-flex items-center justify-center rounded-full uppercase tracking-[0.08em] transition-all duration-300 whitespace-nowrap ${
//                         isActive
//                           ? "h-[52px] min-w-[320px] bg-gradient-to-r from-[#C22C86] to-[#760052] text-white text-[22px] font-semibold px-10 shadow-lg"
//                           : "text-[#CFCFCF] text-[20px] font-medium px-6"
//                       }`}
//                     >
//                       {service_name}
//                     </motion.span>
//                   </motion.button>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent" />
//           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
//         </div>
//       </div>

//       {/* Right Image */}
//       <motion.div
//         initial={{ opacity: 0, x: 60 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//         className="relative flex items-center justify-center"
//       >
//         <img
//           src="/assets/Homepage banner/Expertisegif.gif"
//           alt="Expertise Animation"
//           className="
//             w-[260px]
//             sm:w-[300px]
//             md:w-[600px]
//             lg:w-[800px]
//             xl:w-[940px]
//             object-contain
//           "
//         />
//       </motion.div>
//     </div>
//   </div>
// </section>
//   );
}
