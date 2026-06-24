"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceItem = {
  id: number;
  service_name: string;
  image: string | null;
};

const ITEM_HEIGHT = 58;
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

  const activeItem = expertiseData[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{
        height: `${expertiseData.length * 100}vh`,
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden bg-white py-12"
      >
        <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[52%_48%] gap-10 lg:gap-16 px-5 sm:px-8 md:px-12 xl:px-10 items-center">
          {/* Left Content */}

          {/* <div className="flex w-full flex-col justify-center overflow-hidden pl-0 lg:pl-8">
    <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8  text-[34px] font-semibold leading-none text-primary sm:text-[40px] md:mb-10 md:text-[48px]"
    >
        Expertise
    </motion.h2>

    <div className="relative w-full max-w-[560px] overflow-hidden">
        <div
            className="relative"
            style={{
                height: `${ITEM_HEIGHT * VISIBLE_OFFSETS.length}px`,
            }}
        >
            <AnimatePresence initial={false}>
                {visibleItems.map(({ id, service_name, offset, index }) => {
                    const isActive = offset === 0;
                    const distance = Math.abs(offset);

                    return (
                        <motion.button
                            key={id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            initial={false}
                            animate={{
                                y: offset * ITEM_HEIGHT + ITEM_HEIGHT * 2,
                                opacity:
                                    distance === 0
                                        ? 1
                                        : distance === 1
                                        ? 0.45
                                        : 0.12,
                                scale: isActive ? 1 : 0.96,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: "easeInOut",
                            }}
                            style={{
                                height: ITEM_HEIGHT,
                            }}
                            className="absolute left-0 top-0 flex w-full items-center justify-start"
                        >
                            <span
                                className={`inline-flex h-[44px] min-w-[230px] font-semibold items-center justify-center rounded-full font-heading uppercase tracking-[0.08em] transition-all duration-300 whitespace-nowrap ${
                                    isActive
                                        ? "bg-gradient-to-r from-[#c02a83] to-[#760052] px-8 text-[13px] font-semibold text-white shadow-md shadow-primary/20 sm:min-w-[250px] sm:text-[14px] md:min-w-[270px] md:text-[18px] xl:min-w-[310px] xl:text-[21px]"
                                        : "px-8 text-[13px] font-medium text-[#7c7c7c] sm:min-w-[250px] sm:text-[14px] md:min-w-[270px] md:text-[18px] xl:min-w-[310px] xl:text-[21px]"
                                }`}
                            >
                                {service_name}
                            </span>
                        </motion.button>
                    );
                })}
            </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-12 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent" />
    </div>
</div> */}
          {/* Left Content */}
          <div className="flex w-full flex-col justify-center overflow-hidden pl-0 lg:pl-6 items-center lg:items-start text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-semibold leading-tight text-primary"
            >
              Expertise
            </motion.h2>

            <div className="relative w-full max-w-full lg:max-w-[600px] overflow-hidden">
              <div
                className="relative"
                style={{
                  height: `${ITEM_HEIGHT * VISIBLE_OFFSETS.length}px`,
                }}
              >
                <AnimatePresence initial={false}>
                  {visibleItems.map(({ id, service_name, offset, index }) => {
                    const isActive = offset === 0;
                    const distance = Math.abs(offset);

                    return (
                      <motion.button
                        key={id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        initial={false}
                        animate={{
                          y: offset * ITEM_HEIGHT + ITEM_HEIGHT * 2,
                          opacity:
                            distance === 0 ? 1 : distance === 1 ? 0.45 : 0.12,
                          // scale: isActive ? 1 : 0.96,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: "easeInOut",
                        }}
                        style={{
                          height: ITEM_HEIGHT,
                        }}
                        className="absolute left-0 top-0 flex w-full items-center justify-start"
                      >
                        <motion.span
                          layout
                          className={`inline-flex h-[42px] sm:h-[44px] px-5 sm:px-8 items-center justify-center rounded-full uppercase tracking-[0.08em] whitespace-normal text-center ${
                            isActive
                              ? "bg-gradient-to-r from-[#c02a83] to-[#760052] text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px] font-semibold"
                              : "text-[#7c7c7c] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]"
                          }`}
                        >
                          {service_name}
                        </motion.span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="pointer-events-none absolute left-0 top-0 h-12 w-full bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex w-full justify-center"
          >
            <div className="relative flex w-full items-center justify-end">
              {/* <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem?.id || "default-image"}
                  src="/assets/Homepage banner/Expertisegif.gif"
                  alt={activeItem?.service_name || "Expertise Animation"}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotateY: -25,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotateY: 25,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="absolute
                                    top-1/2
                                    left-[20%]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    object-contain"
                />
              </AnimatePresence> */}
              <img
                src="/assets/Homepage banner/Expertisegif.gif"
                alt="Expertise Animation"
                className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
